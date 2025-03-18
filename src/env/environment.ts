
export const environment = {
    app: {
        name: 'Immich Album Manager'
    },
    database: {
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT || "5432",
        username: process.env.DB_USERNAME || "postgres",
        password: process.env.DB_PASSWORD || "postgres",
        databaseName: process.env.DB_DATABASE_NAME || process.env.DB_USERNAME || "postgres"
    },
    auth: {
        sessionSecret: process.env.SESSION_SECRET || "12345678",
    },
    api: {
        url: process.env.IMMICH_URL || "http://localhost:3000/api"
    }
}
