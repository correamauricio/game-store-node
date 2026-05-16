import { readLine } from '../util/ConsoleInput.js';
import { DatabaseConnection } from '../util/DatabaseConnection.js';
import { CustomerView } from './CustomerView.js';
import { GameView } from './GameView.js';
import { PurchaseView } from './PurchaseView.js';

export class MainView {
    public async displayMenu(databaseConnection: DatabaseConnection): Promise<void> {
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
                    await new GameView(databaseConnection).displayAllGames();
                    break;
                case '2':
                    await new GameView(databaseConnection).findGameById();
                    break;
                case '3':
                    await new GameView(databaseConnection).registerGame();
                    break;
                case '4':
                    await new GameView(databaseConnection).editGame();
                    break;
                case '5':
                    await new CustomerView(databaseConnection).displayAllCustomers();
                    break;
                case '6':
                    await new CustomerView(databaseConnection).findCustomerById();
                    break;
                case '7':
                    await new CustomerView(databaseConnection).registerCustomer();
                    break;
                case '8':
                    await new CustomerView(databaseConnection).editCustomer();
                    break;
                case '9':
                    await new PurchaseView(databaseConnection).displayAllPurchases();
                    break;
                case '10':
                    await new PurchaseView(databaseConnection).searchPurchaseById();
                    break;
                case '11':
                    await new PurchaseView(databaseConnection).registerPurchase();
                    break;
                case '12':
                    await new PurchaseView(databaseConnection).editPurchase();
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
