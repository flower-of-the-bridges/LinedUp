import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Position } from '../entity/Position';
import { Subscription } from 'rxjs';
import { User } from '../entity/User';

export class GeoController {

    private watchPosition : Subscription;
    private sessionUser : User = null;
    private currentPosition : Position = null;
    constructor(private geolocation: Geolocation) {
    }


    async getUserPosition(user : User): Promise<Position> {
        this.sessionUser = user;
        let pos = this.geolocation.getCurrentPosition().then((resp) => {
            console.debug("resp is ", resp);
            return this.populatePos(resp.coords.latitude, resp.coords.longitude, resp.coords.accuracy, this.sessionUser);
        }).catch((error) => {
            console.log('Error getting location', error);
            return null;
        });

        return pos;
    }

    public checkForPositionUpdates(callback : Function): void {
        let watch = this.geolocation.watchPosition();
        this.watchPosition = watch.subscribe((data) => {
            // data can be a set of coordinates, or an error (if an error occurred).
            // data.coords.latitude
            // data.coords.longitude
            console.debug("checking for position updates...");
            let newPosition = this.populatePos(data.coords.latitude, data.coords.longitude, data.coords.accuracy, this.sessionUser);
            if(newPosition!=null){

                if(this.currentPosition){
                    if(this.currentPosition.getLatitude()!=newPosition.getLatitude() || this.currentPosition.getLongitude()!=newPosition.getLongitude()){
                         
                        callback(newPosition)
                         
                        this.currentPosition = newPosition;  
                    }
                 }else{
                    callback(newPosition);
                    this.currentPosition = newPosition;  
                 }
                
                 
            }
        });
    }

    public stopPositionUpdates() : void {
        this.watchPosition && this.watchPosition.unsubscribe();
        console.debug("position update stopped");
    }

    public iscurrentPositionUpdating() : boolean {
        return this.watchPosition!=null;
    }

    async getUsersPosition(): Promise<Array<Position>> {
        console.debug("retrieving user position near me...");
        return null;
    }

    private populatePos(latitude: number, longitude: number, accuracy: number, user : User): Position {
        let pos = new Position(latitude, longitude, accuracy);

        return pos;
    }

}
