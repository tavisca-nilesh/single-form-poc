import { Component, Input } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-search-date-selector",
  templateUrl: "./search-date-selector.component.html",
  styleUrls: ["./search-date-selector.component.css"],
})
export class SearchDateSelectorComponent {
  @Input() startDateControl!: FormControl | null;
  @Input() returnDateControl!: FormControl | null;
  @Input() isRoundTrip = false;
}
