import { readLine } from '../util/ConsoleInput.js';
import { GameRequestDTO } from '../model/dto/request/GameRequestDTO.js';
import { GameResponseDTO } from '../model/dto/response/GameResponseDTO.js';
import { GameCategoryView } from './GameCategoryView.js';
import { GameCategoryController } from '../controller/GameCategoryController.js';

function formatLeft(value: string | number, width: number): string {
    const str = String(value);
    return str.length >= width ? str.substring(0, width) : str + ' '.repeat(width - str.length);
}

function formatPrice(price: number): string {
    return 'R$ ' + formatLeft(price.toFixed(2), 7);
}

export class GameView {
    private readonly gameCategoryController: GameCategoryController;

    constructor(gameCategoryController: GameCategoryController) {
        this.gameCategoryController = gameCategoryController;
    }

    public async readRegisterGameInput(): Promise<GameRequestDTO> {
        console.log('\n-- CADASTRO DE NOVO JOGO --');

        const title = await readLine('Título: ');
        const gender = await readLine('Gênero: ');
        const price = parseFloat(await readLine('Preço: '));

        const categoryView = new GameCategoryView(this.gameCategoryController);
        await categoryView.displayAllCategories();

        const categoryId = parseInt(await readLine('\nEscolha o ID da categoria: '), 10);

        return new GameRequestDTO(title, gender, categoryId, price);
    }

    public displayMessage(message: string): void {
        console.log(message);
    }

    public displayAllGames(games: GameResponseDTO[]): void {
        console.log('\n-- LISTA DE TODOS OS JOGOS --');

        if (games.length === 0) {
            console.log('Nenhum jogo cadastrado.');
        } else {
            console.log(
                `${formatLeft('ID', 5)} | ${formatLeft('Título', 20)} | ${formatLeft('Gênero', 15)} | ${formatLeft('Preço', 10)} | ${formatLeft('Categoria', 15)}`
            );
            console.log('-----------------------------------------------------------------------------------');
            for (const game of games) {
                console.log(
                    `${formatLeft(game.getId(), 5)} | ${formatLeft(game.getTitle(), 20)} | ${formatLeft(game.getGender(), 15)} | ${formatPrice(game.getPrice())} | ${formatLeft(game.getCategoryTitle(), 15)}`
                );
            }
        }
    }

    public async readEditGameId(): Promise<number> {
        console.log('\n-- EDIÇÃO DE JOGO --');
        const idLine = await readLine('\nDigite o ID do jogo que deseja editar: ');
        return parseInt(idLine, 10);
    }

    public displayGameNotFoundForEdit(): void {
        console.log('Erro: Jogo não encontrado.');
    }

    public async readEditGameInput(game: GameResponseDTO): Promise<GameRequestDTO> {
        console.log('Deixe em branco para manter o valor atual.');

        let title = await readLine('Título [' + game.getTitle() + ']: ');
        if (title.trim() === '') title = game.getTitle();

        let gender = await readLine('Gênero [' + game.getGender() + ']: ');
        if (gender.trim() === '') gender = game.getGender();

        const priceStr = await readLine('Preço [' + game.getPrice() + ']: ');
        const price = priceStr.trim() === '' ? game.getPrice() : parseFloat(priceStr);

        const categoryView = new GameCategoryView(this.gameCategoryController);
        await categoryView.displayAllCategories();
        const categoryIdStr = await readLine(
            'Escolha o ID da categoria [' + game.getCategoryId() + ']: '
        );
        const categoryId =
            categoryIdStr.trim() === '' ? game.getCategoryId() : parseInt(categoryIdStr, 10);

        return new GameRequestDTO(title, gender, categoryId, price);
    }

    public async readFindGameId(): Promise<number> {
        console.log('\n-- BUSCAR JOGO POR ID --');
        const idLine = await readLine('Digite o ID do jogo: ');
        return parseInt(idLine, 10);
    }

    public displayInvalidGameId(): void {
        console.log('ID inválido. Por favor, digite um número.');
    }

    public displayGameDetail(game: GameResponseDTO): void {
        console.log('\nJogo encontrado:');
        console.log('ID: ' + game.getId());
        console.log('Título: ' + game.getTitle());
        console.log('Gênero: ' + game.getGender());
        console.log('Preço: R$ ' + game.getPrice().toFixed(2));
        console.log('Categoria: ' + game.getCategoryTitle());
    }

    public displayGameNotFound(id: number): void {
        console.log('Jogo com ID ' + id + ' não encontrado.');
    }
}
