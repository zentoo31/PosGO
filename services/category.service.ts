import { Category } from '@/models/category';
import Constants from 'expo-constants';

export class CategoryService{
    private apiUrl: string = Constants.expoConfig?.extra?.apiUrl;
    private baseUrl: string = `${this.apiUrl}/category`;

    async getAllCategories(): Promise<Category[]> {
        try {
            const response = await fetch(`${this.baseUrl}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`Error fetching categories: ${response.status} ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Failed to fetch categories:', error);
            throw error;
        }
    }
}