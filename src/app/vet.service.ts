import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { makeServer } from './api'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://demoapi.com/api';

  constructor(private http: HttpClient) {
    makeServer({ environment: 'development' })
   }

  getSeries() {
    return this.http.get(`${this.apiUrl}/series/howimetyourmother`);
  }

  postNewsletter() {
    return this.http.post(`${this.apiUrl}/series/newsletter`, {});
  }

  searchClients(searchTerm: string) {
    return this.http.get<any[]>(`${this.apiUrl}/vet/clients?search=${searchTerm}`);
  }

  toggleVaccinatedStatus(pet: any) {
    return this.http.post<any>(`${this.apiUrl}/vet/pets/`, { petId: pet.name, vaccinated: !pet.isVaccinated });
  }
}