import { Connection, RowDataPacket } from 'mysql2/promise';
import { Customer } from '../entity/Customer.js';
import { Game } from '../entity/Game.js';
import { GameCategory } from '../entity/GameCategory.js';
import { Purchase } from '../entity/Purchase.js';

function toLocalDateString(value: unknown): string {
    if (value instanceof Date) {
        const year = value.getFullYear();
        const month = String(value.getMonth() + 1).padStart(2, '0');
        const day = String(value.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    return String(value).split('T')[0];
}

export class PurchaseDAO {
    private readonly conn: Connection;

    constructor(conn: Connection) {
        this.conn = conn;
    }

    public async getAllPurchases(): Promise<Purchase[]> {
        const purchases: Purchase[] = [];
        const sql =
            'SELECT co.id, co.data_compra, co.quantidade, ' +
            'cl.id AS cliente_id, cl.nome AS cliente_nome, cl.email AS cliente_email, cl.idade AS cliente_idade, ' +
            'j.id AS jogo_id, j.titulo AS jogo_titulo, j.genero AS jogo_genero, j.preco AS jogo_preco, ' +
            'cat.id AS categoria_id, cat.nome AS categoria_nome ' +
            'FROM compra co ' +
            'JOIN cliente cl ON co.cliente_id = cl.id ' +
            'JOIN jogo j ON co.jogo_id = j.id ' +
            'JOIN categoria cat ON j.categoria_id = cat.id';

        try {
            const [rows] = await this.conn.execute<RowDataPacket[]>(sql);

            for (const rs of rows) {
                const customer = new Customer(
                    rs.cliente_id as number,
                    rs.cliente_nome as string,
                    rs.cliente_email as string,
                    rs.cliente_idade as number
                );

                const category = new GameCategory(
                    rs.categoria_id as number,
                    rs.categoria_nome as string
                );

                const game = new Game(
                    rs.jogo_id as number,
                    rs.jogo_titulo as string,
                    rs.jogo_genero as string,
                    category,
                    Number(rs.jogo_preco)
                );

                const purchase = new Purchase(
                    rs.id as number,
                    customer,
                    game,
                    toLocalDateString(rs.data_compra),
                    rs.quantidade as number
                );
                purchases.push(purchase);
            }
        } catch (e) {
            console.error('Erro ao listar compras: ' + (e as Error).message);
        }
        return purchases;
    }

    public async getPurchaseById(id: number): Promise<Purchase | null> {
        const sql =
            'SELECT co.id, co.data_compra, co.quantidade, ' +
            'cl.id AS cliente_id, cl.nome AS cliente_nome, cl.email AS cliente_email, cl.idade AS cliente_idade, ' +
            'j.id AS jogo_id, j.titulo AS jogo_titulo, j.genero AS jogo_genero, j.preco AS jogo_preco, ' +
            'cat.id AS categoria_id, cat.nome AS categoria_nome ' +
            'FROM compra co ' +
            'JOIN cliente cl ON co.cliente_id = cl.id ' +
            'JOIN jogo j ON co.jogo_id = j.id ' +
            'JOIN categoria cat ON j.categoria_id = cat.id ' +
            'WHERE co.id = ?';

        try {
            const [rows] = await this.conn.execute<RowDataPacket[]>(sql, [id]);
            if (rows.length > 0) {
                const rs = rows[0];
                const customer = new Customer(
                    rs.cliente_id as number,
                    rs.cliente_nome as string,
                    rs.cliente_email as string,
                    rs.cliente_idade as number
                );

                const category = new GameCategory(
                    rs.categoria_id as number,
                    rs.categoria_nome as string
                );

                const game = new Game(
                    rs.jogo_id as number,
                    rs.jogo_titulo as string,
                    rs.jogo_genero as string,
                    category,
                    Number(rs.jogo_preco)
                );

                return new Purchase(
                    rs.id as number,
                    customer,
                    game,
                    toLocalDateString(rs.data_compra),
                    rs.quantidade as number
                );
            }
        } catch (e) {
            console.error('Erro ao buscar compra por ID: ' + (e as Error).message);
        }
        return null;
    }

    public async updatePurchase(purchase: Purchase): Promise<void> {
        const sql =
            'UPDATE compra SET cliente_id = ?, jogo_id = ?, data_compra = ?, quantidade = ? WHERE id = ?';

        try {
            await this.conn.execute(sql, [
                purchase.getPurchaseCustomer().getId(),
                purchase.getPurchaseGame().getId(),
                purchase.getPurchaseDate(),
                purchase.getQuantity(),
                purchase.getId(),
            ]);
        } catch (e) {
            console.error('Erro ao atualizar compra: ' + (e as Error).message);
        }
    }

    public async savePurchase(purchase: Purchase): Promise<void> {
        const sql =
            'INSERT INTO compra (cliente_id, jogo_id, data_compra, quantidade) VALUES (?, ?, ?, ?)';

        try {
            await this.conn.execute(sql, [
                purchase.getPurchaseCustomer().getId(),
                purchase.getPurchaseGame().getId(),
                purchase.getPurchaseDate(),
                purchase.getQuantity(),
            ]);
        } catch (e) {
            console.error('Erro ao salvar compra: ' + (e as Error).message);
        }
    }
}
