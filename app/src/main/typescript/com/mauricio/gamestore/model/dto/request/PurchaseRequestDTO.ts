export class PurchaseRequestDTO {
    private customerId: number;
    private gameId: number;
    private quantity: number;

    constructor(customerId: number, gameId: number, quantity: number) {
        this.customerId = customerId;
        this.gameId = gameId;
        this.quantity = quantity;
    }

    public getCustomerId(): number {
        return this.customerId;
    }

    public setCustomerId(customerId: number): void {
        this.customerId = customerId;
    }

    public getGameId(): number {
        return this.gameId;
    }

    public setGameId(gameId: number): void {
        this.gameId = gameId;
    }

    public getQuantity(): number {
        return this.quantity;
    }

    public setQuantity(quantity: number): void {
        this.quantity = quantity;
    }
}
