export interface IRankingInfo {
    episode : string,
    episode_number: number,
    game : string,
    platform: string,
    k_gameplay: number,
    k_visuals: number,
    k_audio: number,
    k_Aesthetics: number,
    k_content: number,
    k_rating: number,
    p_gameplay: number,
    p_visuals: number,
    p_audio: number,
    p_Aesthetics: number,
    p_content: number,
    p_rating: number,
    g_gameplay: number,
    g_visuals: number,
    g_audio: number,
    g_Aesthetics: number,
    g_content: number,
    g_rating: number,
    gameplay: number,
    visuals: number,
    audio: number,
    aesthetics: number,
    content: number,
    ig_score: number,
    rank: number,
    ign: number,
    metacritic: number,
    year: number,
    guest: string,
    game_image?: string
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