import { Component } from '@angular/core';
import { ApiService } from './vet.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  clients: any[] = [];
  isLoading: boolean = false;
  searchTerm: string = '';

  constructor(private apiService: ApiService) {}

  searchClients(searchTerm: string): void {
    if (searchTerm.length >= 3) {
      this.isLoading = true;
      this.apiService.searchClients(searchTerm).subscribe(
        (data) => {
          this.clients = data;
          this.isLoading = false;
        },
        (error) => {
          console.error('Error fetching clients', error);
          this.isLoading = false;
        }
      );
    }
  }

  toggleVaccinatedStatus(pet: any): void {
    this.apiService.toggleVaccinatedStatus(pet).subscribe(
      (updatedPet) => {
        pet.vaccinated = updatedPet.vaccinated;
      },
      (error) => {
        console.error('Error updating vaccinated status', error);
      }
    );
  }
}
