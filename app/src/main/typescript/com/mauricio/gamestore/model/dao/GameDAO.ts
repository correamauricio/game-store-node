import { Connection, RowDataPacket } from 'mysql2/promise';
import { Game } from '../entity/Game.js';
import { GameCategory } from '../entity/GameCategory.js';

export class GameDAO {
    private readonly conn: Connection;

    constructor(conn: Connection) {
        this.conn = conn;
    }

    public async addGame(game: Game): Promise<boolean> {
        const sql = 'INSERT INTO jogo (titulo, genero, preco, categoria_id) VALUES (?, ?, ?, ?)';

        try {
            await this.conn.execute(sql, [
                game.getTitle(),
                game.getGender(),
                game.getPrice(),
                game.getCategory().getId(),
            ]);
            return true;
        } catch (e) {
            console.error((e as Error).message);
            return false;
        }
    }

    public async getAllGames(): Promise<Game[]> {
        const games: Game[] = [];
        const sql =
            'SELECT j.id, j.titulo, j.genero, j.preco, c.id AS categoria_id, c.nome AS categoria_nome ' +
            'FROM jogo j ' +
            'JOIN categoria c ON j.categoria_id = c.id';

        try {
            const [rows] = await this.conn.execute<RowDataPacket[]>(sql);

            for (const rs of rows) {
                const category = new GameCategory(
                    rs.categoria_id as number,
                    rs.categoria_nome as string
                );
                const game = new Game(
                    rs.id as number,
                    rs.titulo as string,
                    rs.genero as string,
                    category,
                    Number(rs.preco)
                );
                games.push(game);
            }
        } catch (e) {
            console.error('Erro ao listar jogos: ' + (e as Error).message);
        }
        return games;
    }

    public async findById(id: number): Promise<Game | null> {
        const sql =
            'SELECT j.id, j.titulo, j.genero, j.preco, c.id AS categoria_id, c.nome AS categoria_nome ' +
            'FROM jogo j ' +
            'JOIN categoria c ON j.categoria_id = c.id ' +
            'WHERE j.id = ?';

        try {
            const [rows] = await this.conn.execute<RowDataPacket[]>(sql, [id]);
            if (rows.length > 0) {
                const rs = rows[0];
                const category = new GameCategory(
                    rs.categoria_id as number,
                    rs.categoria_nome as string
                );
                return new Game(
                    rs.id as number,
                    rs.titulo as string,
                    rs.genero as string,
                    category,
                    Number(rs.preco)
                );
            }
        } catch (e) {
            console.error('Erro ao buscar jogo: ' + (e as Error).message);
        }
        return null;
    }

    public async updateGame(game: Game): Promise<boolean> {
        const sql = 'UPDATE jogo SET titulo = ?, genero = ?, preco = ?, categoria_id = ? WHERE id = ?';

        try {
            await this.conn.execute(sql, [
                game.getTitle(),
                game.getGender(),
                game.getPrice(),
                game.getCategory().getId(),
                game.getId(),
            ]);
            return true;
        } catch (e) {
            console.error('Erro ao atualizar jogo: ' + (e as Error).message);
            return false;
        }
    }
}
