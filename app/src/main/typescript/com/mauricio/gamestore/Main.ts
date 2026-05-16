
import { CustomerController } from './controller/CustomerController.js';
import { GameCategoryController } from './controller/GameCategoryController.js';
import { GameControllerHttp } from './controller/GameControllerHttp.js';
import { PurchaseController } from './controller/PurchaseController.js';
import { CustomerService } from './model/service/CustomerService.js';
import { GameCategoryService } from './model/service/GameCategoryService.js';
import { GameService } from './model/service/GameService.js';
import { PurchaseService } from './model/service/PurchaseService.js';
import { DatabaseConnection } from './util/DatabaseConnection.js';
import { CustomerView } from './view/CustomerView.js';
import { GameView } from './view/GameView.js';
import { MainView } from './view/MainView.js';
import { PurchaseView } from './view/PurchaseView.js';
import { ICustomerService } from './model/interfaces/ICustomerService.js';
import express, { Request, Response } from 'express';
import { GameViewHtml } from './view/GameViewHtml.js';
import { GameControllerTerminal } from './controller/GameControllerTerminal.js';

async function main(): Promise<void> {

    const databaseConnection = new DatabaseConnection('localhost', 3306, 'loja_games', 'app_user', 'app_password');
    const connection = await databaseConnection.getConnection();   

    const gameCategoryService = new GameCategoryService(databaseConnection);
    const gameService = new GameService(databaseConnection);
    const customerService = new CustomerService(databaseConnection) as unknown as ICustomerService;
    const purchaseService = new PurchaseService(databaseConnection);

    const gameViewHtml = new GameViewHtml();

    const gameCategoryController = new GameCategoryController(gameCategoryService);
    const gameView = new GameView(gameCategoryController);
    const gameControllerTerminal = new GameControllerTerminal(
        gameCategoryService,
        gameService,
        gameView
    );
    const gameControllerHttp = new GameControllerHttp(
        gameCategoryService,
        gameService,
        gameViewHtml
    );
    const customerController = new CustomerController(customerService);
    const purchaseController = new PurchaseController(purchaseService, customerService, gameService);

    const customerView = new CustomerView(customerController);
    const purchaseView = new PurchaseView(purchaseController, customerController, gameControllerTerminal);

    const mainView = new MainView(customerView, gameControllerTerminal, purchaseView);

    while (true) {
        try {
            await mainView.displayMenu();
        } catch (error: any) {
            if (error instanceof Error) {
                console.error(
                    `\x1b[31m[ERRO - ${error.name || 'N/A'}] ${error.message}\x1b[0m\n`
                );
            }
            console.log(error);
        }
    }

    // const app = express();
    // app.use(express.urlencoded({ extended: true }));

    // app.get('/', (req: Request, res: Response) => gameControllerHttp.getAllGamesJson(req, res));

    // app.get('/view', (req: Request, res: Response) => gameControllerHttp.getAllGames(req, res));
    // app.get('/view/games/new', (req: Request, res: Response) =>
    //     gameControllerHttp.showCreateForm(req, res)
    // );
    // app.post('/view/games', (req: Request, res: Response) => gameControllerHttp.createGame(req, res));
    // app.get('/view/games/:id/edit', (req: Request, res: Response) =>
    //     gameControllerHttp.showEditForm(req, res)
    // );
    // app.post('/view/games/:id', (req: Request, res: Response) =>
    //     gameControllerHttp.updateGameHttp(req, res)
    // );
    // app.get('/view/games/:id', (req: Request, res: Response) =>
    //     gameControllerHttp.getGameByIdDetail(req, res)
    // );

    // app.listen(3000, () => {
    //     console.log('Server is running on port 3000');
    // });
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
