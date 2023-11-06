import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { LoadSuggestedLocations } from "../../store/actions";
import { AppState } from "../../store/app.state";
import { loadLocations } from "../../store/selectors";
import { Location } from "../../interfaces/locations";

@Component({
  selector: "app-search-page",
  templateUrl: "./search-page.container.html",
  styleUrls: ["./search-page.container.css"],
})
export class SearchPageContainer implements OnInit {
  form: FormGroup | null = null;
  suggestedLocations: Location[][] = [];
  formDataJSON: string | null = null;
  private loadLocations$ = this.store.select(loadLocations);

  currentIndex = 0;
  constructor(private fb: FormBuilder, private store: Store<AppState>) {}

  ngOnInit() {
    this.suggestedLocations.push([]);
    this.form = this.fb.group({
      journeyType: ["oneWay", Validators.required],
      passengerCount: [
        1,
        [Validators.required, Validators.min(1), Validators.max(4)],
      ],
      journeys: this.fb.array([this.createJourneyGroup()]),
    });

    this.form.get("journeyType")?.valueChanges.subscribe((value) => {
      if (value === "roundTrip") {
        const firstJourney = this.journeys.at(0) as FormGroup;
        firstJourney.get("returnDate")?.setValidators([Validators.required]);
        firstJourney.get("returnDate")?.updateValueAndValidity();
      } else {
        this.journeys.controls.forEach((journey) => {
          journey.get("returnDate")?.clearValidators();
          journey.get("returnDate")?.updateValueAndValidity();
        });
      }

      this.onJourneyTypeChange();
    });

    this.loadLocations$.subscribe((suggestedLocations) => {
      this.suggestedLocations[this.currentIndex] = [...suggestedLocations];
    });
  }

  get journeys() {
    return this.form?.get("journeys") as FormArray;
  }

  createJourneyGroup(): FormGroup {
    return this.fb.group({
      location: [null, Validators.required],
      startDate: ["", Validators.required],
      returnDate: [""],
    });
  }

  addJourney() {
    this.suggestedLocations.push([]);
    this.journeys.push(this.createJourneyGroup());
  }

  removeJourney(index: number) {
    if (this.journeys.length > 1) {
      this.journeys.removeAt(index);
      this.suggestedLocations.splice(index, 1);
    }
  }

  onJourneyTypeChange() {
    while (this.journeys.length > 1) {
      this.journeys.removeAt(1);
      this.suggestedLocations.splice(1, 1);
    }
  }

  onLocationInputChange(event: any, index: number) {
    this.currentIndex = index;
    const searchTerm = event?.target?.value;
    this.suggestedLocations = [];
    if (searchTerm && searchTerm.length >= 3) {
      this.store.dispatch(LoadSuggestedLocations({ searchTerm: searchTerm }));
    }
  }

  selectLocation(airport: Location, index: number) {
    this.journeys.at(index).get("location")?.setValue(airport);
    this.suggestedLocations[index] = [];
  }

  onSearch() {
    if (this.form?.valid) {
      const formData = this.form?.value;
      this.formDataJSON = JSON.stringify(formData, null, 2);
    }
  }
}
