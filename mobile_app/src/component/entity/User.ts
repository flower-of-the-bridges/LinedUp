export class User {

    constructor(private name : string, private isUserLogged : boolean){
        this.isUserLogged = isUserLogged;
        this.name = name;
    }

    public getName() : string {
        return this.name;
    }

    public getIsUserLogged() : boolean {
        return this.isUserLogged;
    }

    public setName(name : string){
        this.name = name;
    }

    public setIsUserLogged(isUserLogged : boolean){
        this.isUserLogged = isUserLogged;
    }

    public toString() : string {
        return JSON.stringify(this);
    }

}