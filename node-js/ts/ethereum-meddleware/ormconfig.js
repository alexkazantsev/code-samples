module.exports = [{
    driver: {
        type: 'mysql',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
    entities: ['src/models/*.ts'],
    migrations: ['src/migrations/*.ts'],
    autoSchemaSync: true,
    cli: {
        migrationsDir: 'src/migrations'
    }
}];