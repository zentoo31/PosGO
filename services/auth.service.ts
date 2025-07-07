import { LoginDto } from "@/dto/loginDto";
import { RegisterDto } from "@/dto/registerDto";
import { User } from "@/models/user";
import Constants from "expo-constants";

export class AuthService {
    private apiUrl: string = Constants.expoConfig?.extra?.apiUrl;
    private baseUrl: string = `${this.apiUrl}/auth`;

    async register(registerDto: RegisterDto){
        const response = await fetch(`${this.baseUrl}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(registerDto),
        });

        if (!response.ok) {
            throw new Error(response.statusText || "Registration failed");
        }

        return response.json();
    }

    async login(loginDto: LoginDto): Promise<User> {
        const response = await fetch(`${this.baseUrl}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginDto),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            const errorMessage = (errorData && errorData.message) ? errorData.message : "Login failed";
            throw new Error(errorMessage);
        }

        return response.json();
    }
}