export class GameRequestDTO {
    private title: string;
    private gender: string;
    private categoryId: number;
    private price: number;

    constructor(title: string, gender: string, categoryId: number, price: number) {
        this.title = title;
        this.gender = gender;
        this.categoryId = categoryId;
        this.price = price;
    }

    public getTitle(): string {
        return this.title;
    }

    public setTitle(title: string): void {
        this.title = title;
    }

    public getGender(): string {
        return this.gender;
    }

    public setGender(gender: string): void {
        this.gender = gender;
    }

    public getCategoryId(): number {
        return this.categoryId;
    }

    public setCategoryId(categoryId: number): void {
        this.categoryId = categoryId;
    }

    public getPrice(): number {
        return this.price;
    }

    public setPrice(price: number): void {
        this.price = price;
    }
}
