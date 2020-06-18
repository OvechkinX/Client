import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class GoogleApiService {

    constructor(private http: HttpClient) {}

    getResponse(lat1, lng1, lat2, lng2) {
        const proxyurl = 'https://cors-anywhere.herokuapp.com/';
        // tslint:disable-next-line:max-line-length
        // const url = 'https://maps.googleapis.com/maps/api/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood&key=AIzaSyCcCKcyA6VuIFrXGCmV0GfMklmz4EA1giA';
        // tslint:disable-next-line:max-line-length
        const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${lat1},${lng1}&destination=${lat2},${lng2}&key=AIzaSyCcCKcyA6VuIFrXGCmV0GfMklmz4EA1giA`;
        return this.http.get<any>(proxyurl + url);
    }

}
