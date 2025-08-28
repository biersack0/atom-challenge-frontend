import { NgIf, NgOptimizedImage } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ControlMessageComponent } from "@app/shared/components/control-message/control-message.component";
import { CustomValidators } from "@app/shared/utils/custom-validators";
import { AuthService } from "./services/auth.service";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ReactiveFormsModule,
    ControlMessageComponent,
    NgIf
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  loginForm!: FormGroup;
  isLoading = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, CustomValidators.validEmail()]],
      remember: [false]
    });
  }

  submit() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      this.doLogin(email);
    }
  }

  doLogin(email: string) {
    this.isLoading = true;
    this.authService.login(email).subscribe({
      next: (response) => {
        const { status } = response;

        if (status === "success") {
          this.router.navigate(['/tasks']);
        } else {
          this.showAlert('Error al iniciar sesión', 'error');
        }
      },
      error: (_) => {
        this.registerAlert(email);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  doRegister(email: string) {
    this.isLoading = true;
    this.authService.register(email).subscribe({
      next: (response) => {
        console.log(response);
      }
    });
  }

  showAlert(message: string, status: 'success' | 'error') {
    Swal.fire({
      title: status === 'success' ? 'Success' : 'Error',
      text: message,
      icon: status === 'success' ? 'success' : 'error',
      confirmButtonText: 'Aceptar',
      timer: 1500
    });
  }

  registerAlert(email: string) {
    Swal.fire({
      title: '¿Desea registrarse?',
      text: 'Usted no tiene una cuenta en la aplicación',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, continuar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.doRegister(email);
      }
    }).finally(() => {
      this.isLoading = false;
    });
  }
}
