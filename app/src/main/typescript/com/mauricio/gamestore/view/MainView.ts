import { CustomerController } from '../controller/CustomerController.js';
import { GameCategoryController } from '../controller/GameCategoryController.js';
import { GameController } from '../controller/GameController.js';
import { PurchaseController } from '../controller/PurchaseController.js';
import { readLine } from '../util/ConsoleInput.js';
import { CustomerView } from './CustomerView.js';
import { GameView } from './GameView.js';
import { PurchaseView } from './PurchaseView.js';

export class MainView { 
    private readonly gameCategoryController: GameCategoryController;
    private readonly gameController: GameController;
    private readonly customerController: CustomerController;
    private readonly purchaseController: PurchaseController;
    private readonly customerView: CustomerView;
    private readonly gameView: GameView;
    private readonly purchaseView: PurchaseView;

    constructor(gameCategoryController: GameCategoryController, gameController: GameController, customerController: CustomerController, purchaseController: PurchaseController) {
        this.gameCategoryController = gameCategoryController;
        this.gameController = gameController;
        this.customerController = customerController;
        this.purchaseController = purchaseController;
        this.customerView = new CustomerView(this.customerController);
        this.gameView = new GameView(this.gameController, this.gameCategoryController);
        this.purchaseView = new PurchaseView(this.purchaseController, this.customerController, this.gameController, this.gameCategoryController);
    }

    public async displayMenu(): Promise<void> {
        while (true) {
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
                    await new GameView(this.gameController, this.gameCategoryController).displayAllGames();
                    break;
                case '2':
                    await new GameView(this.gameController, this.gameCategoryController).findGameById();
                    break;
                case '3':
                    await new GameView(this.gameController, this.gameCategoryController).registerGame();
                    break;
                case '4':
                    await new GameView(this.gameController, this.gameCategoryController).editGame();
                    break;
                case '5':
                    await new CustomerView(this.customerController).displayAllCustomers();
                    break;
                case '6':
                    await new CustomerView(this.customerController).findCustomerById();
                    break;
                case '7':
                    await new CustomerView(this.customerController).registerCustomer();
                    break;
                case '8':
                    await new CustomerView(this.customerController).editCustomer();
                    break;
                case '9':
                    await new PurchaseView(this.purchaseController, this.customerController, this.gameController, this.gameCategoryController).displayAllPurchases();
                    break;
                case '10':
                    await new PurchaseView(this.purchaseController, this.customerController, this.gameController, this.gameCategoryController).searchPurchaseById();
                    break;
                case '11':
                    await new PurchaseView(this.purchaseController, this.customerController, this.gameController, this.gameCategoryController).registerPurchase();
                    break;
                case '12':
                    await new PurchaseView(this.purchaseController, this.customerController, this.gameController, this.gameCategoryController).editPurchase();
                    break;

                case '0':
                    console.log('Saindo do sistema...');
                    process.exit(0);
                default:
                    console.log('Opção inválida. Tente novamente.');
            }
        }
    }
}
