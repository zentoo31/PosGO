export interface CreateProduct{
    name: string;
    description: string;
    price: number;
    category:number;
    stock: number;
    imageUrl?: string;
}