export interface IRankingInfo {
    "Episode": string,
    "Game": string,
    "Platform": string,
    "K. Gameplay": number,
    "K. Visuals": number,
    "K. Audio": number,
    "K. Content": number,
    "P. Gameplay": number,
    "P. Visuals": number,
    "P. Audio": number,
    "P. Content": number,
    "Episode Number": number,
    "G. Gameplay": number,
    "G. Visuals": number,
    "G. Audio": number,
    "G. Content": number,
    "IGN": number,
    "Metacritic": number,
    "Year": number,
    "IG Score": number,
    "Kevin's Rating": number,
    "Peter's Rating": number,
    "Guest Rating": number,
    "K. Aesthetics": number,
    "P. Aesthetics": number,
    "G. Aesthetics": number,
    "Gameplay": number,
    "Aesthetics": number,
    "Visuals": number,
    "Audio": number,
    "Content": number,
    "rank": number,
    "Guest": string,
    "GameImage"?: string
}

export interface IEpisodeInfo {
    updated_at : Date,
    type: string,
    token: string,
    title: string,
    status: string,
    slug: string,
    season: {
        href: string,
        number: number
    },
    scheduled_for: Date,
    published_at: Date,
    number: number,
    markers: {
        href: string,
        collection: Array<Object>
    },
    is_hidden: boolean,
    image_url: string,
    image_path: string,
    id: string,
    href: string,
    guid: string,
    enclosure_url: string,
    description: string,
    days_since_release: number,
    analytics: {
        href: string
    }
}

export enum CategoryTypes {
    Rank = "rank",
    Title = "Game",
    Year = "Year",
    Platform = "Platform",
    Overall = "IG Score",
    Gameplay = "Gameplay",
    Aesthetics = "Aesthetics",
    Content = "Content",
    KOverall = "Kevin's Rating",
    POverall = "Peter's Rating"
}