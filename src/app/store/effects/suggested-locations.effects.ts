import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { EMPTY, Subject } from "rxjs";
import {
  map,
  mergeMap,
  catchError,
  switchMap,
  takeUntil,
  debounceTime,
} from "rxjs/operators";
import { SearchService } from "../../services/search.service";
import {
  LoadSuggestedLocations,
  LoadSuggestedLocationsSuccess,
  SampleActionTypes,
} from "../actions";

@Injectable()
export class SuggestedLocationsEffects {
  private destroy$ = new Subject<void>();

  loadSuggestedLocations$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(LoadSuggestedLocations),
      switchMap((action) =>
        this.searchService.getSuggestedLocations(action.searchTerm).pipe(
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
    private searchService: SearchService
  ) {}
}
