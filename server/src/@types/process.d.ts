declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production';
            PORT: string;
            DB_USER: string;
            DB_PASSWORD: string;
            DB_NAME: string;
            ACCESS_TOKEN_SECRET: string;
            REFRESH_TOKEN_SECRET: string;
        }
    }
}

export {};
