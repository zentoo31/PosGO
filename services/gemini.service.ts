import Constants from 'expo-constants';

export class GeminiService {
    private apiUrl: string = Constants.expoConfig?.extra?.apiUrl;
    private baseUrl: string = `${this.apiUrl}/gemini-api`;

    async generateText(prompt: string): Promise<string> {
        const response = await fetch(`${this.baseUrl}/generate-text`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt }),
        });

        const text = await response.text();
        return text;
    }

}