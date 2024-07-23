import { patchState, signalStore, withMethods, withState } from "@ngrx/signals"

type FilterStoreState = {
    region: number,
    subregion: number,
    numStars: number,
    hasSuperlative: boolean
}

const initialState: FilterStoreState = {
    region: -1,
    subregion: -1,
    numStars: -1,
    hasSuperlative: false
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
