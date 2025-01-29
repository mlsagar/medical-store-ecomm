import { Component, OnInit } from '@angular/core';
import { User, UsersDataService } from '../../services/users-data.service';
import { AuthService, UserCredentials } from '../../core/auth.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MESSAGE_TYPE, ToastService } from '../shared/toast/toast.service';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  editUserForm!: FormGroup;
  user!: UserCredentials;
  isButtonDisabled = false;

  showForm = false;

  get name() {
    return this.editUserForm.get("name");
  }
  get creditCard() {
    return this.editUserForm.get("creditCard");
  }
  get email() {
    return this.editUserForm.get("email");
  }


  constructor(
    private _authService: AuthService,
    private _userService: UsersDataService,
    private _formBuilder: FormBuilder,
    private _toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.user = this._authService.userCredentials;
    this.editUserForm = this._editUserForm
  }

  get _editUserForm() {
      return this._formBuilder.group({
        name: [this.user.name, [Validators.required, Validators.minLength(3)]],
        creditCard: [this.user.creditCard, [Validators.required, Validators.minLength(10), Validators.maxLength(15)]],
        email: [this.user.email, [Validators.required, Validators.email]],
      })
    }

  editUser() {
    if (this.editUserForm.invalid) {
      this.editUserForm.markAllAsTouched();
      return;
    }


    this.isButtonDisabled = true;

    this._userService.update(this.editUserForm.value)
      .subscribe({
        next: (response) => {
          if (response) {

            this._userService.login({
              email: this.email?.value,
              password: this.user.password
            }).subscribe({
              next: (response) => {
                this.editUserForm.reset();
                this._authService.userToken = response.token || null;
                this._authService.isLoggedIn = true;
                this._toastService.open({type: MESSAGE_TYPE.SUCCESS, message: "Update successfully"});
                this.isButtonDisabled = false;
                this.user = this._authService.userCredentials;
                this.showForm = false;
              },
              error: () => {
                this._toastService.open({type: MESSAGE_TYPE.ERROR, message: "Not able to edit"});
                this.isButtonDisabled = false;
              }
            })
          }
        },
        error: () => {
          this._toastService.open({type: MESSAGE_TYPE.ERROR, message: "Not able to edit"});
          this.isButtonDisabled = false;
        }
      })
    }

  edit() {
    this.showForm = true;
  }

}
