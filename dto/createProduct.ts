export interface CreateProduct{
    id: number;
    name: string;
    description: string;
    price: number;
    category:number;
    stock: number;
    imageUrl?: string;
}