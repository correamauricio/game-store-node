export class Customer {
    private id!: number;
    private name: string;
    private email: string;
    private age: number;

    constructor(name: string, email: string, age: number);
    constructor(id: number, name: string, email: string, age: number);
    constructor(nameOrId: string | number, emailOrName: string, ageOrEmail: number | string, age?: number) {
        if (typeof nameOrId === 'number') {
            this.id = nameOrId;
            this.name = emailOrName;
            this.email = ageOrEmail as string;
            this.age = age as number;
        } else {
            this.name = nameOrId;
            this.email = emailOrName;
            this.age = ageOrEmail as number;
        }
    }

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public getAge(): number {
        return this.age;
    }

    public setAge(age: number): void {
        this.age = age;
    }
}
