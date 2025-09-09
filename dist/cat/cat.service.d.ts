import { Model } from 'mongoose';
import { Cat } from './schema/cat.schema';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
export declare class CatService {
    private catModel;
    constructor(catModel: Model<Cat>);
    create(createCatDto: CreateCatDto): Promise<Cat>;
    findAll(): Promise<Cat[]>;
    findOne(id: number): Promise<any>;
    update(id: number, dto: UpdateCatDto): Promise<Cat[]>;
    remove(id: number): Promise<Cat[]>;
}
