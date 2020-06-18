/// <reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { Load } from 'src/app/_models/load';
import { AuthService } from 'src/app/_services/auth.service';
import { LoadsService } from 'src/app/_services/loads.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GoogleApiService } from 'src/app/_services/googleApi.service';


@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {

  load: Load;
  addOrder: FormGroup;
  public searchControl: FormControl;
  public searchControl2: FormControl;
  submitted = false;

  loadingLatitude: any;
  loadingLongitude: any;
  unloadingLatitude: any;
  unloadingLongitude: any;


  @ViewChild('search', {static: false})
  public searchElementRef: ElementRef;

  @ViewChild('search2', {static: false})
  public searchElementRef2: ElementRef;

  distanceMatrix;
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private loads: LoadsService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private googleApi: GoogleApiService
  ) {}

  ngOnInit() {

    this.addOrder = new FormGroup({
      loadingAddress: new FormControl('', Validators.required),
      loadingDate: new FormControl('', Validators.required),
      loadingTime: new FormControl('', Validators.required),
      unloadingAddress: new FormControl('', Validators.required),
      unloadingDate: new FormControl('', Validators.required),
      unloadingTime: new FormControl('', Validators.required),
      weight: new FormControl('', Validators.required),
      volume: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required)
    });

    // this.cokolwiek();
    this.searchControl = new FormControl();
    this.searchControl2 = new FormControl();

    this.mapsAPILoader.load().then(() => {
      this.distanceMatrix = new google.maps.DistanceMatrixService();
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['address']
      });

      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.addOrder.controls.loadingAddress.setValue(place.formatted_address);
          this.loadingLatitude = place.geometry.location.lat();
          this.loadingLongitude = place.geometry.location.lng();
        });
      });
    });

    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef2.nativeElement, {
        types: ['address']
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.addOrder.controls.unloadingAddress.setValue(place.formatted_address);
          this.unloadingLatitude = place.geometry.location.lat();
          this.unloadingLongitude = place.geometry.location.lng();
        });
      });
    });

  }

  // cokolwiek() {
  //   this.googleApi.getResponse('').subscribe(response => {

  //     const line: any = response.routes[0].overview_polyline.points;
  //     const decodedPath = google.maps.geometry.encoding.decodePath(line);
  //     console.log(decodedPath);
  //   });
  // }

  get f() { return this.addOrder.controls; }


  onSubmit() {
    this.load = new Load();
    this.load.loadingAddress = this.addOrder.controls.loadingAddress.value;
    this.load.loadingDate = this.addOrder.controls.loadingDate.value;
    this.load.loadingTime = this.addOrder.controls.loadingTime.value;
    this.load.unloadingAddress = this.addOrder.controls.unloadingAddress.value;
    this.load.unloadingDate = this.addOrder.controls.unloadingDate.value;
    this.load.unloadingTime = this.addOrder.controls.unloadingTime.value;
    this.load.weight = this.addOrder.controls.weight.value;
    this.load.volume = this.addOrder.controls.volume.value;
    this.load.type = this.addOrder.controls.type.value;
    this.load.loaderId = this.authService.getId();
    this.load.latitude1 = this.loadingLatitude;
    this.load.longitude1 = this.loadingLongitude;
    this.load.latitude2 = this.unloadingLatitude;
    this.load.longitude2 = this.unloadingLongitude;
    this.load.status = 'Oczekuje';


    this.submitted = true;
    if (this.addOrder.invalid) {
        return;
    }

    this.loads.addLoads(this.load);
    this.router.navigate(['../orders'], { relativeTo: this.route }).then(() => {
      window.location.reload();
    });
  }

}
