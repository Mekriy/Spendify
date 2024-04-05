import {Component, OnInit} from '@angular/core';
import {Location} from '../../../interfaces/location'
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-add-location-dialogform',
  templateUrl: './add-location-dialogform.component.html',
  styleUrl: './add-location-dialogform.component.scss'
})
export class AddLocationDialogformComponent implements OnInit{
  locationForm!: FormGroup;
  location!: Location;

  center: google.maps.LatLngLiteral | google.maps.LatLng = { lat: 49.123, lng: 23.923 }; // Initialize with default values
  zoom: number = 10;
  markerPositions: google.maps.LatLngLiteral[] = [];

  constructor(private fb: FormBuilder, public ref: DynamicDialogRef) {
  }
  ngOnInit() {
    this.locationForm = this.fb.group({
      name: [''],
      latitude: [''],
      longitude: [''],
      address: [''],
      save: [false]
    });
    this.showDefaultLocation();
  }

  onSubmit(event: Event) {
    event.preventDefault();
    const location: Location = this.locationForm.value;
    this.ref.close(location);
  }
  showLocation(location: Location){
    this.center = {
      lat: location?.latitude!,
      lng: location?.longitude!
    }
    this.zoom = 14
    this.markerPositions = [
      {
        lat: location?.latitude!,
        lng: location?.longitude!
      }
    ]
  }
  showDefaultLocation(){
    this.center = {
      lat: 49.123,
      lng: 23.923
    }
    this.zoom = 10
    this.markerPositions = [
      {
        lat: 49.123,
        lng: 23.923
      }
    ]
  }
}
