export class Position {

    private latitude : number;
    private longitude: number;
    private accuracy: number;

    constructor(latitude: number, longitude: number, accuracy: number){
        this.latitude = latitude;
        this.longitude = longitude;
        this.accuracy = accuracy;
    }

    public setLatitude(latitude : number){
        this.latitude = latitude;
    }

    public setLongitude(longitude : number){
        this.longitude = longitude;
    }

    public setAccuracy(accuracy : number){
        this.accuracy = accuracy;
    }

    public getLatitude() : number {
        return this.latitude;
    }

    public getLongitude() : number {
        return this.longitude;
    }

    public getAccuracy() : number {
        return this.accuracy;
    }

    public toString() {
        return JSON.stringify(this);
    }
}
