import { Request, Response } from 'express';
import { GameRequestDTO } from '../model/dto/request/GameRequestDTO.js';
import { GameResponseDTO } from '../model/dto/response/GameResponseDTO.js';
import { Game } from '../model/entity/Game.js';
import { GameCategoryService } from '../model/service/GameCategoryService.js';
import { GameService } from '../model/service/GameService.js';
import { GameViewHtml } from '../view/GameViewHtml.js';

export class GameControllerHttp {
    private readonly gameService: GameService;
    private readonly gameCategoryService: GameCategoryService;
    private readonly gameViewHtml: GameViewHtml;

    constructor(
        gameCategoryService: GameCategoryService,
        gameService: GameService,
        gameViewHtml: GameViewHtml
    ) {
        this.gameCategoryService = gameCategoryService;
        this.gameService = gameService;
        this.gameViewHtml = gameViewHtml;
    }

    public async getAllGamesJson(req: Request, res: Response): Promise<void> {
        const games = await this.listGames();
        res.contentType('application/json');
        res.status(200).send(
            games.map((game) => ({
                id: game.getId(),
                title: game.getTitle(),
                gender: game.getGender(),
                categoryId: game.getCategoryId(),
                categoryTitle: game.getCategoryTitle(),
                price: game.getPrice(),
            }))
        );
    }

    public async getAllGames(req: Request, res: Response): Promise<void> {
        const games = await this.listGames();
        res.contentType('text/html');
        res.status(200).send(this.gameViewHtml.displayAllGames(games));
    }

    public async getGameByIdDetail(req: Request, res: Response): Promise<void> {
        const id = this.parseId(req.params.id);
        if (id == null) {
            res.contentType('text/html');
            res.status(400).send(this.gameViewHtml.displayInvalidId());
            return;
        }

        const game = await this.getGameById(id);
        if (game == null) {
            res.contentType('text/html');
            res.status(404).send(this.gameViewHtml.displayNotFound(id));
            return;
        }

        res.contentType('text/html');
        res.status(200).send(this.gameViewHtml.displayGameDetail(game));
    }

    public async showCreateForm(req: Request, res: Response): Promise<void> {
        const categories = await this.gameCategoryService.findAll();
        const message = typeof req.query.message === 'string' ? req.query.message : undefined;
        res.contentType('text/html');
        res.status(200).send(this.gameViewHtml.displayCreateForm(categories, message));
    }

    public async createGame(req: Request, res: Response): Promise<void> {
        const request = this.buildRequestFromBody(req);
        if (request == null) {
            const categories = await this.gameCategoryService.findAll();
            res.contentType('text/html');
            res.status(400).send(
                this.gameViewHtml.displayCreateForm(categories, 'Dados inválidos. Verifique os campos.')
            );
            return;
        }

        const message = await this.addGame(request);
        const success = message.startsWith('Sucesso:');

        if (success) {
            res.redirect('/view');
            return;
        }

        const categories = await this.gameCategoryService.findAll();
        res.contentType('text/html');
        res.status(400).send(this.gameViewHtml.displayCreateForm(categories, message));
    }

    public async showEditForm(req: Request, res: Response): Promise<void> {
        const id = this.parseId(req.params.id);
        if (id == null) {
            res.contentType('text/html');
            res.status(400).send(this.gameViewHtml.displayInvalidId());
            return;
        }

        const game = await this.getGameById(id);
        if (game == null) {
            res.contentType('text/html');
            res.status(404).send(this.gameViewHtml.displayNotFound(id));
            return;
        }

        const categories = await this.gameCategoryService.findAll();
        const message = typeof req.query.message === 'string' ? req.query.message : undefined;
        res.contentType('text/html');
        res.status(200).send(this.gameViewHtml.displayEditForm(game, categories, message));
    }

    public async updateGameHttp(req: Request, res: Response): Promise<void> {
        const id = this.parseId(req.params.id);
        if (id == null) {
            res.contentType('text/html');
            res.status(400).send(this.gameViewHtml.displayInvalidId());
            return;
        }

        const request = this.buildRequestFromBody(req);
        if (request == null) {
            res.redirect(`/view/games/${id}/edit?message=${encodeURIComponent('Dados inválidos. Verifique os campos.')}`);
            return;
        }

        const message = await this.updateGame(id, request);
        const success = message.startsWith('Sucesso:');

        if (success) {
            res.redirect(`/view/games/${id}`);
            return;
        }

        res.redirect(`/view/games/${id}/edit?message=${encodeURIComponent(message)}`);
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

    private async listGames(): Promise<GameResponseDTO[]> {
        const games = await this.gameService.getAllGames();
        return games.map((game) => this.convertToResponseDTO(game));
    }

    private parseId(value: string | string[]): number | null {
        const raw = Array.isArray(value) ? value[0] : value;
        const id = parseInt(raw, 10);
        return Number.isNaN(id) ? null : id;
    }

    private buildRequestFromBody(req: Request): GameRequestDTO | null {
        const title = req.body?.title;
        const gender = req.body?.gender;
        const categoryId = parseInt(req.body?.categoryId, 10);
        const price = parseFloat(req.body?.price);

        if (
            typeof title !== 'string' ||
            typeof gender !== 'string' ||
            Number.isNaN(categoryId) ||
            Number.isNaN(price)
        ) {
            return null;
        }

        return new GameRequestDTO(title, gender, categoryId, price);
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
