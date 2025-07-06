import { CreateProduct } from "@/dto/createProductDto";
import { Product } from "@/models/product";
import Constants from 'expo-constants';

export class ProductService {
    private apiUrl: string = Constants.expoConfig?.extra?.apiUrl
    private baseUrl: string = `${this.apiUrl}/product`;

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

    async getProductsByName(name: string): Promise<Product[]> {
        try {
            const response = await fetch(`${this.baseUrl}/search/${name}}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`Error fetching products by name: ${response.status} ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Failed to fetch products by name:', error);
            throw error;
        }
    }

    async createProduct(product: CreateProduct): Promise<Product> {
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