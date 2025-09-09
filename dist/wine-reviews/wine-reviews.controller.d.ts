import { WineService } from './wine-reviews.service';
import { CreateWineDto, FilterWineDto } from './dto/create-wine.dto';
export declare class WineController {
    private readonly wineService;
    constructor(wineService: WineService);
    create(createWineDto: CreateWineDto): Promise<import("./schemas/wine.schema").Wine>;
    findAll(filterDto: FilterWineDto): Promise<{
        wines: (import("mongoose").Document<unknown, {}, import("./schemas/wine.schema").WineDocument, {}, {}> & import("./schemas/wine.schema").Wine & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    getStats(): Promise<any>;
    getCountriesStats(): Promise<any[]>;
    getVarietiesStats(): Promise<any[]>;
    getTopRatedWines(limit?: string): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/wine.schema").WineDocument, {}, {}> & import("./schemas/wine.schema").Wine & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<import("./schemas/wine.schema").Wine>;
    update(id: string, updateWineDto: Partial<CreateWineDto>): Promise<import("./schemas/wine.schema").Wine>;
    remove(id: string): Promise<void>;
}
