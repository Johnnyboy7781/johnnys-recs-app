export type Region = {
    id: number,
    name: string
}

export type Subregion = {
    id: number,
    name: string,
    regionId: number
}

export type Place = {
    description: string,
    google_uid: string,
    id: number,
    num_stars: number,
    region_id: number,
    subregion_id: number,
    subtitle: string,
    superlative: string | null,
    title: string
}

export type ListData = [string, Place[]];
