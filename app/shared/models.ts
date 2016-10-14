export interface Category{
    id: number;
    name: string;
}

export interface Tag{
    id: number;
    name: string;
}

export interface PetStatus{
    name: string;
    value: string;
}

export interface Pet{
    id: number;
    name: string;
    category : Category;
    tags : Tag[];
    photoUrls: string[];
    status: string;
}