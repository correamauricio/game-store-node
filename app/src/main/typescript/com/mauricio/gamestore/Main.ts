import { CustomerController } from './controller/CustomerController.js';
import { GameCategoryController } from './controller/GameCategoryController.js';
import { GameController } from './controller/GameController.js';
import { PurchaseController } from './controller/PurchaseController.js';
import { CustomerService } from './model/service/CustomerService.js';
import { GameCategoryService } from './model/service/GameCategoryService.js';
import { GameService } from './model/service/GameService.js';
import { PurchaseService } from './model/service/PurchaseService.js';
import { DatabaseConnection } from './util/DatabaseConnection.js';
import { MainView } from './view/MainView.js';

async function main(): Promise<void> {

    const databaseConnection = new DatabaseConnection('localhost', 3306, 'loja_games', 'app_user', 'app_password');
    const connection = await databaseConnection.getConnection();   

    const gameCategoryService = new GameCategoryService(databaseConnection);
    const gameService = new GameService(databaseConnection);
    const customerService = new CustomerService(databaseConnection);
    const purchaseService = new PurchaseService(databaseConnection);

    const gameCategoryController = new GameCategoryController(gameCategoryService);
    const gameController = new GameController(gameCategoryService, gameService);
    const customerController = new CustomerController(customerService);
    const purchaseController = new PurchaseController(purchaseService, customerService, gameService);

    const mainView = new MainView(gameCategoryController, gameController, customerController, purchaseController);   

    await mainView.displayMenu();
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
