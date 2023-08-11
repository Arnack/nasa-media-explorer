export interface NasaMediaItem {
    nasa_id: string;
    title: string;
    location?: string;
    photographer?: string;
    thumbnailUrl: string;
    description: string;
    date_created: string;
    media_type: string;
    keywords: string[];
}