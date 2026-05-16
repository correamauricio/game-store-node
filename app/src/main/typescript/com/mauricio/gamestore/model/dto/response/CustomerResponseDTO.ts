export class CustomerResponseDTO {
    private id: number;
    private name: string;
    private email: string;
    private age: number;

    constructor(id: number, name: string, email: string, age: number) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.age = age;
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
