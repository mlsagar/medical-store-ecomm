import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { environment } from '../../environments/environment';
import { ComparePasswordDirective } from '../compare-password.directive';
import { ErrorResponse, Response } from '../reponse';
import { MESSAGE_TYPE, ToastService } from '../shared/toast/toast.service';
import { User, UsersDataService } from '../../services/users-data.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ComparePasswordDirective],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  isButtonDisabled = false;
  routes = environment.ROUTES;

  
  registerForm!: FormGroup;

  get name() {
    return this.registerForm.get("name");
  }
  get email() {
    return this.registerForm.get("email");
  }
  get password() {
    return this.registerForm.get("password");
  }
  get confirmPassword() {
    return this.registerForm.get("confirmPassword");
  }

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _toast: ToastService,
    private _usersDataService: UsersDataService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    
    if (this._authService.isLoggedIn) {
      this._router.navigate([this.routes.HOME]);
    }

    this._authService.isItSignUp = true;

    this.registerForm = this._createRegisterForm;
  }

  get _createRegisterForm() {
    return this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, [Validators.required, Validators.minLength(8)]]
    })
  }

  register() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    this.isButtonDisabled = true;
    const { confirmPassword,  ...userData } = this.registerForm.value;
    this._callRegisterApi(userData);
  }

  _callRegisterApi(userData: User) {
    this._usersDataService.register(userData)
      .pipe(finalize(this._enablingButton.bind(this)))
      .subscribe({
        next: this._handleRegiterApiSuccess.bind(this),
        error: this._handleApiError.bind(this)
      })
  }

  _handleRegiterApiSuccess(response: Response<any>) {
    this._resetRegistrationForm();
    this._toast.open({ type: MESSAGE_TYPE.SUCCESS, message: response.message });
  }

  _handleApiError(err: ErrorResponse<any>) {
    this._toast.open({ type: MESSAGE_TYPE.ERROR, message: err.error.message })
  }

  _resetRegistrationForm() {
    this.registerForm.reset();
  }

  _enablingButton() {
    this.isButtonDisabled = false
  }

}
