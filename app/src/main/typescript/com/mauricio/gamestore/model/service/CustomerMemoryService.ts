import { CustomerDAO } from '../dao/CustomerDAO.js';
import { Customer } from '../entity/Customer.js';
import { DatabaseConnection } from '../../util/DatabaseConnection.js';
import { ICustomerService } from '../interfaces/ICustomerService.js';
import { CustomerUpdateRequestDTO } from '../dto/request/CustomerUpdateRequestDTO.js';

export class CustomerMemoryService implements ICustomerService {
    private readonly customers: Customer[] = [];

    public async getAllCustomers(): Promise<Customer[]> {
        return this.customers;
    }

    public async findById(id: number): Promise<Customer | null> {
        return this.customers.find((customer: Customer) => customer.getId() === id) || null;
    }

    public async registerCustomer(customer: Customer): Promise<boolean> {
        this.customers.push(customer);
        return true;
    }

    public async updateCustomer(id: number, request: CustomerUpdateRequestDTO): Promise<boolean> {
        const index = this.customers.findIndex((c: Customer) => c.getId() === id);
        if (index !== -1) {
            this.customers[index] = new Customer(request.name, request.email != null ? request.email : this.customers[index].getEmail(), request.age != null ? request.age : this.customers[index].getAge());
        }
        return index !== -1;
    }
}
