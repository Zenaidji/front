import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../models/clients';
@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:3000/client';

  createClient(client: Client) {
    return this.http.post(`${this.apiUrl}`, client);
  }

  getClients() {
    console.log('Récupération des clients...');
    return this.http.get<Client[]>(`${this.apiUrl}`);
  }
}
