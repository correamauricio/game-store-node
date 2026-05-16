import { CustomerController } from '../controller/CustomerController.js';
import { readLine } from '../util/ConsoleInput.js';
import { CustomerRequestDTO } from '../model/dto/request/CustomerRequestDTO.js';
import { CustomerResponseDTO } from '../model/dto/response/CustomerResponseDTO.js';
import { DatabaseConnection } from '../util/DatabaseConnection.js';

function formatLeft(value: string | number, width: number): string {
    const str = String(value);
    return str.length >= width ? str.substring(0, width) : str + ' '.repeat(width - str.length);
}

export class CustomerView {
    private readonly customerController: CustomerController;

    constructor(databaseConnection: DatabaseConnection) {
        this.customerController = new CustomerController(databaseConnection);
    }

    public async registerCustomer(): Promise<void> {
        console.log('\n -- CADASTRAR NOVO CLIENTE --');
        const name = await readLine('Nome: ');
        const email = await readLine('Email: ');
        const ageLine = await readLine('Idade: ');
        try {
            const age = parseInt(ageLine, 10);
            const request = new CustomerRequestDTO(name, email, age);
            if (await this.customerController.registerCustomer(request)) {
                console.log('Cliente cadastrado com sucesso!');
            } else {
                console.log('Erro ao cadastrar cliente.');
            }
        } catch {
            console.log('Idade inválida. Operação cancelada.');
        }
    }

    public async displayAllCustomers(): Promise<void> {
        const customers: CustomerResponseDTO[] = await this.customerController.getAllCustomers();
        console.log('\n -- LISTA DE CLIENTES --');
        if (customers.length === 0) {
            console.log('Nenhum cliente encontrado.');
        } else {
            console.log(
                `${formatLeft('ID', 5)} | ${formatLeft('Nome', 20)} | ${formatLeft('Email', 25)} | ${formatLeft('Idade', 5)}`
            );
            console.log('---------------------------------------------------------------');
            for (const customer of customers) {
                console.log(
                    `${formatLeft(customer.getId(), 5)} | ${formatLeft(customer.getName(), 20)} | ${formatLeft(customer.getEmail(), 25)} | ${formatLeft(customer.getAge(), 5)}`
                );
            }
        }
    }

    public async findCustomerById(): Promise<void> {
        console.log('\n -- BUSCAR CLIENTE POR ID --');
        const idLine = await readLine('Digite o ID do cliente: ');
        try {
            const id = parseInt(idLine, 10);
            const customer = await this.customerController.findById(id);

            if (customer != null) {
                console.log('\nCliente encontrado:');
                console.log('ID: ' + customer.getId());
                console.log('Nome: ' + customer.getName());
                console.log('Email: ' + customer.getEmail());
                console.log('Idade: ' + customer.getAge());
            } else {
                console.log('Cliente com ID ' + id + ' não encontrado.');
            }
        } catch {
            console.log('ID inválido. Por favor, digite um número.');
        }
    }

    public async editCustomer(): Promise<void> {
        console.log('\n -- EDITAR CLIENTE --');
        await this.displayAllCustomers();
        const idLine = await readLine('\nDigite o ID do cliente que deseja editar: ');
        try {
            const id = parseInt(idLine, 10);
            const customer = await this.customerController.findById(id);

            if (customer != null) {
                console.log(
                    'Dados atuais - Nome: ' +
                        customer.getName() +
                        ', Email: ' +
                        customer.getEmail() +
                        ', Idade: ' +
                        customer.getAge()
                );

                let name = await readLine('Novo nome (deixe em branco para manter): ');
                if (name.trim() === '') name = customer.getName();

                let email = await readLine('Novo email (deixe em branco para manter): ');
                if (email.trim() === '') email = customer.getEmail();

                const ageStr = await readLine('Nova idade (deixe em branco para manter): ');
                const age = ageStr.trim() === '' ? customer.getAge() : parseInt(ageStr, 10);

                const request = new CustomerRequestDTO(name, email, age);
                if (await this.customerController.updateCustomer(id, request)) {
                    console.log('Cliente atualizado com sucesso!');
                } else {
                    console.log('Erro ao atualizar cliente.');
                }
            } else {
                console.log('Cliente com ID ' + id + ' não encontrado.');
            }
        } catch {
            console.log('Entrada inválida. Operação cancelada.');
        }
    }
}
