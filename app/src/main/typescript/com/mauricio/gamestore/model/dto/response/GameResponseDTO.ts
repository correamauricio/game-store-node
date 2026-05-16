export class GameResponseDTO {
    private id: number;
    private title: string;
    private gender: string;
    private categoryId: number;
    private categoryTitle: string;
    private price: number;

    constructor(
        id: number,
        title: string,
        gender: string,
        categoryId: number,
        categoryTitle: string,
        price: number
    ) {
        this.id = id;
        this.title = title;
        this.gender = gender;
        this.categoryId = categoryId;
        this.categoryTitle = categoryTitle;
        this.price = price;
    }

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
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

    public getCategoryTitle(): string {
        return this.categoryTitle;
    }

    public setCategoryTitle(categoryTitle: string): void {
        this.categoryTitle = categoryTitle;
    }

    public getPrice(): number {
        return this.price;
    }

    public setPrice(price: number): void {
        this.price = price;
    }
}
