export class Expense {
    _id?: string;
    amount: number;
    budget: string;
    description: string;

    constructor(id: string, amount: number, budget: string, description: string) {
        if(id != null) this._id = id;
        this.amount = amount;
        this.budget = budget;
        this.description = description;
    }

}
