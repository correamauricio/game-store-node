export class PurchaseResponseDTO {
    private id: number;
    private customerId: number;
    private customerName: string;
    private gameId: number;
    private gameTitle: string;
    private purchaseDate: string;
    private quantity: number;
    private totalValue: number;

    constructor(
        id: number,
        customerId: number,
        customerName: string,
        gameId: number,
        gameTitle: string,
        purchaseDate: string,
        quantity: number,
        totalValue: number
    ) {
        this.id = id;
        this.customerId = customerId;
        this.customerName = customerName;
        this.gameId = gameId;
        this.gameTitle = gameTitle;
        this.purchaseDate = purchaseDate;
        this.quantity = quantity;
        this.totalValue = totalValue;
    }

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getCustomerId(): number {
        return this.customerId;
    }

    public setCustomerId(customerId: number): void {
        this.customerId = customerId;
    }

    public getCustomerName(): string {
        return this.customerName;
    }

    public setCustomerName(customerName: string): void {
        this.customerName = customerName;
    }

    public getGameId(): number {
        return this.gameId;
    }

    public setGameId(gameId: number): void {
        this.gameId = gameId;
    }

    public getGameTitle(): string {
        return this.gameTitle;
    }

    public setGameTitle(gameTitle: string): void {
        this.gameTitle = gameTitle;
    }

    public getPurchaseDate(): string {
        return this.purchaseDate;
    }

    public setPurchaseDate(purchaseDate: string): void {
        this.purchaseDate = purchaseDate;
    }

    public getQuantity(): number {
        return this.quantity;
    }

    public setQuantity(quantity: number): void {
        this.quantity = quantity;
    }

    public getTotalValue(): number {
        return this.totalValue;
    }

    public setTotalValue(totalValue: number): void {
        this.totalValue = totalValue;
    }
}
