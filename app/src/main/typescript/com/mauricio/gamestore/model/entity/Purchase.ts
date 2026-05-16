import { Customer } from './Customer.js';
import { Game } from './Game.js';

export class Purchase {
    private id: number;
    private purchaseCustomer: Customer;
    private purchaseGame: Game;
    private purchaseDate: string;
    private quantity: number;

    constructor(
        id: number,
        purchaseCustomer: Customer,
        purchaseGame: Game,
        purchaseDate: string,
        quantity: number
    ) {
        this.id = id;
        this.purchaseCustomer = purchaseCustomer;
        this.purchaseGame = purchaseGame;
        this.purchaseDate = purchaseDate;
        this.quantity = quantity;
    }

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getPurchaseCustomer(): Customer {
        return this.purchaseCustomer;
    }

    public setPurchaseCustomer(purchaseCustomer: Customer): void {
        this.purchaseCustomer = purchaseCustomer;
    }

    public getPurchaseGame(): Game {
        return this.purchaseGame;
    }

    public setPurchaseGame(purchaseGame: Game): void {
        this.purchaseGame = purchaseGame;
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
}
