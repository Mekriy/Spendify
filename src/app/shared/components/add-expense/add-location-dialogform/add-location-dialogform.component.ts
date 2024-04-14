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

  center: google.maps.LatLngLiteral | google.maps.LatLng = { lat: 49.850562097500784, lng: 23.99180025738618 };
  zoom: number = 18;
  markerPositions: google.maps.LatLngLiteral[] = [];

  constructor(private fb: FormBuilder, public ref: DynamicDialogRef) {
  }
  ngOnInit() {
    this.locationForm = this.fb.group({
      name: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      address: ['', Validators.required],
      save: false
    });
  }

  onSubmit(event: Event) {
    this.ref.close(this.locationForm.value);
  }
}
