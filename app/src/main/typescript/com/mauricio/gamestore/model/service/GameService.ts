import { GameDAO } from '../dao/GameDAO.js';
import { Game } from '../entity/Game.js';
import { DatabaseConnection } from '../../util/DatabaseConnection.js';

export class GameService {
    private readonly databaseConnection: DatabaseConnection;

    constructor(databaseConnection: DatabaseConnection) {
        this.databaseConnection = databaseConnection;
    }

    public async addGame(game: Game): Promise<boolean> {
        const conn = await this.databaseConnection.getConnection();
        try {
            const dao = new GameDAO(conn);
            await dao.addGame(game);
            return true;
        } catch (e) {
            console.error('Erro ao adicionar game ' + (e as Error).message);
        } finally {
            await conn.end();
        }
        return false;
    }

    public async getAllGames(): Promise<Game[]> {
        const conn = await this.databaseConnection.getConnection();
        try {
            const dao = new GameDAO(conn);
            return await dao.getAllGames();
        } catch (e) {
            console.error('Erro ao listar jogos: ' + (e as Error).message);
        } finally {
            await conn.end();
        }
        return [];
    }

    public async getGameById(id: number): Promise<Game | null> {
        const conn = await this.databaseConnection.getConnection();
        try {
            const dao = new GameDAO(conn);
            return await dao.findById(id);
        } catch (e) {   
            console.error('Erro ao buscar jogo: ' + (e as Error).message);
        } finally {
            await conn.end();
        }
        return null;
    }

    public async updateGame(game: Game): Promise<boolean> {
        const conn = await this.databaseConnection.getConnection();
        try {
            const dao = new GameDAO(conn);
            return await dao.updateGame(game);
        } catch (e) {
            console.error('Erro ao atualizar jogo: ' + (e as Error).message);
        } finally {
            await conn.end();
        }
        return false;
    }
}
