import { computed } from '@angular/core';
import {
    patchState,
    signalStore,
    withComputed,
    withMethods,
    withState
} from '@ngrx/signals';

export type FilterStoreState = {
    region: number;
    subregion: number;
    numStars: number;
    hasSuperlative: boolean;
};

const subfilterInitialState: Partial<FilterStoreState> = {
    subregion: -1,
    numStars: -1,
    hasSuperlative: false
};

const initialState: FilterStoreState = {
    region: -1,
    subregion: subfilterInitialState.subregion!,
    numStars: subfilterInitialState.numStars!,
    hasSuperlative: subfilterInitialState.hasSuperlative!
};

export const FilterStore = signalStore(
    { providedIn: 'root' },

    withState(initialState),

    withMethods((store) => ({
        updateState(newState: Partial<FilterStoreState>): void {
            patchState(store, newState);
        },

        resetSubFilters(): void {
            patchState(store, subfilterInitialState);
        }
    })),

    withComputed(({ subregion, numStars, hasSuperlative }) => ({
        areSubfiltersDirty: computed(() => {
            return (
                subregion() === subfilterInitialState.subregion &&
                numStars() === subfilterInitialState.numStars &&
                hasSuperlative() === subfilterInitialState.hasSuperlative
            );
        })
    }))
);
