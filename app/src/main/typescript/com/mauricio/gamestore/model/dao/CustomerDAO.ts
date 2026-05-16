import { Connection, RowDataPacket } from 'mysql2/promise';
import { Customer } from '../entity/Customer.js';

export class CustomerDAO {
    private readonly conn: Connection;

    constructor(conn: Connection) {
        this.conn = conn;
    }

    public async getAllCustomers(): Promise<Customer[]> {
        const customers: Customer[] = [];
        const sql = 'SELECT id, nome, email, idade FROM cliente';

        try {
            const [rows] = await this.conn.execute<RowDataPacket[]>(sql);

            for (const rs of rows) {
                const customer = new Customer(
                    rs.id as number,
                    rs.nome as string,
                    rs.email as string,
                    rs.idade as number
                );
                customers.push(customer);
            }
        } catch (e) {
            console.error('Erro ao listar clientes: ' + (e as Error).message);
        }
        return customers;
    }

    public async findById(id: number): Promise<Customer | null> {
        const sql = 'SELECT id, nome, email, idade FROM cliente WHERE id = ?';
        try {
            const [rows] = await this.conn.execute<RowDataPacket[]>(sql, [id]);
            if (rows.length > 0) {
                const rs = rows[0];
                return new Customer(
                    rs.id as number,
                    rs.nome as string,
                    rs.email as string,
                    rs.idade as number
                );
            }
        } catch (e) {
            console.error('Erro ao buscar cliente por ID: ' + (e as Error).message);
        }
        return null;
    }

    public async create(customer: Customer): Promise<boolean> {
        const sql = 'INSERT INTO cliente (nome, email, idade) VALUES (?, ?, ?)';
        try {
            const [result] = await this.conn.execute(sql, [
                customer.getName(),
                customer.getEmail(),
                customer.getAge(),
            ]);
            const rowsInserted = (result as { affectedRows: number }).affectedRows;
            return rowsInserted > 0;
        } catch (e) {
            console.error('Erro ao cadastrar cliente: ' + (e as Error).message);
            return false;
        }
    }

    public async update(customer: Customer): Promise<boolean> {
        const sql = 'UPDATE cliente SET nome = ?, email = ?, idade = ? WHERE id = ?';
        try {
            const [result] = await this.conn.execute(sql, [
                customer.getName(),
                customer.getEmail(),
                customer.getAge(),
                customer.getId(),
            ]);
            const rowsUpdated = (result as { affectedRows: number }).affectedRows;
            return rowsUpdated > 0;
        } catch (e) {
            console.error('Erro ao atualizar cliente: ' + (e as Error).message);
            return false;
        }
    }
}
