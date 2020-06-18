/// <reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
// import { google, Polyline, MVCArray, LatLng } from '@agm/core/services/google-maps-types';
import { GoogleApiService } from 'src/app/_services/googleApi.service';




@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;



  @ViewChild('search', {static: false})
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private googleApi: GoogleApiService
  ) {}

  ngOnInit() {





    // set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    // create search FormControl
    this.searchControl = new FormControl();

    // set current position
    this.setCurrentPosition();

    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['address']
      });

      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          console.log(place);
          const mexicoCity = new google.maps.LatLng(51.517773, 20.046567299999992);
          const jacksonville = new google.maps.LatLng(52.216290099999988, 21.017868499999963);
          const distance = google.maps.geometry.spherical.computeDistanceBetween(mexicoCity, jacksonville);
          console.log(distance);
          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          console.log(this.latitude + ' ' + this.longitude);
          this.zoom = 12;
        });
      });
    });
  }



  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }


  onBtnClick() {
    // console.log(this.searchControl.valueChanges);
    // console.log(this.mapsAPILoader);
  }

}

