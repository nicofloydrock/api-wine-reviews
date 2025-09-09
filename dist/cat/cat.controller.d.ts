import { CatService } from './cat.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
export declare class CatController {
    private readonly catService;
    constructor(catService: CatService);
    create(createCatDto: CreateCatDto): Promise<import("./schema/cat.schema").Cat>;
    findAll(): Promise<import("./schema/cat.schema").Cat[]>;
    findOne(id: string): Promise<any>;
    update(id: string, updateCatDto: UpdateCatDto): Promise<import("./schema/cat.schema").Cat[]>;
    remove(id: string): Promise<import("./schema/cat.schema").Cat[]>;
}
