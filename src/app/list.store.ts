import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { Place, Region, Subregion } from "./data-types";

export type ListStoreState = {
    regions: Region[],
    subregions: Subregion[],
    places: Map<string, Place[]>
}

const initialState: ListStoreState = {
    regions: [],
    subregions: [],
    places: new Map()
}

export const ListStore = signalStore(
    { providedIn: 'root' },

    withState<ListStoreState>(initialState),

    withMethods((store) => ({
        updateRegions(newRegions: Region[]): void {
            patchState(store, { regions: newRegions })
        },

        updateSubregions(newSubregions: Subregion[]): void {
            const sortedSubregionArr = new Array<Subregion>();
            
            // Place subregions into array at index that matches its ID
            newSubregions.forEach((subregion) => {
                sortedSubregionArr[subregion.id] = subregion;
            })

            console.log(sortedSubregionArr);
            patchState(store, { subregions: sortedSubregionArr })
        },

        updatePlaces(newPlaces: Place[]): void {
            const map = new Map<string, Place[]>()
            
            store.subregions().forEach((subregion) => {
                map.set(subregion.name, new Array<Place>())
            })

            newPlaces.forEach((place) => {
                const subregionName = store.subregions()[place.subregion_id].name;
                map.get(subregionName)!.push(place)
            })

            patchState(store, { places: map });
        }
    }))
)