export class CustomerUpdateRequestDTO {
        private _name!: string;
        private _email!: string;
        private _age!: number;

    constructor(name: string, email: string, age: string) {
        this.name = name;
        this.email = email;
        this.age = age;
    }

    get name(): string {
        return this._name;
    }

    set name(name: string) {        
        this._name = name;
    }

    get email(): string {
      
        return this._email;
    }

    set email(email: string | null) {    
        if(email != null && email.trim() !== '') {
            if(!email.includes('@')) {
                throw new Error('Email deve conter @');
            }
            this._email = email;
        }
    }

    get age(): number {
        return this._age;
    }

    set age(age: string) {
        if(age != null && age.trim() !== '') {
            if(isNaN(Number(age))) {
                throw new Error('Idade deve ser um número');
            }
            this._age = Number(age);
        }
    }
}
