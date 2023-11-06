import { NgModule, isDevMode } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { EffectsModule } from "@ngrx/effects";
import { ActionReducerMap, StoreModule } from "@ngrx/store";
import { AppComponent } from "./app.component";
import { SearchPageContainer } from "./containers";
import { AppState } from "./store/app.state";
import { SuggestedLocationsEffects } from "./store/effects";
import { sampleReducer } from "./store/reducers";
import { HttpClientModule } from "@angular/common/http";
import {
  SearchDateSelectorComponent,
  JourneySelectorComponent,
} from "./components";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

export const sampleModuleReducers: ActionReducerMap<AppState, any> = {
  sample: sampleReducer,
};
@NgModule({
  declarations: [
    AppComponent,
    SearchPageContainer,
    SearchDateSelectorComponent,
    JourneySelectorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot(sampleModuleReducers),
    StoreDevtoolsModule.instrument({
      name: 'sample',
      logOnly: true,
    }),
    EffectsModule.forRoot([SuggestedLocationsEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
