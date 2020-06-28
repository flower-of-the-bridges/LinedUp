import { Map, tileLayer, marker, icon, circle, Marker, Circle, LatLngExpression, latLng } from 'leaflet';
import { Position } from './../entity/Position';
import { NgElement, WithProperties } from '@angular/elements';
import { ReportComponent } from 'src/app/report/report.component';
import { HttpClient } from '@angular/common/http';

export class MapController {

    private map: Map;
    private userPosition: Position;
    private userCircle: Circle;
    private userMarker: Marker;
    private httpClient: HttpClient;
    private places: Array<any>;

    private static ENDPOINT = "http://localhost:3000";

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

    constructor(div: string, position: Position, httpClient: HttpClient) {
        this.httpClient = httpClient;
        this.userPosition = position;
        this.map = new Map(div).setView([this.userPosition.getLatitude(), this.userPosition.getLongitude()], 23);
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
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
                    marker(place.position, { icon: place.status == 0 ? MapController.RED_MARKER : MapController.GREEN_MARKER })
                        .bindPopup(
                            this.createPlacePopup(place.name, place.status, place.position)
                            , { autoClose: true })
                        .on('click', (evt) => {
                            let popup = this.createPlacePopup(place.name, place.status, null);
                            popup.isNear = this.isNear(place.position);
                            evt.target.bindPopup(popup, {autoClose: true });
                        })
                        .addTo(this.map);
                })
            }
        )
    }

    public isNear(point: any): boolean {
        let radius = this.userCircle.getRadius(); //in meters
        let circleCenterPoint = this.userCircle.getLatLng(); //gets the circle's center latlng
        return Math.abs(circleCenterPoint.distanceTo(point)) <= radius;
    }

    createPlacePopup(name, status, pos) {
        let popupEl: NgElement & WithProperties<ReportComponent> = document.createElement('popup-element') as any;
        popupEl.name = name;
        popupEl.status = status != 0;
        popupEl.street = "Via Cesare De Lollis, 22";
        popupEl.isFavourite = "star";
        if (pos) {
            popupEl.isNear = this.isNear(pos);
        }
        return popupEl;
    }
}
