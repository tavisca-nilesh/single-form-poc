import { Component, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-search-page",
  templateUrl: "./search-page.container.html",
  styleUrls: ["./search-page.container.css"],
})
export class SearchPageContainer implements OnInit {
  form: FormGroup | null = null;

  formDataJSON: string | null = null;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      journeyType: new FormControl("oneWay", Validators.required),
      passengerCount: new FormControl(1, [
        Validators.required,
        Validators.min(1),
        Validators.max(4),
      ]),
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
    this.journeys.push(this.createJourneyGroup());
  }

  removeJourney(index: number) {
    if (this.journeys.length > 1) {
      this.journeys.removeAt(index);
    }
  }

  onJourneyTypeChange() {
    while (this.journeys.length > 1) {
      this.journeys.removeAt(1);
    }
  }

  onSearch() {
    if (this.form?.valid) {
      const formData = this.form?.value;
      this.formDataJSON = JSON.stringify(formData, null, 2);
    }
  }
}
