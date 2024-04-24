import {Component, OnDestroy, OnInit} from '@angular/core';
import {FileUploadEvent, FileUploadHandlerEvent} from "primeng/fileupload";
import {User} from "../../shared/interfaces/user";
import {AuthService} from "../../shared/services/auth.service";
import {catchError, Subject, switchMap, takeUntil} from "rxjs";
import {Router} from "@angular/router";
import {Item} from "../../shared/interfaces/item";
import {Category} from "../../shared/interfaces/category";
import {Location} from "../../shared/interfaces/location";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConfirmationService, MessageService} from "primeng/api";
import {UpdateUserFullname} from "../../shared/interfaces/updates/update-user-fullname";
import {ResetCode} from "../../shared/interfaces/reset-code";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
  providers: [ConfirmationService, MessageService, DynamicDialogRef, DialogService]
})
export class ProfilePageComponent implements OnInit, OnDestroy{
  imageData: string | ArrayBuffer | null = "./assets/images/defaultUserImage.png";
  userInfo: User = {
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'email@gmail.com',
    roleName: 'User',
    fileName: './assets/images/defaultUserImage.png',
    id: 'asdadsads',
  }
  tempUserInfo!: User;
  notEditing: boolean = true;

  userPasswordChange: { oldPassword: string; newPassword: string; confirmPassword: string;} = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  }

  unsubscribe$: Subject<void> = new Subject<void>();
  userItems!: Item[];
  userCategories!: Category[];
  userLocations!: Location[];
  fullNameForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogService: DialogService,
    private ref: DynamicDialogRef,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly confirmService: ConfirmationService,
    private readonly messageService: MessageService) {}

  ngOnInit() {
    this.fullNameForm = this.fb.group({
      firstName: [{value: '', disabled: true}, Validators.required],
      lastName: [{value: '', disabled: true}, Validators.required]
    });
    this.loadUserInfo();
  }
  loadUserInfo(){
    this.authService.getUser()
      .pipe(
        switchMap((res:any) => {
          this.userInfo = res;
          return this.authService.getUserPhoto(res.fileName)
            .pipe(
              switchMap((res:any) => {
                this.createImageFromBlob(res);
                return this.authService.getUserCreatedData()
              })
            )
        })
      )
      .subscribe({
        next: value => {
          this.userItems = value.items;
          this.userCategories = value.categories;
          this.userLocations = value.locations;
          this.fullNameForm.setValue({firstName: this.userInfo.firstName, lastName: this.userInfo.lastName});
        },
      })
  }

  userPhoto!: File;
  UploadAuto(event: any) {
    this.userPhoto = event.target.files![0];
    this.authService.uploadFile(this.userPhoto)
  }

  createImageFromBlob(image: Blob): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.imageData = reader.result;
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    } else {
      this.imageData = "assets/images/defaultUserImage.png";
    }
  }

  enableEdit($event: MouseEvent) {
    this.notEditing = false;
    this.tempUserInfo = this.userInfo;
    this.fullNameForm.get('firstName')?.enable();
    this.fullNameForm.get('lastName')?.enable();
  }
  disableEdit($event: MouseEvent) {
    this.notEditing = true;
    this.userInfo = this.tempUserInfo;
    this.fullNameForm.setValue({firstName: this.userInfo.firstName, lastName: this.userInfo.lastName})
    this.fullNameForm.get('firstName')?.disable();
    this.fullNameForm.get('lastName')?.disable();
  }
  saveUserInfo($event: MouseEvent) {
    this.notEditing = true;
    this.fullNameForm.get('firstName')?.disable();
    this.fullNameForm.get('lastName')?.disable();
    let userFullName: UpdateUserFullname = {
      firstName: this.fullNameForm.get('firstName')!.value,
      lastName: this.fullNameForm.get('lastName')!.value
    }
    this.authService.updateUser(userFullName)
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe({
        next: value => {
          this.userInfo = value;
          this.router.navigateByUrl('/profile', { skipLocationChange: true }).then(() => window.location.reload())
        }
      })
  }

  deleteUser($event: MouseEvent) {
    this.confirmService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon:"none",
      rejectIcon:"none",
      rejectButtonStyleClass:"p-button-text",
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You\'ve delete your account successfully!' });
        this.authService.delete()
          .pipe()
          .subscribe({
            next: value => this.router.navigateByUrl('/').then(()=> window.location.reload()),
          });
      },
      reject: () => {

      }
    });
  }
  emailSent: boolean = false;
  emailNotSent: boolean = false;
  sendResetCode() {
    let sendToUser: ResetCode = {
      to: this.userInfo.email,
      subject: "Send reset code"
    }
    this.authService.sendResetCode(sendToUser)
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe({
        next: () => {
          this.emailSent = true;
        },
        error: err => this.emailNotSent = true
      })
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
