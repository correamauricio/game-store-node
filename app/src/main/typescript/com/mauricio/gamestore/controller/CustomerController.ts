import { CustomerRequestDTO } from '../model/dto/request/CustomerRequestDTO.js';
import { CustomerUpdateRequestDTO } from '../model/dto/request/CustomerUpdateRequestDTO.js';
import { CustomerResponseDTO } from '../model/dto/response/CustomerResponseDTO.js';
import { Customer } from '../model/entity/Customer.js';
import { ICustomerService } from '../model/interfaces/ICustomerService.js';

export class CustomerController {
    private readonly customerService: ICustomerService;

    constructor(customerService: ICustomerService) {
        this.customerService = customerService;
    }

    public async getAllCustomers(): Promise<CustomerResponseDTO[]> {
        const customers = await this.customerService.getAllCustomers();
        return customers.map((customer: Customer) => this.convertToResponseDTO(customer));
    }

    public async findById(id: number): Promise<CustomerResponseDTO> {
        const customer = await this.customerService.findById(id);
        if (customer == null) {
            throw new Error('Cliente com ID ' + id + ' não encontrado.');
        }
        return this.convertToResponseDTO(customer);
        
    }

    public async registerCustomer(request: CustomerRequestDTO): Promise<boolean> {
        const customer = new Customer(request.name, request.email, request.age);
        return await this.customerService.registerCustomer(customer);
    }

    public async updateCustomer(id: number, request: CustomerUpdateRequestDTO): Promise<boolean> {
        
        return await this.customerService.updateCustomer(id, request);
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
