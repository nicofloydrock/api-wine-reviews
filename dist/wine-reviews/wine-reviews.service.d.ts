import { Model } from 'mongoose';
import { Wine, WineDocument } from './schemas/wine.schema';
import { CreateWineDto, FilterWineDto } from './dto/create-wine.dto';
export declare class WineService {
    private wineModel;
    constructor(wineModel: Model<WineDocument>);
    create(createWineDto: CreateWineDto): Promise<Wine>;
    findAll(filterDto: FilterWineDto): Promise<{
        wines: (import("mongoose").Document<unknown, {}, WineDocument, {}, {}> & Wine & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<Wine>;
    update(id: string, updateWineDto: Partial<CreateWineDto>): Promise<Wine>;
    remove(id: string): Promise<void>;
    getStats(): Promise<any>;
    getCountriesStats(): Promise<any[]>;
    getVarietiesStats(): Promise<any[]>;
    getTopRatedWines(limit?: number): Promise<(import("mongoose").Document<unknown, {}, WineDocument, {}, {}> & Wine & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
}
