
import { readLine } from '../util/ConsoleInput.js';
import { CustomerView } from './CustomerView.js';
import { GameControllerTerminal } from '../controller/GameControllerTerminal.js';
import { PurchaseView } from './PurchaseView.js';

export class MainView { 
    private readonly customerView: CustomerView;
    private readonly gameController: GameControllerTerminal;
    private readonly purchaseView: PurchaseView;

    constructor(customerView: CustomerView, gameController: GameControllerTerminal, purchaseView: PurchaseView) {
        this.customerView = customerView;
        this.gameController = gameController;
        this.purchaseView = purchaseView;
    }

    public async displayMenu(): Promise<void> {
       
            console.log('\n -- MENU DO SISTEMA --');
            console.log('1. Listar todos os Jogos');
            console.log('2. Buscar Jogo por ID');
            console.log('3. Cadastrar novo Jogo');
            console.log('4. Editar Jogo');

            console.log('\n5. Listar todos os Clientes');
            console.log('6. Buscar Cliente por ID');
            console.log('7. Cadastrar novo Cliente');
            console.log('8. Editar Cliente');

            console.log('\n9. Listar todas as Compras');
            console.log('10. Buscar Compra por ID');
            console.log('11. Registrar nova Compra');
            console.log('12. Editar Compra');

            console.log('\n0. Sair');

            const option = await readLine('Escolha uma opção: ');

            switch (option) {
                case '1':
                    await this.gameController.displayAllGames();
                    break;
                case '2':
                    await this.gameController.findGameById();
                    break;
                case '3':
                    await this.gameController.registerGame();
                    break;
                case '4':
                    await this.gameController.editGame();
                    break;
                case '5':
                    await this.customerView.displayAllCustomers();
                    break;
                case '6':
                    await this.customerView.findCustomerById();
                    break;
                case '7':
                    await this.customerView.registerCustomer();
                    break;
                case '8':
                    await this.customerView.editCustomer();
                    break;
                case '9':
                    await this.purchaseView.displayAllPurchases();
                    break;
                case '10':
                    await this.purchaseView.searchPurchaseById();
                    break;
                case '11':
                    await this.purchaseView.registerPurchase();
                    break;
                case '12':
                    await this.purchaseView.editPurchase();
                    break;

                case '0':
                    console.log('Saindo do sistema...');
                    process.exit(0);
                default:
                    console.log('Opção inválida. Tente novamente.');
            }
        
    }
}
