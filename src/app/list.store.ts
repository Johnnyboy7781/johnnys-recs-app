import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { Place, Region, Subregion } from "./data-types";
import { computed } from "@angular/core";

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

            patchState(store, { subregions: sortedSubregionArr })
        },

        updatePlaces(newPlaces: Place[]): void {
            // Return early on bad data
            if (store.subregions().length === 0) {
                patchState(store, { places: new Map() })
                return;
            }

            const map = new Map<string, Place[]>()
            
            // Create new map item for each subregion
            store.subregions().forEach((subregion) => {
                map.set(subregion.name, new Array<Place>())
            })

            // Sort places into appropriate subregion map item
            newPlaces.forEach((place) => {
                const subregionName = store.subregions()[place.subregion_id].name;
                map.get(subregionName)!.push(place)
            })

            patchState(store, { places: map });
        }
    })),

    withComputed(({ places }) => ({
        isListEmpty: computed((): boolean => {
            let isEmpty = true;

            places().forEach((placeArr) => {
                if (isEmpty) {
                    isEmpty = placeArr.length === 0;
                }
            })

            return isEmpty;
        })
    }))
)