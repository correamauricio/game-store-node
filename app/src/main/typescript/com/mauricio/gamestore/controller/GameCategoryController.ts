import { GameCategoryResponseDTO } from '../model/dto/response/GameCategoryResponseDTO.js';
import { GameCategory } from '../model/entity/GameCategory.js';
import { GameCategoryService } from '../model/service/GameCategoryService.js';

export class GameCategoryController {
    private readonly categoryService: GameCategoryService;

    constructor(gameCategoryService: GameCategoryService) {
        this.categoryService = gameCategoryService;
    }

    public async findAll(): Promise<GameCategoryResponseDTO[]> {
        const categories = await this.categoryService.findAll();
        return categories.map((category) => this.convertToResponseDTO(category));
    }

    public async findById(id: number): Promise<GameCategoryResponseDTO | null> {
        const category = await this.categoryService.findById(id);
        return category != null ? this.convertToResponseDTO(category) : null;
    }

    private convertToResponseDTO(category: GameCategory): GameCategoryResponseDTO {
        return new GameCategoryResponseDTO(category.getId(), category.getTitle());
    }
}
