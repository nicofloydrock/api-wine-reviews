import { Document } from 'mongoose';
export type WineDocument = Wine & Document;
export declare class Wine {
    points: number;
    title: string;
    description: string;
    taster_name?: string;
    taster_twitter_handle?: string;
    price?: number;
    designation?: string;
    variety: string;
    region_1?: string;
    region_2?: string;
    province?: string;
    country: string;
    winery: string;
}
export declare const WineSchema: import("mongoose").Schema<Wine, import("mongoose").Model<Wine, any, any, any, Document<unknown, any, Wine, any, {}> & Wine & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Wine, Document<unknown, {}, import("mongoose").FlatRecord<Wine>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Wine> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
