import { Action, createAction, props } from "@ngrx/store";
import { Location } from 'src/app/interfaces/locations';

export enum SampleActionTypes {
  LoadSuggestedLocations = "[Sample Form] Load Suggested Locations",
  LoadSuggestedLocationsSuccess = "[Sample Form] Load Suggested Locations Success",
  ClearSuggestedLocations = "[Sample Form] Clear Suggestions",
}

export const LoadSuggestedLocations = createAction(
  SampleActionTypes.LoadSuggestedLocations,
  props<{ searchTerm: string }>()
);

export const LoadSuggestedLocationsSuccess = createAction(
  SampleActionTypes.LoadSuggestedLocationsSuccess,
  props<{ suggestedLocations: Location[] }>()
);

export const ClearSuggestedLocations = createAction(
  SampleActionTypes.ClearSuggestedLocations
);
