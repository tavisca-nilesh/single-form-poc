import { createReducer, on } from "@ngrx/store";
import {
  LoadSuggestedLocations,
  LoadSuggestedLocationsSuccess,
  SampleActionTypes,
} from "../actions";
import { Location } from 'src/app/interfaces/locations';

export interface SampleState {
  suggestedLocations: Location[];
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
