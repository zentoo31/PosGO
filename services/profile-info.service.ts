import Constants from 'expo-constants';

export class ProfileInfoService{
    private apiUrl: string = Constants.expoConfig?.extra?.apiUrl;
    private baseUrl: string = `${this.apiUrl}/profile`;

    
}