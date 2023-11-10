import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import {
  Subject,
  of,
  switchMap,
  takeUntil
} from "rxjs";
import { Location } from "src/app/interfaces/locations";
import { SearchService } from "src/app/services/search.service";

@Component({
  selector: "app-journey-selector",
  templateUrl: "./journey-selector.component.html",
  styleUrls: ["./journey-selector.component.css"],
})
export class JourneySelectorComponent implements OnInit, OnDestroy {
  @Input() locationControl!: FormControl | null;
  suggestedLocations: Location[] = [];
  private inputChanged$ = new Subject<string>();
  private destroy$: Subject<void> = new Subject<void>();
  constructor(private searchService: SearchService) {}
  ngOnInit(): void {
    this.locationControl?.get('name');
    this.inputChanged$
      .pipe(
        // debounceTime(300), // Wait for 300ms after the last keystroke
        takeUntil(this.destroy$), // Cancel the observable when component is destroyed
        switchMap((searchTerm) => {
          if (searchTerm && searchTerm.length >= 3) {
            return this.searchService.getSuggestedLocations(searchTerm);
          } else {
            return of([]);
          }
        })
      )
      .subscribe((locations) => {
        this.suggestedLocations = [...locations];
      });
  }

  onLocationInputChange(event: any) {
    const searchTerm = (event.target as HTMLInputElement).value;
    // this.inputChanged$.next(searchTerm);
    // return;

    if (searchTerm && searchTerm.length >= 3) {
      this.searchService
        .getSuggestedLocations(searchTerm)
        .subscribe((locations) => {
          this.suggestedLocations = [...locations];
        });
    }
  }

  selectLocation(airport: Location) {
    console.log("selectLocation");
    this.locationControl?.setValue(airport);
    this.suggestedLocations = [];
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
