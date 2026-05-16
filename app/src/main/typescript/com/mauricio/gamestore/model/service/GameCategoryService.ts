import { GameCategoryDAO } from '../dao/GameCategoryDAO.js';
import { GameCategory } from '../entity/GameCategory.js';
import { DatabaseConnection } from '../../util/DatabaseConnection.js';

export class GameCategoryService {
    private readonly databaseConnection: DatabaseConnection;

    constructor(databaseConnection: DatabaseConnection) {
        this.databaseConnection = databaseConnection;
    }

    public async findById(id: number): Promise<GameCategory | null> {
        const conn = await this.databaseConnection.getConnection();
        try {
            const dao = new GameCategoryDAO(conn);
            return await dao.findById(id);
        } catch (e) {
            throw new Error('Erro ao buscar categoria', { cause: e });
        } finally {
            await conn.end();
        }
    }

    public async findAll(): Promise<GameCategory[]> {
        const conn = await this.databaseConnection.getConnection();
        try {
            const dao = new GameCategoryDAO(conn);
            return await dao.findAll();
        } catch (e) {
            throw new Error('Erro ao buscar todas as categorias', { cause: e });
        } finally {
            await conn.end();
        }
    }
}
