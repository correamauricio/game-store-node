import { GameResponseDTO } from '../model/dto/response/GameResponseDTO.js';
import { GameCategory } from '../model/entity/GameCategory.js';

function escapeHtml(text: string): string {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function layout(title: string, body: string): string {
    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="utf-8">
    <title>${escapeHtml(title)}</title>
    <style>
        body { font-family: system-ui, sans-serif; max-width: 720px; margin: 2rem auto; padding: 0 1rem; }
        a { color: #2563eb; }
        .actions { margin: 1.5rem 0; }
        .message { padding: 0.75rem 1rem; border-radius: 6px; margin-bottom: 1rem; }
        .message.error { background: #fef2f2; color: #991b1b; border: 1px solid #fecaca; }
        .message.success { background: #f0fdf4; color: #166534; border: 1px solid #bbf7d0; }
        label { display: block; margin-top: 0.75rem; font-weight: 600; }
        input, select { width: 100%; padding: 0.5rem; margin-top: 0.25rem; box-sizing: border-box; }
        button { margin-top: 1rem; padding: 0.5rem 1rem; cursor: pointer; }
        table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
        th, td { text-align: left; padding: 0.5rem; border-bottom: 1px solid #e5e7eb; }
    </style>
</head>
<body>
    ${body}
</body>
</html>`;
}

function categoryOptions(categories: GameCategory[], selectedId?: number): string {
    return categories
        .map(
            (category) =>
                `<option value="${category.getId()}"${category.getId() === selectedId ? ' selected' : ''}>${escapeHtml(category.getTitle())}</option>`
        )
        .join('');
}

export class GameViewHtml {
    public displayAllGames(games: GameResponseDTO[]): string {
        const rows =
            games.length === 0
                ? '<tr><td colspan="5">Nenhum jogo cadastrado.</td></tr>'
                : games
                      .map(
                          (game) => `<tr>
                            <td>${game.getId()}</td>
                            <td><a href="/view/games/${game.getId()}">${escapeHtml(game.getTitle())}</a></td>
                            <td>${escapeHtml(game.getGender())}</td>
                            <td>R$ ${game.getPrice().toFixed(2)}</td>
                            <td>${escapeHtml(game.getCategoryTitle())}</td>
                            <td><a href="/view/games/${game.getId()}/edit">Editar</a></td>
                          </tr>`
                      )
                      .join('');

        return layout(
            'Jogos',
            `
            <h1>Jogos</h1>
            <div class="actions">
                <a href="/view/games/new">Cadastrar novo jogo</a>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Gênero</th>
                        <th>Preço</th>
                        <th>Categoria</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
        `
        );
    }

    public displayGameDetail(game: GameResponseDTO): string {
        return layout(
            game.getTitle(),
            `
            <h1>${escapeHtml(game.getTitle())}</h1>
            <p><strong>ID:</strong> ${game.getId()}</p>
            <p><strong>Gênero:</strong> ${escapeHtml(game.getGender())}</p>
            <p><strong>Preço:</strong> R$ ${game.getPrice().toFixed(2)}</p>
            <p><strong>Categoria:</strong> ${escapeHtml(game.getCategoryTitle())} (ID ${game.getCategoryId()})</p>
            <div class="actions">
                <a href="/view/games/${game.getId()}/edit">Editar</a>
                &nbsp;|&nbsp;
                <a href="/view">Voltar para a lista</a>
            </div>
        `
        );
    }

    public displayInvalidId(): string {
        return layout(
            'ID inválido',
            `<h1>ID inválido</h1><p><a href="/view">Voltar para a lista</a></p>`
        );
    }

    public displayNotFound(id: number): string {
        return layout(
            'Jogo não encontrado',
            `<h1>Jogo não encontrado</h1><p>Nenhum jogo com ID ${id}.</p><p><a href="/view">Voltar para a lista</a></p>`
        );
    }

    public displayCreateForm(categories: GameCategory[], message?: string): string {
        const messageHtml = message
            ? `<div class="message error">${escapeHtml(message)}</div>`
            : '';

        return layout(
            'Cadastrar jogo',
            `
            <h1>Cadastrar novo jogo</h1>
            ${messageHtml}
            <form method="post" action="/view/games">
                <label for="title">Título</label>
                <input id="title" name="title" type="text" required>

                <label for="gender">Gênero</label>
                <input id="gender" name="gender" type="text" required>

                <label for="price">Preço</label>
                <input id="price" name="price" type="number" step="0.01" min="0" required>

                <label for="categoryId">Categoria</label>
                <select id="categoryId" name="categoryId" required>
                    <option value="">Selecione...</option>
                    ${categoryOptions(categories)}
                </select>

                <button type="submit">Salvar</button>
                <a href="/view">Cancelar</a>
            </form>
        `
        );
    }

    public displayEditForm(
        game: GameResponseDTO,
        categories: GameCategory[],
        message?: string
    ): string {
        const messageHtml = message
            ? `<div class="message error">${escapeHtml(message)}</div>`
            : '';

        return layout(
            `Editar: ${game.getTitle()}`,
            `
            <h1>Editar jogo</h1>
            ${messageHtml}
            <form method="post" action="/view/games/${game.getId()}">
                <label for="title">Título</label>
                <input id="title" name="title" type="text" value="${escapeHtml(game.getTitle())}" required>

                <label for="gender">Gênero</label>
                <input id="gender" name="gender" type="text" value="${escapeHtml(game.getGender())}" required>

                <label for="price">Preço</label>
                <input id="price" name="price" type="number" step="0.01" min="0" value="${game.getPrice()}" required>

                <label for="categoryId">Categoria</label>
                <select id="categoryId" name="categoryId" required>
                    ${categoryOptions(categories, game.getCategoryId())}
                </select>

                <button type="submit">Atualizar</button>
                <a href="/view/games/${game.getId()}">Cancelar</a>
            </form>
        `
        );
    }

    public displayResult(message: string, success: boolean): string {
        const cssClass = success ? 'success' : 'error';
        return layout(
            success ? 'Sucesso' : 'Erro',
            `
            <h1>${success ? 'Sucesso' : 'Erro'}</h1>
            <div class="message ${cssClass}">${escapeHtml(message)}</div>
            <p><a href="/view">Voltar para a lista</a></p>
        `
        );
    }
}
