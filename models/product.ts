export interface Product{
    id: number;
    name: string;
    description: string;
    price: number;
    category: {
        id: number;
        name: string;
        color: string;
    };
    stock: number;
    imageUrl?: string;
}