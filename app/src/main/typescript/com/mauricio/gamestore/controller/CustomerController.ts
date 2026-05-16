import { CustomerRequestDTO } from '../model/dto/request/CustomerRequestDTO.js';
import { CustomerResponseDTO } from '../model/dto/response/CustomerResponseDTO.js';
import { Customer } from '../model/entity/Customer.js';
import { CustomerService } from '../model/service/CustomerService.js';
import { DatabaseConnection } from '../util/DatabaseConnection.js';

export class CustomerController {
    private readonly customerService: CustomerService;

    constructor(databaseConnection: DatabaseConnection) {
        this.customerService = new CustomerService(databaseConnection);
    }

    public async getAllCustomers(): Promise<CustomerResponseDTO[]> {
        const customers = await this.customerService.getAllCustomers();
        return customers.map((customer) => this.convertToResponseDTO(customer));
    }

    public async findById(id: number): Promise<CustomerResponseDTO | null> {
        const customer = await this.customerService.findById(id);
        return customer != null ? this.convertToResponseDTO(customer) : null;
    }

    public async registerCustomer(request: CustomerRequestDTO): Promise<boolean> {
        const customer = new Customer(request.getName(), request.getEmail(), request.getAge());
        return await this.customerService.registerCustomer(customer);
    }

    public async updateCustomer(id: number, request: CustomerRequestDTO): Promise<boolean> {
        const customer = new Customer(id, request.getName(), request.getEmail(), request.getAge());
        return await this.customerService.updateCustomer(customer);
    }

    private convertToResponseDTO(customer: Customer): CustomerResponseDTO {
        return new CustomerResponseDTO(
            customer.getId(),
            customer.getName(),
            customer.getEmail(),
            customer.getAge()
        );
    }
}
