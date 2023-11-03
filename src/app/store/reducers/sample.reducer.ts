import { createReducer, on } from "@ngrx/store";
import {
  LoadSuggestedLocations,
  LoadSuggestedLocationsSuccess,
  SampleActionTypes,
} from "../actions";

export interface SampleState {
  suggestedLocations: string[];
}

export const initialState: SampleState = {
  suggestedLocations: [],
};

export const sampleReducer = createReducer(
  initialState,
  on(LoadSuggestedLocationsSuccess, (state, { suggestedLocations }) => {
    return { ...state, suggestedLocations: suggestedLocations };
  }),

  on(LoadSuggestedLocations, (state, { searchTerm }) => {
    return {
      ...state,
    };
  })
);
