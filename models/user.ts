export interface User{
    user:{
        email: string;
    },
    session: {
        access_token: string;
        refresh_token: string;
    }
}