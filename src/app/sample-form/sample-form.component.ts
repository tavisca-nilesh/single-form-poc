import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { LoadSuggestedLocations } from "../store/actions";
import { AppState } from "../store/app.state";

@Component({
  selector: "app-sample-form",
  templateUrl: "./sample-form.component.html",
  styleUrls: ["./sample-form.component.css"],
})
export class SampleFormComponent implements OnInit {
  form: FormGroup | null = null;
  suggestedLocations: string[] = [];
  formDataJSON: string | null = null;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {}

  ngOnInit() {
    this.form = this.fb.group({
      journeyType: ["roundTrip", Validators.required],
      passengerCount: [
        1,
        [Validators.required, Validators.min(1), Validators.max(4)],
      ],
      location: ["", Validators.required],
      journeyDate: ["", Validators.required],
    });
  }

  onJourneyTypeChange() {}

  onLocationInputChange() {
    const location = this.form?.get("location")?.value;
    if (location && location.length >= 3) {
      this.store.dispatch(LoadSuggestedLocations({ searchTerm: location }));
    }
  }

  selectLocation(location: string) {
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
