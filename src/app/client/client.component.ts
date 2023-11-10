import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../vet.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
})
export class ClientComponent {
  @Input() client: Client | undefined;
  @Output() toggleVaccinated = new EventEmitter<any>();
  isLoading: boolean = false;

  constructor(private apiService: ApiService) {}

  toggleVaccinationStatus(pet: Pet): void {
    this.isLoading = true;
    this.apiService.toggleVaccinatedStatus(pet).subscribe(
      (updatedPet: Pet) => {
        pet.isVaccinated = !pet.isVaccinated;
        this.toggleVaccinated.emit(pet);
        this.isLoading = false;
      },
      (error) => {
        console.error('Error updating pet vaccination status', error);
        this.isLoading = false;
      }
    );
  }
}

class Pet {
  name: string;
  animal: string;
  isVaccinated: boolean;

  constructor(name: string, animal: string, isVaccinated: boolean) {
    this.name = name;
    this.animal = animal;
    this.isVaccinated = isVaccinated;
  }

  toggleVaccinationStatus(): void {
    this.isVaccinated = !this.isVaccinated;
  }
}

class Client {
  name: string;
  pets: Pet[];

  constructor(name: string, pets: Pet[]) {
    this.name = name;
    this.pets = pets;
  }
}
