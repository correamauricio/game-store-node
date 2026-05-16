import { GameCategory } from './GameCategory.js';

export class Game {
    private id!: number;
    private title: string;
    private gender: string;
    private category: GameCategory;
    private price: number;

    constructor(id: number, title: string, gender: string, category: GameCategory, price: number);
    constructor(title: string, gender: string, category: GameCategory, price: number);
    constructor(
        idOrTitle: number | string,
        titleOrGender: string,
        genderOrCategory: string | GameCategory,
        categoryOrPrice: GameCategory | number,
        price?: number
    ) {
        if (typeof idOrTitle === 'number') {
            this.id = idOrTitle;
            this.title = titleOrGender;
            this.gender = genderOrCategory as string;
            this.category = categoryOrPrice as GameCategory;
            this.price = price as number;
        } else {
            this.title = idOrTitle;
            this.gender = titleOrGender;
            this.category = genderOrCategory as GameCategory;
            this.price = categoryOrPrice as number;
        }
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

    public getCategory(): GameCategory {
        return this.category;
    }

    public setCategory(category: GameCategory): void {
        this.category = category;
    }

    public getPrice(): number {
        return this.price;
    }

    public setPrice(price: number): void {
        this.price = price;
    }
}
