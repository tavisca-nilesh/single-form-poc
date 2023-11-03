import { Action, createAction, props } from "@ngrx/store";

export enum SampleActionTypes {
  LoadSuggestedLocations = "[Sample Form] Load Suggested Locations",
  LoadSuggestedLocationsSuccess = "[Sample Form] Load Suggested Locations Success",
}

export const LoadSuggestedLocations = createAction(
  SampleActionTypes.LoadSuggestedLocations,
  props<{ searchTerm: string }>()
);

export const LoadSuggestedLocationsSuccess = createAction(
  SampleActionTypes.LoadSuggestedLocationsSuccess,
  props<{ suggestedLocations: string[] }>()
);
