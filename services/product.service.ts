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

    async createProduct(product: Product): Promise<Product> {
        try {
            const response = await fetch(`${this.baseUrl}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            });

            if (!response.ok) {
                throw new Error(`Error creating product: ${response.status} ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Failed to create product:', error);
            throw error;
        }
    }

}