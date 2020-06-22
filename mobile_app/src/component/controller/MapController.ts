import { Map, tileLayer, marker, icon, circle } from 'leaflet';
import { Position } from './../entity/Position';
import { User } from '../entity/User';
import { ReportService } from 'src/app/report/report.service';

export class MapController {

    private map: Map;
    private userPosition: Position;
    private reportService : ReportService;

    private static USER_MARKER = icon({
        iconUrl: 'assets/icon/man.png',
        iconSize: [40, 40],
        popupAnchor: [0, -20]
      });

    constructor(div: string, position: Position, reportService : ReportService) {
        this.userPosition  = position;
        this.map = new Map(div).setView([this.userPosition.getLatitude(), this.userPosition.getLongitude()], 23);
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
        this.reportService = reportService;
    }

    public addUser() {
        let markerPoint = null;
        if(this.map){
            markerPoint = marker([this.userPosition.getLatitude(), this.userPosition.getLongitude()], {icon: MapController.USER_MARKER})
            // .bindPopup("<form id='reportForm'>"+this.reportService.makeCapitalPopup(null)+"</form>", { autoClose: false })
            // .on("click", (evt) =>{console.log(evt); callback()})
            .addTo(this.map);
            console.debug("added new marker ", markerPoint);
            circle([this.userPosition.getLatitude(), this.userPosition.getLongitude()], 50, {
                color: 'black',
                fillColor: 'blue',
                fillOpacity: 0.5
              }).addTo(this.map)
        }

    }
}
