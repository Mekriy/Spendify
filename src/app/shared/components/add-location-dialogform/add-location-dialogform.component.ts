import {Component, OnDestroy, OnInit} from '@angular/core';
import {Location} from '../../interfaces/location'
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import {LocationService} from "../../services/location.service";
import {catchError, of, Subject, takeUntil} from "rxjs";
import {MessageService} from "primeng/api";

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
    public readonly locationService: LocationService,
    private readonly messageService: MessageService) {
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
    this.locationService.addLocation(this.locationForm.value)
      .pipe(
        catchError(error=>{
          if(error.status === 400){
            this.messageService.add({severity:'error', summary:'Error!', detail:`Can\t create location...`, life: 3000, icon:'error'})
          }
          return of(error)
        })
      )
      .subscribe({
        next: value => this.ref.close(value),
        error: err => {
          if(err.error.status === 400 && err.error.detail === "Can't create already existed location"){
            this.messageService.add({severity:'error', summary:'Error!', detail:`Can\t create location...`, life: 3000, icon:'error'})
          }
        }
      })
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
      })
  }
  ngOnDestroy() {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}
