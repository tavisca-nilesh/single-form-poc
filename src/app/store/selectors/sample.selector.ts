import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";

export const sampleStateSelector = (state: AppState) => state.sample;

export const loadLocations = createSelector(
  sampleStateSelector,
  (state) => state.suggestedLocations
);
