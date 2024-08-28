import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormInputComponent } from '../../components/custom-forms/form-input/form-input.component';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormInputComponent, MatButtonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {

  private apiService = inject(ApiService);

  registerForm!: FormGroup;

  ngOnInit(): void {
    this,this.initForm();
  }

  // Nombre, apellido, numero de telefono, correo, direccion, nacionalidad.

  initForm() {
    this.registerForm = new FormGroup({
      names: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      lastNames: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      phone: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      email: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      address: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      country: new FormControl('', [Validators.required])
    });
  }

  register() {
    console.log(this.registerForm.value);

    // Guardar formulario
    // this.apiService.postRequest()
  }
}
