import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { ReponseService } from '../services/reponse.service';
@Component({
  selector: 'app-client-form',
  templateUrl: './clientform.component.html',
  styleUrl: './clientform.component.css',
  imports: [CommonModule, ReactiveFormsModule],
})
export class ClientformComponent {
  form: FormGroup;
  formulaire = true;
  success = false;
  error = false;

  constructor(private fb: FormBuilder, private reponseService: ReponseService) {
    this.form = this.fb.group({
      prenom: ['', [Validators.required]],
      nom: ['', [Validators.required]],
      adresse: ['', [Validators.required]],
      codePostal: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
      telephone: [
        '',
        [Validators.required, Validators.pattern(/^0[67]\d{8}$/)],
      ],
      email: ['', [Validators.required, Validators.email]],
      modePaiement: ['', [Validators.required]],
      conditions: this.fb.array([
        this.fb.control(false, Validators.requiredTrue),
        this.fb.control(false),
        this.fb.control(false),
      ]),
    });
  }

  get conditions() {
    return this.form.get('conditions') as FormArray;
  }

  getConditionControl(index: number) {
    return this.conditions.at(index) as FormControl;
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.reponseService.createResponse().subscribe({
        next: (response) => {
          console.log('Réponse reçue:', response);
          this.formulaire = false;
          this.success = true;
        },
        error: (err) => {
          console.error('Erreur:', err);
          this.formulaire = false;
          this.error = true;
        },
      });

      console.log('Données du formulaire :', this.form.value);
    } else {
      alert('Veuillez accepter les CGU et choisir un mode de paiement.');
    }
  }
}
