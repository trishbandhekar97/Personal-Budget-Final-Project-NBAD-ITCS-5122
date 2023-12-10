export class Budget {
    _id?: string;
    title: string;
    budget: number;
    color: string;

    constructor(id: string, title: string, budget: number, color: string) {
        if(id != null) this._id = id;
        this.title = title;
        this.budget = budget;
        this.color = color;
    }

}
