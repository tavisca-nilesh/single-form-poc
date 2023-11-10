import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
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

  formData: any = {
    journeyType: "oneWay",
    passengerCount: 1,
    journeys: [
      {
        location: {
          id: 1,
          name: "John F. Kennedy International Airport",
          city: "New York",
          country: "United States",
          airportCode: "JFK",
        },
        startDate: "2023-11-22",
        returnDate: "",
      },
    ],
  };

  formDataJSON: string = JSON.stringify(this.formData, null, 2);

  constructor(
    private fb: FormBuilder,
    private _changeDetectionRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.initializeSearchForm();
    this.form?.get("journeyType")?.valueChanges.subscribe((value) => {
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

  private initializeSearchForm() {
    this.form = this.fb.group({
      journeyType: new FormControl("oneWay", Validators.required),
      passengerCount: new FormControl(1, [
        Validators.required,
        Validators.min(1),
        Validators.max(4),
      ]),
      journeys: this.fb.array([this.createJourneyGroup()]),
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
    // while (this.journeys.length > 1) {
    //   this.journeys.removeAt(1);
    // }
    this.removeInvalidLocations();
  }

  onSearch() {
    if (this.form?.valid) {
      const formData = { ...this.form?.value };
      if (formData.journeyType !== "multiCity") {
        formData.journeys = [this.formData.journeys[0]];
      }
      this.formDataJSON = JSON.stringify(formData, null, 2) as any;
    }
  }

  updateFormFromJSON() {
    try {
      const parsedData = JSON.parse(this.formDataJSON);
      this.formData = parsedData;
      //this.initializeSearchForm();
      this.form?.patchValue(parsedData);
      this._changeDetectionRef.detectChanges();
    } catch (error) {
      console.error("Invalid JSON input:", error);
    }
  }

  removeInvalidLocations() {
    const journeysFormArray = this.form?.get("journeys") as FormArray;
    const invalidIndexes = journeysFormArray.controls
      .map((control, index) => (control.invalid ? index : -1))
      .filter((index) => index !== -1);

    invalidIndexes.reverse().forEach((index) => {
      if (index !== 0) journeysFormArray.removeAt(index);
    });
  }
}
