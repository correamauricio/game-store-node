import { CustomerDAO } from '../dao/CustomerDAO.js';
import { Customer } from '../entity/Customer.js';
import { DatabaseConnection } from '../../util/DatabaseConnection.js';

export class CustomerService {
    private readonly databaseConnection: DatabaseConnection;

    constructor(databaseConnection: DatabaseConnection) {
        this.databaseConnection = databaseConnection;
    }

    public async getAllCustomers(): Promise<Customer[]> {
        const conn = await this.databaseConnection.getConnection();
        try {
            const dao = new CustomerDAO(conn);
            return await dao.getAllCustomers();
        } catch (e) {
            console.error('Erro ao listar clientes: ' + (e as Error).message);
        } finally {
            await conn.end();
        }
        return [];
    }

    public async findById(id: number): Promise<Customer | null> {
        const conn = await this.databaseConnection.getConnection();
        try {
            const dao = new CustomerDAO(conn);
            return await dao.findById(id);
        } catch (e) {
            console.error('Erro ao buscar cliente: ' + (e as Error).message);
        } finally {
            await conn.end();
        }
        return null;
    }

    public async registerCustomer(customer: Customer): Promise<boolean> {
        const conn = await this.databaseConnection.getConnection();
        try {
            const dao = new CustomerDAO(conn);
            return await dao.create(customer);
        } catch (e) {
            console.error('Erro ao cadastrar cliente: ' + (e as Error).message);
            return false;
        } finally {
            await conn.end();
        }
    }

    public async updateCustomer(customer: Customer): Promise<boolean> {
        const conn = await this.databaseConnection.getConnection();
        try {
            const dao = new CustomerDAO(conn);
            return await dao.update(customer);
        } catch (e) {
            console.error('Erro ao atualizar cliente: ' + (e as Error).message);
            return false;
        } finally {
            await conn.end();
        }
    }
}
