export interface WeddingData {
    groom: Person;
    bride: Person;
    groomParents: Parents;
    brideParents: Parents;
    akad: EventDetail;
    reception: EventDetail;
    loveStory: LoveStoryItem[];
    gallery: GalleryItem[];
    agenda: AgendaItem[];
    bankAccounts: BankAccount[];
    qris: QRIS;
    verse: Verse;
    music: string;
}

export interface Person {
    name: string;
    fullName: string;
    nickname: string;
    role: string;
    photo: string;
    instagram?: string;
    bio?: string;
}

export interface Parents {
    father: string;
    mother: string;
}

export interface EventDetail {
    date: string;
    time: string;
    endTime?: string;
    venue: string;
    address: string;
    mapsUrl: string;
    wazeUrl: string;
    embedUrl: string;
    calendarTitle: string;
}

export interface LoveStoryItem {
    id: number;
    date: string;
    title: string;
    description: string;
    icon: string;
}

export interface GalleryItem {
    id: number;
    src: string;
    alt: string;
    width: number;
    height: number;
}

export interface AgendaItem {
    id: number;
    time: string;
    title: string;
    description?: string;
    icon: string;
}

export interface BankAccount {
    id: number;
    bank: string;
    accountNumber: string;
    accountName: string;
    logo: string;
}

export interface QRIS {
    image: string;
    name: string;
}

export interface Verse {
    text: string;
    source: string;
}

export interface RSVPData {
    name: string;
    attendance: "hadir" | "tidak_hadir" | "masih_ragu";
    guestCount: number;
    message: string;
}

export interface WishItem {
    id: string;
    name: string;
    message: string;
    attendance: string;
    timestamp: string;
}

export type Theme = "light" | "dark";