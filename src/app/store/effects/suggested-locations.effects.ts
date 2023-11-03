import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { EMPTY } from "rxjs";
import { map, mergeMap, catchError, switchMap } from "rxjs/operators";
import { SampleService } from "../../services/sample.service";
import {
  LoadSuggestedLocations,
  LoadSuggestedLocationsSuccess,
  SampleActionTypes,
} from "../actions";

@Injectable()
export class SuggestedLocationsEffects {
  loadSuggestedLocations$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(LoadSuggestedLocations),
      switchMap((action) =>
        this.sampleService.getSuggestedLocations(action.searchTerm).pipe(
          map((locations) =>
            LoadSuggestedLocationsSuccess({
              suggestedLocations: locations,
            })
          ),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private sampleService: SampleService
  ) {}
}
