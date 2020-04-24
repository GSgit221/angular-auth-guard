import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ValidatorFn, AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { AnimationDurations } from '@angular/material/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  loginFailed: boolean = false;

  constructor(
    private auth: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required, this.matchOtherValidator('password')])
    });
  }

  public submit() {
    if (this.form.invalid) {
      this.form.markAsPristine();
      return;
    }
    this.auth.login(this.form.value) 
      .pipe(take(1))
      .subscribe((res) => {
        if (res.success) {
          this.router.navigate(['/profile']);
        } else {
          this.loginFailed = true;
        }
      });
  }

  private matchOtherValidator(otherControlName: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const otherControl: AbstractControl = control.root.get(otherControlName);

      if (otherControl) {
        const subscription = otherControl.valueChanges.subscribe(() => {
          control.updateValueAndValidity();
          subscription.unsubscribe();
        });
      }

      return otherControl && control.value !== otherControl.value ? { match: true } : undefined;
    };
  }

  public get showError() {
    return this.form.pristine;
  }
}
