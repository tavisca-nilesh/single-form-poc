import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { EffectsModule } from "@ngrx/effects";
import { ActionReducerMap, StoreModule } from "@ngrx/store";
import { AppComponent } from "./app.component";
import { SampleFormComponent } from "./sample-form/sample-form.component";
import { AppState } from "./store/app.state";
import { SuggestedLocationsEffects } from "./store/effects";
import { sampleReducer } from "./store/reducers";

export const sampleModuleReducers: ActionReducerMap<AppState, any> = {
  sample: sampleReducer,
};
@NgModule({
  declarations: [AppComponent, SampleFormComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(sampleModuleReducers),
    EffectsModule.forRoot([SuggestedLocationsEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
