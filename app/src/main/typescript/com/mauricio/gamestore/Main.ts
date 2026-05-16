import { DatabaseConnection } from './util/DatabaseConnection.js';
import { MainView } from './view/MainView.js';

async function main(): Promise<void> {


    const databaseConnection = new DatabaseConnection('localhost', 3306, 'loja_games', 'app_user', 'app_password');
    const connection = await databaseConnection.getConnection();   

    const mainView = new MainView();
    await mainView.displayMenu(databaseConnection);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
