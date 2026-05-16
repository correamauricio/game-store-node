import { PurchaseDAO } from '../dao/PurchaseDAO.js';
import { Purchase } from '../entity/Purchase.js';
import { DatabaseConnection } from '../../util/DatabaseConnection.js';

export class PurchaseService {
    private readonly databaseConnection: DatabaseConnection;

    constructor(databaseConnection: DatabaseConnection) {
        this.databaseConnection = databaseConnection;
    }

    public async listAllPurchases(): Promise<Purchase[]> {
        const conn = await this.databaseConnection.getConnection();
        try {
            const dao = new PurchaseDAO(conn);
            return await dao.getAllPurchases();
        } catch (e) {
            console.error('Erro ao listar compras: ' + (e as Error).message);
        } finally {
            await conn.end();
        }
        return [];
    }

    public async getPurchaseById(id: number): Promise<Purchase | null> {
        const conn = await this.databaseConnection.getConnection();
        try {
            const dao = new PurchaseDAO(conn);
            return await dao.getPurchaseById(id);
        } catch (e) {
            console.error('Erro ao buscar compra por ID: ' + (e as Error).message);
        } finally {
            await conn.end();
        }
        return null;
    }

    public async updatePurchase(purchase: Purchase): Promise<void> {
        const conn = await this.databaseConnection.getConnection();
        try {
            const dao = new PurchaseDAO(conn);
            await dao.updatePurchase(purchase);
        } catch (e) {
            console.error('Erro ao atualizar compra: ' + (e as Error).message);
        } finally {
            await conn.end();
        }
    }

    public async savePurchase(purchase: Purchase): Promise<void> {
        const conn = await this.databaseConnection.getConnection();
        try {
            const dao = new PurchaseDAO(conn);
            await dao.savePurchase(purchase);
        } catch (e) {
            console.error('Erro ao salvar compra: ' + (e as Error).message);
        } finally {
            await conn.end();
        }
    }
}
