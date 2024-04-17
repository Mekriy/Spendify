import {Component, OnDestroy, OnInit} from '@angular/core';
import {Location} from '../../interfaces/location'
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import {LocationService} from "../../services/location.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-add-location-dialogform',
  templateUrl: './add-location-dialogform.component.html',
  styleUrl: './add-location-dialogform.component.scss'
})
export class AddLocationDialogformComponent implements OnInit, OnDestroy{
  locationForm!: FormGroup;
  location!: Location;
  unsubscribe$: Subject<void> = new Subject<void>();

  userLocations!: Location[];
  selectedLocation!: Location;

  constructor(
    private fb: FormBuilder,
    public ref: DynamicDialogRef,
    public readonly locationService: LocationService) {
  }
  ngOnInit() {
    this.locationForm = this.fb.group({
      name: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      address: ['', Validators.required],
      save: false
    });
    this.loadLocations();
  }

  onSubmit(event: Event) {
    this.ref.close(this.locationForm.value);
  }

  chooseLocation(selectedLocation: Location) {
    this.ref.close(selectedLocation);
  }

  private loadLocations() {
    this.locationService.getLocations()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe({
        next: value => this.userLocations = value,
        error: err => console.log(err)
      })
  }
  ngOnDestroy() {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}
