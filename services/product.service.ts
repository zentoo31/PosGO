import { Product } from "@/interfaces/product";

export class ProductService {
    private baseUrl: string = 'http://10.0.2.2:3000/product'; 

    async getAllProducts(): Promise<Product[]> {
        try {
            const response = await fetch(`${this.baseUrl}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`Error fetching products: ${response.status} ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Failed to fetch products:', error);
            throw error;
        }
    }

}