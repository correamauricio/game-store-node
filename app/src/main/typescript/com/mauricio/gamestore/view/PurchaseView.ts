import { PurchaseController } from '../controller/PurchaseController.js';
import { readLine } from '../util/ConsoleInput.js';
import { PurchaseRequestDTO } from '../model/dto/request/PurchaseRequestDTO.js';
import { PurchaseResponseDTO } from '../model/dto/response/PurchaseResponseDTO.js';
import { CustomerView } from './CustomerView.js';
import { GameView } from './GameView.js';
import { DatabaseConnection } from '../util/DatabaseConnection.js';
import { GameService } from '../model/service/GameService.js';
import { GameCategoryService } from '../model/service/GameCategoryService.js';
import { PurchaseService } from '../model/service/PurchaseService.js';
import { CustomerService } from '../model/service/CustomerService.js';
import { CustomerController } from '../controller/CustomerController.js';
import { GameCategoryController } from '../controller/GameCategoryController.js';
import { GameController } from '../controller/GameController.js';

function formatLeft(value: string | number, width: number): string {
    const str = String(value);
    return str.length >= width ? str.substring(0, width) : str + ' '.repeat(width - str.length);
}

function formatTotal(value: number): string {
    return 'R$ ' + formatLeft(value.toFixed(2), 8);
}

export class PurchaseView {
    private readonly purchaseController: PurchaseController;
    private readonly customerController: CustomerController;
    private readonly gameController: GameController;
    private readonly gameCategoryController: GameCategoryController;
    private readonly customerView: CustomerView;
    private readonly gameView: GameView;
  

    constructor(purchaseController: PurchaseController, customerController: CustomerController, gameController: GameController, gameCategoryController: GameCategoryController) {
        
        this.purchaseController = purchaseController;
        this.customerController = customerController;   
        this.gameController = gameController;
        this.gameCategoryController = gameCategoryController;
        this.customerView = new CustomerView(this.customerController);
        this.gameView = new GameView(this.gameController, this.gameCategoryController);
    }

    public async displayAllPurchases(): Promise<void> {
        const purchases: PurchaseResponseDTO[] = await this.purchaseController.getAllPurchases();

        console.log('\n-- LISTA DE TODAS AS COMPRAS --');

        if (purchases.length === 0) {
            console.log('Nenhuma compra registrada.');
        } else {
            console.log(
                `${formatLeft('ID', 5)} | ${formatLeft('Cliente', 15)} | ${formatLeft('Jogo', 20)} | ${formatLeft('Data', 10)} | ${formatLeft('Qtd', 10)} | ${formatLeft('Total', 10)}`
            );
            console.log('---------------------------------------------------------------------------------------');
            for (const purchase of purchases) {
                console.log(
                    `${formatLeft(purchase.getId(), 5)} | ${formatLeft(purchase.getCustomerName(), 15)} | ${formatLeft(purchase.getGameTitle(), 20)} | ${formatLeft(purchase.getPurchaseDate(), 10)} | ${formatLeft(purchase.getQuantity(), 10)} | ${formatTotal(purchase.getTotalValue())}`
                );
            }
        }
    }

    public async searchPurchaseById(): Promise<void> {
        const idLine = await readLine('\nDigite o ID da compra que deseja buscar: ');
        try {
            const id = parseInt(idLine, 10);
            const purchase = await this.purchaseController.getPurchaseById(id);

            if (purchase == null) {
                console.log('Compra com ID ' + id + ' não encontrada.');
            } else {
                console.log('\n-- DETALHES DA COMPRA --');
                console.log(
                    `${formatLeft('ID', 5)} | ${formatLeft('Cliente', 15)} | ${formatLeft('Jogo', 20)} | ${formatLeft('Data', 10)} | ${formatLeft('Qtd', 10)} | ${formatLeft('Total', 10)}`
                );
                console.log('---------------------------------------------------------------------------------------');
                console.log(
                    `${formatLeft(purchase.getId(), 5)} | ${formatLeft(purchase.getCustomerName(), 15)} | ${formatLeft(purchase.getGameTitle(), 20)} | ${formatLeft(purchase.getPurchaseDate(), 10)} | ${formatLeft(purchase.getQuantity(), 10)} | ${formatTotal(purchase.getTotalValue())}`
                );
            }
        } catch {
            console.log('ID inválido. Por favor, digite um número.');
        }
    }

    public async editPurchase(): Promise<void> {
        console.log('\n-- EDIÇÃO DE COMPRA --');
        await this.displayAllPurchases();

        const idLine = await readLine('\nDigite o ID da compra que deseja editar: ');
        try {
            const id = parseInt(idLine, 10);
            const purchase = await this.purchaseController.getPurchaseById(id);

            if (purchase == null) {
                console.log('Compra com ID ' + id + ' não encontrada.');
            } else {
                console.log('\n-- EDITANDO COMPRA --');
                console.log('Cliente: ' + purchase.getCustomerName());
                console.log('Jogo: ' + purchase.getGameTitle());
                console.log('Data: ' + purchase.getPurchaseDate());
                console.log('Quantidade Atual: ' + purchase.getQuantity());

                const inputLine = await readLine(
                    'Digite a nova quantidade (ou pressione Enter para manter): '
                );
                const quantity = inputLine === '' ? purchase.getQuantity() : parseInt(inputLine, 10);

                const request = new PurchaseRequestDTO(
                    purchase.getCustomerId(),
                    purchase.getGameId(),
                    quantity
                );
                await this.purchaseController.updatePurchase(id, request);
                console.log('Compra atualizada com sucesso!');
            }
        } catch {
            console.log('Entrada inválida. Operação cancelada.');
        }
    }

    public async registerPurchase(): Promise<void> {
        console.log('\n-- REGISTRO DE NOVA COMPRA --');

        try {
            console.log('\n-- LISTA DE CLIENTES --');
            await this.customerView.displayAllCustomers();

            const customerId = parseInt(await readLine('Digite o ID do Cliente: '), 10);

            console.log('\n-- LISTA DE JOGOS --');
            await this.gameView.displayAllGames();

            const gameId = parseInt(await readLine('Digite o ID do Jogo: '), 10);

            const quantity = parseInt(await readLine('Digite a Quantidade: '), 10);

            const request = new PurchaseRequestDTO(customerId, gameId, quantity);
            const result = await this.purchaseController.registerPurchase(request);
            console.log(result);
        } catch {
            console.log('Entrada inválida. Certifique-se de digitar números para IDs e Quantidade.');
        }
    }
}
