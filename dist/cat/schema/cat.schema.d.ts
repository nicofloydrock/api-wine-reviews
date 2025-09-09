import { HydratedDocument } from 'mongoose';
export type CatDocument = HydratedDocument<Cat>;
export declare class Cat {
    name: string;
    age: number;
    breed: string;
}
export declare const CatSchema: import("mongoose").Schema<Cat, import("mongoose").Model<Cat, any, any, any, import("mongoose").Document<unknown, any, Cat, any, {}> & Cat & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Cat, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Cat>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Cat> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
