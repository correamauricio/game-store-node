import { CustomerDAO } from '../dao/CustomerDAO.js';
import { Customer } from '../entity/Customer.js';
import { DatabaseConnection } from '../../util/DatabaseConnection.js';
import { ICustomerService } from '../interfaces/ICustomerService.js';
import { CustomerUpdateRequestDTO } from '../dto/request/CustomerUpdateRequestDTO.js';
import { CustomerDAOError } from '../dao/CustomerDAO.js';
import { InternalServerError } from '../entity/InternalServerError.js';

export class CustomerNotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'CUSTOMER_NOT_FOUND_ERROR';
    }
}

export class CustomerService implements ICustomerService {
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

    public async findById(id: number): Promise<Customer> {
        const conn = await this.databaseConnection.getConnection();
        try {
            const dao = new CustomerDAO(conn);
            let customer = await dao.findById(id);
            if (customer == null) {
                throw new CustomerNotFoundError('Cliente com ID ' + id + ' não encontrado.');
            }
            return customer;
        } catch (e) {
            if(e instanceof InternalServerError) {
                throw new Error(e.message, { cause: e });
            }
            throw e;
        } finally {
            await conn.end();
        }   
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

    public async updateCustomer(id: number, request: CustomerUpdateRequestDTO): Promise<boolean> {
        const conn = await this.databaseConnection.getConnection();
        try {

            const dao = new CustomerDAO(conn);
            const customerDb = await dao.findById(id);

            if (customerDb == null) {
                throw new Error('Cliente com ID ' + id + ' não encontrado.');
            }

            if(request.email != null) {
                customerDb.setEmail(request.email);
            }
            if(request.age != null) {
                customerDb.setAge(request.age);
            }
            if(request.name != null) {
                customerDb.setName(request.name);
            }

            return await dao.update(customerDb);
        } catch (e) {
            console.error('Erro ao atualizar cliente: ' + (e as Error).message);
            return false;
        } finally {
            await conn.end();
        }
    }
}
