import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PrimeNgModule } from '../../../prime-ng/prime-ng.module';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, PrimeNgModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
  //providers: [ConfirmationService]
})
export class LoginPageComponent {
  private authSrv = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject( Router );
  alert: Message[] = [];


  public myForm = this.fb.group({
    email: ['uno@gmail.com', [Validators.required, Validators.email]],
    password: ['tuquituqui', [Validators.required, Validators.minLength(6)]],

  })


  login() {
    const { email, password } = this.myForm.value;
    this.authSrv.login(email!, password!)
      .subscribe({
        next: () => this.router.navigateByUrl('/dashboard'),
        error: (msgError => {
          this.alert =[ {severity: 'warn', detail: msgError, life: 2000}]
        })
      });

  }
}
