import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SampleService {

  getSuggestedLocations(query: string) {
    // Assuming you have a list of 20 cities stored in a JSON file
    const cities = ['City1', 'City2', 'City3', /*... add all cities here ...*/ 'City20'];
    const filteredCities = cities.filter(city => city.toLowerCase().includes(query.toLowerCase()));
    return of(filteredCities);
  }
}
