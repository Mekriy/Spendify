import { Component, OnDestroy, OnInit } from '@angular/core';
import { Category } from '../../interfaces/category';
import { CategoryService } from '../../services/category.service';
import { of, Subject, switchMap, takeUntil } from 'rxjs';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DropdownCategory } from '../../interfaces/dropdown-category';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { UpdateCategory } from '../../interfaces/updates/update-category';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category-dialog-form',
  templateUrl: './add-category-dialog-form.component.html',
  styleUrl: './add-category-dialog-form.component.scss',
})
export class AddCategoryDialogFormComponent implements OnInit, OnDestroy {
  publicCategories!: Category[];
  userCategories!: Category[];
  unsubscribe$: Subject<void> = new Subject<void>();
  selectedPublicCategory!: Category;
  selectedUserCategory!: Category;
  createdCategory!: DropdownCategory;
  categoryForm!: FormGroup;
  showInput: boolean = false;
  newCategoryName: string = '';
  oldCategoryName: string = '';

  constructor(
    private readonly categoryService: CategoryService,
    private fb: FormBuilder,
    public ref: DynamicDialogRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadComponent();
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  private loadComponent() {
    this.categoryService
      .getCategories()
      .pipe(
        switchMap((res: any) => {
          this.publicCategories = res;
          return this.categoryService.getUserCategories();
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe({
        next: (value) => (this.userCategories = value),
      });
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSubmit($event: any) {
    let category: Category = {
      name: this.categoryForm.value.name,
    };
    this.categoryService
      .create(category)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (value) => {
          this.createdCategory = value;
          this.chooseCategory(this.createdCategory);
        },
      });
  }
  chooseCategory(selectedCategory: Category) {
    this.ref.close(selectedCategory);
  }

  changeNameInput(selectedUserCategory: Category) {
    if (selectedUserCategory.name!.length <= 0) this.showInput = false;
    else {
      this.showInput = !this.showInput;
      this.oldCategoryName = selectedUserCategory.name!;
      this.newCategoryName = selectedUserCategory.name!;
    }
  }

  updateCategory() {
    let update: UpdateCategory = {
      newName: this.newCategoryName,
      oldName: this.oldCategoryName,
    };
    this.categoryService
      .updateCategory(update)
      .pipe()
      .subscribe({
        next: (value) =>
          this.router
            .navigateByUrl(`/${this.router.url}`, { skipLocationChange: true })
            .then(() => window.location.reload()), //TODO: this is generally not ok. you should update your local state instead of reloading the page
      });
  }

  deleteCategory(selectedUserCategory: Category) {
    this.categoryService
      .delete(selectedUserCategory.name!)
      .pipe()
      .subscribe({
        next: (value) =>
          this.router
            .navigateByUrl(`/${this.router.url}`, { skipLocationChange: true })
            .then(() => window.location.reload()),
      });
  }
}
