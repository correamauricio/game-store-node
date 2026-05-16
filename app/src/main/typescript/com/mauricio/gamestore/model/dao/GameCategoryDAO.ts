import { Connection, RowDataPacket } from 'mysql2/promise';
import { GameCategory } from '../entity/GameCategory.js';

export class GameCategoryDAO {
    private readonly conn: Connection;

    constructor(conn: Connection) {
        this.conn = conn;
    }

    public async findById(id: number): Promise<GameCategory | null> {
        const sql = 'SELECT * FROM categoria WHERE id = ?;';

        try {
            const [rows] = await this.conn.execute<RowDataPacket[]>(sql, [id]);
            if (rows.length > 0) {
                const resultSet = rows[0];
                return new GameCategory(resultSet.id as number, resultSet.nome as string);
            }
        } catch (e) {
            console.error((e as Error).message);
        }
        return null;
    }

    public async findAll(): Promise<GameCategory[]> {
        const sql = 'SELECT * FROM categoria;';
        const gameCategories: GameCategory[] = [];

        try {
            const [rows] = await this.conn.execute<RowDataPacket[]>(sql);

            for (const resultSet of rows) {
                gameCategories.push(
                    new GameCategory(resultSet.id as number, resultSet.nome as string)
                );
            }
        } catch (e) {
            console.error('Erro ao listar as categorias: ' + (e as Error).message);
        }
        return gameCategories;
    }
}
