import { CustomerRequestDTO } from '../model/dto/request/CustomerRequestDTO.js';
import { CustomerUpdateRequestDTO } from '../model/dto/request/CustomerUpdateRequestDTO.js';
import { CustomerResponseDTO } from '../model/dto/response/CustomerResponseDTO.js';
import { Customer } from '../model/entity/Customer.js';
import { ICustomerService } from '../model/interfaces/ICustomerService.js';
import { CustomerNotFoundError } from '../model/service/CustomerService.js';

export class HttpRequestError extends Error {
    public readonly status: number;
    public readonly code: string;
    constructor(message: string, status?: number, code?: string) {
        super(message);
        this.name = 'HTTP_REQUEST_ERROR';
        this.status = status ?? 500;
        this.code = code ?? 'INTERNAL_SERVER_ERROR';
        this.message = message;
    }
}

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
        try {
            const customer = await this.customerService.findById(id);
            
            return this.convertToResponseDTO(customer);
        }catch (error) {
            if(error instanceof CustomerNotFoundError) {
                throw new HttpRequestError(error.message, 404, 'CUSTOMER_NOT_FOUND');
            }
            throw error;
        }
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
