import mysql, { Connection } from 'mysql2/promise';

export class DatabaseConnection {
    private host: string;
    private port: number;
    private database: string;
    private user: string;
    private password: string;

    constructor(host: string, port: number, database: string, user: string, password: string){
        this.host = host;
        this.port = port;
        this.database = database;
        this.user = user;
        this.password = password;
    }

    public async getConnection(): Promise<Connection> {
        return mysql.createConnection({
            host: this.host,
            port: this.port,
            database: this.database,
            user: this.user,
            password: this.password,
            timezone: 'Z',
            charset: 'utf8mb4',
            });
    }
}


