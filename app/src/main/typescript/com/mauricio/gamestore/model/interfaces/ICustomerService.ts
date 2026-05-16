import { CustomerUpdateRequestDTO } from '../dto/request/CustomerUpdateRequestDTO.js';
import { Customer } from '../entity/Customer.js';

export interface ICustomerService {     

    getAllCustomers(): Promise<Customer[]>
    findById(id: number): Promise<Customer | null>
    registerCustomer(customer: Customer): Promise<boolean>
    updateCustomer(id: number, request: CustomerUpdateRequestDTO): Promise<boolean> 
}
