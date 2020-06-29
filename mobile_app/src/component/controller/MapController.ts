import { Map, tileLayer, marker, icon, circle, Marker, Circle, LatLngExpression, latLng } from 'leaflet';
import { Position } from './../entity/Position';
import { NgElement, WithProperties } from '@angular/elements';
import { ReportComponent } from 'src/app/report/report.component';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { RecapPage } from 'src/app/insert/map/recap/recap.page';

export class MapController {

    private map: Map;
    private userPosition: Position;
    private viewPosition: Position;
    private userCircle: Circle;
    private userMarker: Marker;
    private httpClient: HttpClient;
    private places: Array<any>;
    private showPopup: string = "";

    private static ENDPOINT = "http://localhost:3000";
    private static GEOCODING = "https://nominatim.openstreetmap.org/reverse?format=json&lat={lat}&lon={lon}&zoom=18&addressdetails=1"

    private static USER_MARKER = icon({
        iconUrl: 'assets/icon/man.png',
        iconSize: [40, 40],
        popupAnchor: [0, -20]
    });

    private static GREEN_MARKER = icon({
        iconUrl: 'assets/icon/green_marker.png',
        iconSize: [40, 40],
        popupAnchor: [0, -20]
    });

    private static RED_MARKER = icon({
        iconUrl: 'assets/icon/red_marker.png',
        iconSize: [40, 40],
        popupAnchor: [0, 0]
    });

    constructor(div: string, position: Position, viewPosition: Position, httpClient: HttpClient, showPopup: string) {
        this.httpClient = httpClient;
        this.userPosition = position;
        this.viewPosition = viewPosition;
        this.showPopup = showPopup;

        this.map = new Map(div).setView([this.viewPosition.getLatitude(), this.viewPosition.getLongitude()], 23);
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
    }

    destroyMap(){
        if(this.map){
            this.map.off();
            this.map.remove();
        }
    }

    public addUser() {
        if (this.map) {
            this.userMarker = marker([this.userPosition.getLatitude(), this.userPosition.getLongitude()], { icon: MapController.USER_MARKER })
                .addTo(this.map);
            console.debug("added new marker ", this.userMarker);
            this.userCircle = circle([this.userPosition.getLatitude(), this.userPosition.getLongitude()], 50, {
                color: '#000000',
                fillColor: '#153E7E',
                fillOpacity: 0.5,
                weight: 2
            }).addTo(this.map);
        }

    }

    public getPositions() {
        this.httpClient.post(MapController.ENDPOINT + "/positions", { position: this.userPosition, university: "Sapienza" }).subscribe(
            res => {
                /** server returns a list of places */
                console.log("positions %o", res);
                Array.isArray(res) && res.forEach(place => {
                    let posMarker = marker(place.position, { icon: place.status == 0 ? MapController.RED_MARKER : MapController.GREEN_MARKER })
                        .bindPopup(
                            this.createPlacePopup(place.name, place.status, place.street, place.position)
                            , { autoClose: true })
                        .on('click', (evt) => {
                            let popup = this.createPlacePopup(place.name, place.status, place.street, null);
                            popup.isNear = this.isNear(place.position);
                            evt.target.bindPopup(popup, {autoClose: true });
                        })
                        .addTo(this.map);
                    
                    if(this.showPopup && this.showPopup == place.name){
                        console.log("opening");
                        posMarker.openPopup();
                    }
                })
            }
        )
    }

    public getBuildings(modalController: ModalController) {
        this.httpClient.post(MapController.ENDPOINT + "/positions", { position: this.userPosition, university: "Sapienza" }).subscribe(
            res => {
                /** server returns a list of places */
                console.log("positions %o", res);
                Array.isArray(res) && res.forEach(place => {
                    marker(place.position, { icon: place.status == 0 ? MapController.RED_MARKER : MapController.GREEN_MARKER })
                        .on('dblclick', (evt) => {
                            this.presentModal(modalController, place, null);
                        })
                        .addTo(this.map);
                });
                this.map.on('dblclick', (evt: any) => {
                    this.reverseGeocoding(evt.latlng.lat, evt.latlng.lng, modalController);
                })
            }
        )
    }

    public isNear(point: any): boolean {
        let radius = this.userCircle.getRadius(); //in meters
        let circleCenterPoint = this.userCircle.getLatLng(); //gets the circle's center latlng
        return Math.abs(circleCenterPoint.distanceTo(point)) <= radius;
    }

    createPlacePopup(name, status, street, pos) {
        let popupEl: NgElement & WithProperties<ReportComponent> = document.createElement('popup-element') as any;
        popupEl.name = name;
        popupEl.status = status != 0;
        popupEl.street = street;
        popupEl.isFavourite = "star";
        if (pos) {
            popupEl.isNear = this.isNear(pos);
        }
        return popupEl;
    }

    reverseGeocoding(lat : number, long: number, modalController: ModalController) {
        let url = MapController.GEOCODING.replace("{lat}", lat.toString()).replace("{lon}", long.toString());
        this.httpClient.get(url).subscribe((res: any) => {
            if(res && res.address){
                let street = res.address.road+" "+(res.address.house_number || "")+", "+res.address.town+" ("+res.address.country_code.toUpperCase()+")";
                this.presentModal(modalController, null, street);
            }
        });

    }

    async presentModal(modalController : ModalController, place: any, street: string) {
        const modal = await modalController.create({
          component: RecapPage,
          componentProps: {
              "place": place,
              "street": street
          }
        });
        return await modal.present();
      }
}
