import { GameRequestDTO } from '../model/dto/request/GameRequestDTO.js';
import { GameResponseDTO } from '../model/dto/response/GameResponseDTO.js';
import { Game } from '../model/entity/Game.js';
import { GameCategoryService } from '../model/service/GameCategoryService.js';
import { GameService } from '../model/service/GameService.js';
import { IGameController } from '../model/interfaces/IGameController.js';
import { GameView } from '../view/GameView.js';

export class GameControllerTerminal implements IGameController {
    private readonly gameService: GameService;
    private readonly gameCategoryService: GameCategoryService;
    private readonly gameView: GameView;

    constructor(
        gameCategoryService: GameCategoryService,
        gameService: GameService,
        gameView: GameView
    ) {
        this.gameCategoryService = gameCategoryService;
        this.gameService = gameService;
        this.gameView = gameView;
    }

    public async registerGame(): Promise<void> {
        const request = await this.gameView.readRegisterGameInput();
        const message = await this.addGame(request);
        this.gameView.displayMessage(message);
    }

    public async displayAllGames(): Promise<void> {
        const games = await this.getAllGames();
        this.gameView.displayAllGames(games);
    }

    public async editGame(): Promise<void> {
        await this.displayAllGames();

        const id = await this.gameView.readEditGameId();

        const game = await this.getGameById(id);
        if (game == null) {
            this.gameView.displayGameNotFoundForEdit();
            return;
        }

        const request = await this.gameView.readEditGameInput(game);
        const message = await this.updateGame(id, request);
        this.gameView.displayMessage(message);
    }

    public async findGameById(): Promise<void> {
        try {
            const id = await this.gameView.readFindGameId();
            const game = await this.getGameById(id);

            if (game != null) {
                this.gameView.displayGameDetail(game);
            } else {
                this.gameView.displayGameNotFound(id);
            }
        } catch {
            this.gameView.displayInvalidGameId();
        }
    }

    public async addGame(request: GameRequestDTO): Promise<string> {
        if (request.getTitle() == null || request.getTitle().trim() === '') {
            return 'Erro: O título não pode ser vazio.';
        }

        if (request.getGender() == null || request.getGender().trim() === '') {
            return 'Erro: O gênero não pode ser vazio.';
        }

        const category = await this.gameCategoryService.findById(request.getCategoryId());

        if (category == null) {
            return 'Erro: Categoria não encontrada no sistema.';
        }

        if (request.getPrice() < 0) {
            return 'Erro: O preço não pode ser negativo.';
        }

        const game = new Game(request.getTitle(), request.getGender(), category, request.getPrice());
        const success = await this.gameService.addGame(game);

        if (success) {
            return 'Sucesso: Jogo cadastrado no sistema!';
        } else {
            return 'Erro: Falha ao tentar salvar no banco de dados.';
        }
    }

    public async getAllGames(): Promise<GameResponseDTO[]> {
        const games = await this.gameService.getAllGames();
        return games.map((game) => this.convertToResponseDTO(game));
    }

    public async getGameById(id: number): Promise<GameResponseDTO | null> {
        const game = await this.gameService.getGameById(id);
        return game != null ? this.convertToResponseDTO(game) : null;
    }

    public async updateGame(id: number, request: GameRequestDTO): Promise<string> {
        if (request.getTitle() == null || request.getTitle().trim() === '') {
            return 'Erro: O título não pode ser vazio.';
        }

        if (request.getGender() == null || request.getGender().trim() === '') {
            return 'Erro: O gênero não pode ser vazio.';
        }

        const category = await this.gameCategoryService.findById(request.getCategoryId());

        if (category == null) {
            return 'Erro: Categoria não encontrada no sistema.';
        }

        if (request.getPrice() < 0) {
            return 'Erro: O preço não pode ser negativo.';
        }

        const game = new Game(id, request.getTitle(), request.getGender(), category, request.getPrice());
        const success = await this.gameService.updateGame(game);

        if (success) {
            return 'Sucesso: Jogo atualizado no sistema!';
        } else {
            return 'Erro: Falha ao tentar atualizar no banco de dados.';
        }
    }

    private convertToResponseDTO(game: Game): GameResponseDTO {
        return new GameResponseDTO(
            game.getId(),
            game.getTitle(),
            game.getGender(),
            game.getCategory().getId(),
            game.getCategory().getTitle(),
            game.getPrice()
        );
    }
}
