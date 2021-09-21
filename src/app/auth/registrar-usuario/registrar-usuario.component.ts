import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.scss'],
})
export class RegistrarUsuarioComponent implements OnInit {
  registroForm: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.criarFormulario();
  }

  criarFormulario() {
    this.registroForm = new FormGroup({
      nome: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      senha: new FormControl(null, [Validators.required]),
    });
  }
}
