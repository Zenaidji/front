import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { ReponseService } from '../services/reponse.service';
import { ClientService } from '../services/client.service';
import { Client } from '../models/clients';
import { ClientListComponent } from '../client-list/client-list.component';
@Component({
  selector: 'app-client-form',
  templateUrl: './clientform.component.html',
  styleUrl: './clientform.component.css',
  imports: [CommonModule, ReactiveFormsModule, ClientListComponent],
})
export class ClientformComponent {
  form: FormGroup;
  formulaire = true;
  success = false;
  error = false;
  listclient = false;

  constructor(
    private fb: FormBuilder,
    private reponseService: ReponseService,
    private clientService: ClientService
  ) {
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

  initClients(): void {
    this.success = false;
    this.listclient = true;
  }

  getConditionControl(index: number) {
    return this.conditions.at(index) as FormControl;
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.reponseService.createResponse().subscribe({
        next: (response: any) => {
          console.log('Réponse reçue:', response);

          // Création de l'objet  client avec l'ID de la réponse
          const newClient = this.createClient(response._id);

          // Creation du client en base de données
          this.clientService.createClient(newClient).subscribe({
            next: () => {
              console.log('Client enregistré avec succès');
              this.formulaire = false;
              this.success = true;
            },
            error: (err) => {
              console.error('Erreur lors de la création du client:', err);
              this.formulaire = false;
              this.error = true;
            },
          });
        },
        error: (err) => {
          console.error('Erreur lors de la création de la réponse:', err);
          this.formulaire = false;
          this.error = true;
        },
      });

      console.log('Données du formulaire :', this.form.value);
    } else {
      alert('Veuillez accepter les CGU et choisir un mode de paiement.');
    }
  }

  createClient(responseId: string): Client {
    return {
      firstName: this.form.value.prenom,
      lastName: this.form.value.nom,
      address: this.form.value.adresse,
      phone: this.form.value.telephone,
      zipCode: this.form.value.codePostal,
      email: this.form.value.email,
      paymentMethod: this.form.value.modePaiement,
      cgu: this.getConditionControl(0).value, // Condition générale obligatoire
      pub: this.getConditionControl(1).value, // Optionnelle
      rights: this.getConditionControl(2).value, // Optionnelle
      response_id: responseId,
    };
  }
}
