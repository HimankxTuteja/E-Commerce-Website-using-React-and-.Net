export interface MetaData {
    CurrentPage: number;
    TotalPages: number;
    PageSize: number;
    TotalCount: number;
}

export class PaginatedResponse<T> {
     items: T;
     metaData: MetaData;


     constructor(items: T, metaData: MetaData){
        this.items = items;
        this.metaData = metaData;
     }
}