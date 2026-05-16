export class GameCategory {
    private id: number;
    private title: string;

    constructor(id: number, title: string) {
        this.id = id;
        this.title = title;
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
}
