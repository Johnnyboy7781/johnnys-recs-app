import { patchState, signalStore, withMethods, withState } from "@ngrx/signals"

type FilterStoreState = {
    region?: string,
    subregion?: string,
    numStars?: number,
    hasSuperlative?: boolean
}

const initialState: FilterStoreState = {
    region: undefined,
    subregion: undefined,
    numStars: undefined,
    hasSuperlative: undefined
}

export const FilerStore = signalStore(
    { providedIn: 'root' },

    withState(initialState),

    withMethods((store) => ({
        updateState(newState: Partial<FilterStoreState>): void {
            patchState(store, newState);
        }
    }))
)
