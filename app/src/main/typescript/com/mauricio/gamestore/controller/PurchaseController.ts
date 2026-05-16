import { PurchaseRequestDTO } from '../model/dto/request/PurchaseRequestDTO.js';
import { PurchaseResponseDTO } from '../model/dto/response/PurchaseResponseDTO.js';
import { Customer } from '../model/entity/Customer.js';
import { Game } from '../model/entity/Game.js';
import { Purchase } from '../model/entity/Purchase.js';
import { CustomerService } from '../model/service/CustomerService.js';
import { GameService } from '../model/service/GameService.js';
import { PurchaseService } from '../model/service/PurchaseService.js';
    
function localDateNow(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export class PurchaseController {
    private readonly purchaseService: PurchaseService;
    private readonly customerService: CustomerService;
    private readonly gameService: GameService;

    constructor(purchaseService: PurchaseService, customerService: CustomerService, gameService: GameService) {
        this.purchaseService = purchaseService;
        this.customerService = customerService;
        this.gameService = gameService;
    }

    public async getAllPurchases(): Promise<PurchaseResponseDTO[]> {
        const purchases = await this.purchaseService.listAllPurchases();
        return purchases.map((purchase) => this.convertToResponseDTO(purchase));
    }

    public async getPurchaseById(id: number): Promise<PurchaseResponseDTO | null> {
        const purchase = await this.purchaseService.getPurchaseById(id);
        return purchase != null ? this.convertToResponseDTO(purchase) : null;
    }

    public async updatePurchase(id: number, request: PurchaseRequestDTO): Promise<void> {
        const customer = await this.customerService.findById(request.getCustomerId());
        const game = await this.gameService.getGameById(request.getGameId());

        if (customer != null && game != null) {
            const purchase = new Purchase(id, customer, game, localDateNow(), request.getQuantity());
            await this.purchaseService.updatePurchase(purchase);
        }
    }

    public async registerPurchase(request: PurchaseRequestDTO): Promise<string> {
        const customer = await this.customerService.findById(request.getCustomerId());
        if (customer == null) {
            return 'Erro: Cliente não encontrado.';
        }

        const game = await this.gameService.getGameById(request.getGameId());
        if (game == null) {
            return 'Erro: Jogo não encontrado.';
        }

        if (request.getQuantity() <= 0) {
            return 'Erro: A quantidade deve ser maior que zero.';
        }

        const purchase = new Purchase(0, customer, game, localDateNow(), request.getQuantity());
        await this.purchaseService.savePurchase(purchase);

        return 'Sucesso: Compra registrada com sucesso!';
    }

    private convertToResponseDTO(purchase: Purchase): PurchaseResponseDTO {
        const totalValue = purchase.getPurchaseGame().getPrice() * purchase.getQuantity();
        return new PurchaseResponseDTO(
            purchase.getId(),
            purchase.getPurchaseCustomer().getId(),
            purchase.getPurchaseCustomer().getName(),
            purchase.getPurchaseGame().getId(),
            purchase.getPurchaseGame().getTitle(),
            purchase.getPurchaseDate(),
            purchase.getQuantity(),
            totalValue
        );
    }
}
