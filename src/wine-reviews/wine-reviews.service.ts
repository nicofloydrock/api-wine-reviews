import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wine, WineDocument } from './schemas/wine.schema';
import { CreateWineDto, FilterWineDto } from './dto/create-wine.dto';

@Injectable()
export class WineService {
  constructor(
    @InjectModel(Wine.name) private wineModel: Model<WineDocument>,
  ) { }

  async create(createWineDto: CreateWineDto): Promise<Wine> {
    const createdWine = new this.wineModel(createWineDto);
    return createdWine.save();
  }

  async findAll(filterDto: FilterWineDto) {
    const {
      page = 1,
      limit = 10,
      sortBy = 'points',
      sortOrder = 'desc',
      search,
      ...filters
    } = filterDto;

    // Construir filtros dinámicos
    const query: any = {};

    // Filtros básicos
/*  if (filters.country) query.country = new RegExp(filters.country, 'i');
    if (filters.variety) query.variety = new RegExp(filters.variety, 'i');
    if (filters.region_1) query.region_1 = new RegExp(filters.region_1, 'i');
    if (filters.province) query.province = new RegExp(filters.province, 'i');
    if (filters.winery) query.winery = new RegExp(filters.winery, 'i');
 */

    //Filtros básicos código factorizado
   /*  const basicFilterFields = ['country', 'variety', 'region_1', 'province', 'winery'];
    for (const field of basicFilterFields) {
      if (filters[field]) {
        query[field] = new RegExp(filters[field], 'i');
      }
    }
 */

      // Filtros básicos completamente abstractos
      for (const [key, value] of Object.entries(filters)) {
        if (
          value &&
          typeof value === 'string' &&
          !key.startsWith('min_') &&
          !key.startsWith('max_')
        ) {
          query[key] = new RegExp(value, 'i');
        }
      }

    // Filtros de rango completamente abstractos
    const rangeFields = {};
    for (const key of Object.keys(filters)) {
      if (key.startsWith('min_') && filters[key] !== undefined) {
        const field = key.replace('min_', '');
        if (!rangeFields[field]) rangeFields[field] = {};
        rangeFields[field].$gte = filters[key];
      }
      if (key.startsWith('max_') && filters[key] !== undefined) {
        const field = key.replace('max_', '');
        if (!rangeFields[field]) rangeFields[field] = {};
        rangeFields[field].$lte = filters[key];
      }
    }
    for (const [field, condition] of Object.entries(rangeFields)) {
      query[field] = condition;
    }

    // Búsqueda de texto
    if (search) {
      query.$or = [
        { title: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
        { variety: new RegExp(search, 'i') },
      ];
    }

    // Configurar ordenamiento
    const sortOptions: any = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Calcular skip para paginación
    const skip = (page - 1) * limit;

    // Ejecutar consulta
    const [wines, total] = await Promise.all([
      this.wineModel
        .find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
        .exec(),
      this.wineModel.countDocuments(query).exec(),
    ]);

    return {
      wines,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string): Promise<Wine> {
    const wine = await this.wineModel.findById(id).exec();
    if (!wine) {
      throw new NotFoundException(`Wine with ID ${id} not found`);
    }
    return wine;
  }

  async update(id: string, updateWineDto: Partial<CreateWineDto>): Promise<Wine> {
    const updatedWine = await this.wineModel
      .findByIdAndUpdate(id, updateWineDto, { new: true })
      .exec();
    if (!updatedWine) {
      throw new NotFoundException(`Wine with ID ${id} not found`);
    }
    return updatedWine;
  }

  async remove(id: string): Promise<void> {
    const result = await this.wineModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Wine with ID ${id} not found`);
    }
  }

  // Métodos adicionales útiles
  async getStats() {
    const stats = await this.wineModel.aggregate([
      {
        $group: {
          _id: null,
          totalWines: { $sum: 1 },
          avgPoints: { $avg: '$points' },
          avgPrice: { $avg: '$price' },
          maxPoints: { $max: '$points' },
          minPoints: { $min: '$points' },
          maxPrice: { $max: '$price' },
          minPrice: { $min: '$price' },
        }
      }
    ]);

    return stats[0];
  }

  async getCountriesStats() {
    return this.wineModel.aggregate([
      {
        $group: {
          _id: '$country',
          count: { $sum: 1 },
          avgPoints: { $avg: '$points' },
          avgPrice: { $avg: '$price' },
        }
      },
      { $sort: { count: -1 } },
      { $limit: 20 }
    ]);
  }

  async getVarietiesStats() {
    return this.wineModel.aggregate([
      {
        $group: {
          _id: '$variety',
          count: { $sum: 1 },
          avgPoints: { $avg: '$points' },
          avgPrice: { $avg: '$price' },
        }
      },
      { $sort: { count: -1 } },
      { $limit: 20 }
    ]);
  }

  async getTopRatedWines(limit: number = 10) {
    return this.wineModel
      .find()
      .sort({ points: -1 })
      .limit(limit)
      .exec();
  }
}