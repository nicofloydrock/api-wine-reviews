"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WineService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const wine_schema_1 = require("./schemas/wine.schema");
let WineService = class WineService {
    wineModel;
    constructor(wineModel) {
        this.wineModel = wineModel;
    }
    async create(createWineDto) {
        const createdWine = new this.wineModel(createWineDto);
        return createdWine.save();
    }
    async findAll(filterDto) {
        const { page = 1, limit = 10, sortBy = 'points', sortOrder = 'desc', search, ...filters } = filterDto;
        const query = {};
        for (const [key, value] of Object.entries(filters)) {
            if (value &&
                typeof value === 'string' &&
                !key.startsWith('min_') &&
                !key.startsWith('max_')) {
                query[key] = new RegExp(value, 'i');
            }
        }
        const rangeFields = {};
        for (const key of Object.keys(filters)) {
            if (key.startsWith('min_') && filters[key] !== undefined) {
                const field = key.replace('min_', '');
                if (!rangeFields[field])
                    rangeFields[field] = {};
                rangeFields[field].$gte = filters[key];
            }
            if (key.startsWith('max_') && filters[key] !== undefined) {
                const field = key.replace('max_', '');
                if (!rangeFields[field])
                    rangeFields[field] = {};
                rangeFields[field].$lte = filters[key];
            }
        }
        for (const [field, condition] of Object.entries(rangeFields)) {
            query[field] = condition;
        }
        if (search) {
            query.$or = [
                { title: new RegExp(search, 'i') },
                { description: new RegExp(search, 'i') },
                { variety: new RegExp(search, 'i') },
            ];
        }
        const sortOptions = {};
        sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
        const skip = (page - 1) * limit;
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
    async findOne(id) {
        const wine = await this.wineModel.findById(id).exec();
        if (!wine) {
            throw new common_1.NotFoundException(`Wine with ID ${id} not found`);
        }
        return wine;
    }
    async update(id, updateWineDto) {
        const updatedWine = await this.wineModel
            .findByIdAndUpdate(id, updateWineDto, { new: true })
            .exec();
        if (!updatedWine) {
            throw new common_1.NotFoundException(`Wine with ID ${id} not found`);
        }
        return updatedWine;
    }
    async remove(id) {
        const result = await this.wineModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new common_1.NotFoundException(`Wine with ID ${id} not found`);
        }
    }
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
    async getTopRatedWines(limit = 10) {
        return this.wineModel
            .find()
            .sort({ points: -1 })
            .limit(limit)
            .exec();
    }
};
exports.WineService = WineService;
exports.WineService = WineService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(wine_schema_1.Wine.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], WineService);
//# sourceMappingURL=wine-reviews.service.js.map