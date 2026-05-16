import { GameCategoryController } from '../controller/GameCategoryController.js';
import { GameCategoryResponseDTO } from '../model/dto/response/GameCategoryResponseDTO.js';

export class GameCategoryView {
    private readonly gameCategoryController: GameCategoryController;

    constructor(gameCategoryController: GameCategoryController) {
        this.gameCategoryController = gameCategoryController;
    }

    public async displayAllCategories(): Promise<void> {
        const allCategories: GameCategoryResponseDTO[] = await this.gameCategoryController.findAll();

        console.log('\n-- TODAS AS CATEGORIAS --');
        for (const category of allCategories) {
            console.log(`${category.getId()}. ${category.getTitle()}`);
        }
    }
}
