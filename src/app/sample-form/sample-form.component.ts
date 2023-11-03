import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { LoadSuggestedLocations } from "../store/actions";
import { AppState } from "../store/app.state";
import { loadLocations } from "../store/selectors";
import { Location } from "../interfaces/locations";

@Component({
  selector: "app-sample-form",
  templateUrl: "./sample-form.component.html",
  styleUrls: ["./sample-form.component.css"],
})
export class SampleFormComponent implements OnInit {
  form: FormGroup | null = null;
  suggestedLocations: Location[] = [];
  formDataJSON: string | null = null;
  private loadLocations$ = this.store.select(loadLocations);

  constructor(private fb: FormBuilder, private store: Store<AppState>) {}

  ngOnInit() {
    this.form = this.fb.group({
      journeyType: ["roundTrip", Validators.required],
      passengerCount: [
        1,
        [Validators.required, Validators.min(1), Validators.max(4)],
      ],
      location: ["", Validators.required],
      startDate: ["", Validators.required],
      returnDate: [""],
    });

    this.form.get("journeyType")?.valueChanges.subscribe((value) => {
      const returnDateControl = this.form?.get("returnDate");

      if (value === "roundTrip") {
        returnDateControl?.setValidators([Validators.required]);
      } else {
        returnDateControl?.clearValidators();
      }

      returnDateControl?.updateValueAndValidity();
    });

    this.loadLocations$.subscribe((suggestedLocations) => {
      this.suggestedLocations = [...suggestedLocations];
    });
  }

  onJourneyTypeChange() {}

  onLocationInputChange() {
    this.suggestedLocations = [];
    const location = this.form?.get("location")?.value;
    if (location && location.length >= 3) {
      this.store.dispatch(LoadSuggestedLocations({ searchTerm: location }));
    }
  }

  selectLocation(location: any) {
    this.form?.get("location")?.setValue(location);
    this.suggestedLocations = [];
  }

  onSearch() {
    if (this.form?.valid) {
      const formData = this.form?.value;
      this.formDataJSON = JSON.stringify(formData, null, 2);
    }
  }
}
