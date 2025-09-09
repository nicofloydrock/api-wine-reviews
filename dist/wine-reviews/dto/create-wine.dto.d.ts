export declare class CreateWineDto {
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
export declare class FilterWineDto {
    country?: string;
    variety?: string;
    region_1?: string;
    province?: string;
    winery?: string;
    min_points?: number;
    max_points?: number;
    min_price?: number;
    max_price?: number;
    search?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}
