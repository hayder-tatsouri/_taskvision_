import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { AuthService } from '../../../../core/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  imports: [FormsModule, ReactiveFormsModule,HttpClientModule, RouterLink, AngularSvgIconModule, NgIf, ButtonComponent, NgClass ],
})
export class SignInComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  passwordTextType!: boolean;
  message: string = '';
  isError = false;


  constructor(private readonly _formBuilder: FormBuilder, private readonly _router: Router , private authService : AuthService) {}

  onClick() {
    console.log('Button clicked');
  }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  onSubmit() {
    this.submitted = true;
    const { email, password } = this.form.value;

    if (this.form.invalid) {
      return;
    }

    this.authService.login(email, password).subscribe({
      next: (res:any) => {
        localStorage.setItem('token', res.token);
        this.message = res.message;
        this.isError = false;

        console.log('Token:', res.token,res.user);
        this._router.navigate(['/dashboard/projects']);
      },
      error: (err) => {
        this.message = err.error.message ;
        this.isError = true;

        console.error(err);
      }
    });;
  }
}
