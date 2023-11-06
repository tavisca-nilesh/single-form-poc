import { Injectable } from "@angular/core";
import { Subject, debounceTime, of, takeUntil } from "rxjs";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

const airports = [
  {
    id: 1,
    name: "John F. Kennedy International Airport",
    city: "New York",
    country: "United States",
    airportCode: "JFK",
  },
  {
    id: 2,
    name: "Los Angeles International Airport",
    city: "Los Angeles",
    country: "United States",
    airportCode: "LAX",
  },
  {
    id: 3,
    name: "London Heathrow Airport",
    city: "London",
    country: "United Kingdom",
    airportCode: "LHR",
  },
  {
    id: 4,
    name: "Tokyo Haneda Airport",
    city: "Tokyo",
    country: "Japan",
    airportCode: "HND",
  },
  {
    id: 5,
    name: "Beijing Capital International Airport",
    city: "Beijing",
    country: "China",
    airportCode: "PEK",
  },
  {
    id: 6,
    name: "Paris Charles de Gaulle Airport",
    city: "Paris",
    country: "France",
    airportCode: "CDG",
  },
  {
    id: 7,
    name: "Dubai International Airport",
    city: "Dubai",
    country: "United Arab Emirates",
    airportCode: "DXB",
  },
  {
    id: 8,
    name: "Hong Kong International Airport",
    city: "Hong Kong",
    country: "Hong Kong",
    airportCode: "HKG",
  },
  {
    id: 9,
    name: "Frankfurt am Main Airport",
    city: "Frankfurt",
    country: "Germany",
    airportCode: "FRA",
  },
  {
    id: 10,
    name: "Amsterdam Schiphol Airport",
    city: "Amsterdam",
    country: "Netherlands",
    airportCode: "AMS",
  },
  {
    id: 11,
    name: "Singapore Changi Airport",
    city: "Singapore",
    country: "Singapore",
    airportCode: "SIN",
  },
  {
    id: 12,
    name: "Incheon International Airport",
    city: "Seoul",
    country: "South Korea",
    airportCode: "ICN",
  },
  {
    id: 13,
    name: "San Francisco International Airport",
    city: "San Francisco",
    country: "United States",
    airportCode: "SFO",
  },
  {
    id: 14,
    name: "Denver International Airport",
    city: "Denver",
    country: "United States",
    airportCode: "DEN",
  },
  {
    id: 15,
    name: "Sydney Kingsford Smith Airport",
    city: "Sydney",
    country: "Australia",
    airportCode: "SYD",
  },
  {
    id: 16,
    name: "Toronto Pearson International Airport",
    city: "Toronto",
    country: "Canada",
    airportCode: "YYZ",
  },
  {
    id: 17,
    name: "Munich Airport",
    city: "Munich",
    country: "Germany",
    airportCode: "MUC",
  },
  {
    id: 18,
    name: "Madrid Barajas Adolfo Suárez Airport",
    city: "Madrid",
    country: "Spain",
    airportCode: "MAD",
  },
  {
    id: 19,
    name: "Rome Fiumicino Airport",
    city: "Rome",
    country: "Italy",
    airportCode: "FCO",
  },
  {
    id: 20,
    name: "Zurich Airport",
    city: "Zurich",
    country: "Switzerland",
    airportCode: "ZRH",
  },
];
@Injectable({
  providedIn: "root",
})
export class SearchService {
  private apiUrl = "https://jsonplaceholder.typicode.com/users"; // Replace with your actual API URL
  private destroy$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  getSuggestedLocations(query: string): Observable<any[]> {
    const params = { query }; // Set up any additional parameters for your API request

    // return this.http
    //   .get<any[]>(this.apiUrl, { params })
    //   .pipe(debounceTime(1000), takeUntil(this.destroy$));

    const filteredLocations = airports.filter(
      (airport) =>
        airport.name.toLowerCase().includes(query.toLowerCase()) ||
        airport.city.toLowerCase().includes(query.toLowerCase()) ||
        airport.airportCode.toLowerCase().includes(query.toLowerCase())
    );
    return of(filteredLocations);
  }
}
