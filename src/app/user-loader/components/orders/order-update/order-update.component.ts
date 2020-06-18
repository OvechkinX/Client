import { Component, OnInit, NgZone, Inject, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { LoadsService } from 'src/app/_services/loads.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Load } from 'src/app/_models/load';


@Component({
  selector: 'app-order-update',
  templateUrl: './order-update.component.html',
  styleUrls: ['./order-update.component.css']
})
export class OrderUpdateComponent implements OnInit {

  editOrder: FormGroup;
  searchControl: FormControl;
  searchControl2: FormControl;
  searchElementRef: any;
  loadingLatitude: number;
  loadingLongitude: number;
  searchElementRef2: any;
  unloadingLatitude: number;
  unloadingLongitude: number;

  submitted = false;
  dialog: any;
  load: Load;

  @ViewChild('search', {static: false})
  public searchElementRef3: ElementRef;

  @ViewChild('search2', {static: false})
  public searchElementRef4: ElementRef;

  constructor(private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone,
              private loadService: LoadsService,
              public dialogRef: MatDialogRef<OrderUpdateComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {


    this.editOrder = new FormGroup({
      loadingAddress: new FormControl(this.data.loads[this.data.index].loadingAddress, Validators.required),
      loadingDate: new FormControl(this.data.loads[this.data.index].loadingDate, Validators.required),
      loadingTime: new FormControl(this.data.loads[this.data.index].loadingTime, Validators.required),
      unloadingAddress: new FormControl(this.data.loads[this.data.index].unloadingAddress, Validators.required),
      unloadingDate: new FormControl(this.data.loads[this.data.index].unloadingDate, Validators.required),
      unloadingTime: new FormControl(this.data.loads[this.data.index].unloadingTime, Validators.required),
      weight: new FormControl(this.data.loads[this.data.index].weight, Validators.required),
      volume: new FormControl(this.data.loads[this.data.index].volume, Validators.required),
      type: new FormControl(this.data.loads[this.data.index].type, Validators.required)
    });


    this.searchControl = new FormControl();
    this.searchControl2 = new FormControl();

    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef3.nativeElement, {
        types: ['address']
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          // console.log(place);
          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.editOrder.controls.loadingAddress.setValue(place.formatted_address);
          this.loadingLatitude = place.geometry.location.lat();
          this.loadingLongitude = place.geometry.location.lng();
        });
      });
    });

    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef4.nativeElement, {
        types: ['address']
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.editOrder.controls.unloadingAddress.setValue(place.formatted_address);
          this.unloadingLatitude = place.geometry.location.lat();
          this.unloadingLongitude = place.geometry.location.lng();
        });
      });
    });

  }

  get f() { return this.editOrder.controls; }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {

    this.load = new Load();
    this.load.loadId = this.data.loads[this.data.index].loadId;
    this.load.loadingAddress = this.editOrder.controls.loadingAddress.value;
    this.load.loadingDate = this.editOrder.controls.loadingDate.value;
    this.load.loadingTime = this.editOrder.controls.loadingTime.value;
    this.load.unloadingAddress = this.editOrder.controls.unloadingAddress.value;
    this.load.unloadingDate = this.editOrder.controls.unloadingDate.value;
    this.load.unloadingTime = this.editOrder.controls.unloadingTime.value;
    this.load.weight = this.editOrder.controls.weight.value;
    this.load.volume = this.editOrder.controls.volume.value;
    this.load.type = this.editOrder.controls.type.value;
    this.load.latitude1 = this.loadingLatitude;
    this.load.longitude1 = this.loadingLongitude;
    this.load.latitude2 = this.unloadingLatitude;
    this.load.longitude2 = this.unloadingLongitude;
    this.load.loaderId = this.data.loads[this.data.index].loaderId;
    this.load.status = 'Oczekuje';


    this.submitted = true;
    if (this.editOrder.invalid) {
        return;
    }

    this.loadService.updateLoad(this.load);

  }

}
