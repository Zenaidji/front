import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import { Client } from '../models/clients';
import { CommonModule } from '@angular/common';
import $ from 'jquery';

import 'datatables.net';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class ClientListComponent implements OnInit {
  clients: Client[] = [];

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    console.log('titi');
    this.clientService.getClients().subscribe({
      next: (data) => {
        console.log('toto');
        this.clients = data;
        setTimeout(() => {
          $('#clientTable').DataTable();
        }, 1000);
      },
      error: (err) => console.error('Erreur de récupération des clients', err),
    });
  }
}
