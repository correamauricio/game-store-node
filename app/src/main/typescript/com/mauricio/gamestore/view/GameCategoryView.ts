import { GameCategoryController } from '../controller/GameCategoryController.js';
import { GameCategoryResponseDTO } from '../model/dto/response/GameCategoryResponseDTO.js';
import { DatabaseConnection } from '../util/DatabaseConnection.js';

export class GameCategoryView {
    private readonly gameCategoryController: GameCategoryController;

    constructor(databaseConnection: DatabaseConnection) {
        this.gameCategoryController = new GameCategoryController(databaseConnection);
    }

    public async displayAllCategories(): Promise<void> {
        const allCategories: GameCategoryResponseDTO[] = await this.gameCategoryController.findAll();

        console.log('\n-- TODAS AS CATEGORIAS --');
        for (const category of allCategories) {
            console.log(`${category.getId()}. ${category.getTitle()}`);
        }
    }
}
