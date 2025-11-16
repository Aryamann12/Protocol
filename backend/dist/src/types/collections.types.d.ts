export interface ExerciseEntry {
    exercise: string;
    progress: string;
    sets: number;
}
export interface GymProgress {
    _id?: string;
    date: string;
    location: string | null;
    push: ExerciseEntry[];
    pull: ExerciseEntry[];
    legs: ExerciseEntry[];
    createdAt?: Date;
    updatedAt?: Date;
}
export interface BookChapter {
    title: string;
    status: string;
    notes?: string;
}
export interface Book {
    _id?: string;
    sr_no: number;
    category: string;
    subcategory: string;
    book_title: string;
    authors: string[];
    chapters: BookChapter[];
    createdAt?: Date;
    updatedAt?: Date;
}
export interface UdemyCourse {
    _id?: string;
    platform: string;
    access_type: string;
    coverage: string;
    status: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface TopicProgress {
    title: string;
    status: string;
    notes?: string;
}
export interface TleLevel3Course {
    _id?: string;
    sr_no: number;
    module: string;
    topics: TopicProgress[];
    createdAt?: Date;
    updatedAt?: Date;
}
export interface CodingNinjasCourse {
    _id?: string;
    sr_no: number;
    course_type: string;
    title: string;
    topics: any[];
    createdAt?: Date;
    updatedAt?: Date;
}
export interface CppProblemModule {
    sr_no: number;
    module_name: string;
    category: string;
    topics: any[];
}
export interface CppProblemList {
    _id?: string;
    list_name: string;
    description: string;
    modules: CppProblemModule[];
    createdAt?: Date;
    updatedAt?: Date;
}
export interface CppProblem {
    _id?: string;
    id: string;
    title: string;
    category: string;
    difficulty: string;
    notes: string;
    code: string;
    imageUrl: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface Item {
    _id?: string;
    sr_no: number;
    item_name: string;
    category?: string;
    quantity?: number | string;
    location?: string;
    notes?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface WardrobeItem extends Item {
}
export interface FridgeItem {
    _id?: string;
    sr_no: number;
    item_name: string;
    category: string;
    quantity: string;
    storage_shelf: string;
    expiry_date: string;
    status: string;
    priority_to_consume: string;
    notes: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface KitchenEquipment {
    _id?: string;
    sr_no: number;
    category: string;
    item_name: string;
    model_details: string;
    location: string;
    purchase_date: string | null;
    warranty_expiry: string | null;
    usage_frequency: string;
    notes: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface Utensil {
    _id?: string;
    sr_no: number;
    category: string;
    item_name: string;
    quantity: number;
    location: string;
    notes: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface DeviceSpecs {
    processor?: string;
    ram?: string;
    graphics?: string;
    note?: string;
}
export interface Device {
    _id?: string;
    sr_no: number;
    category: string;
    device_name: string;
    description: string;
    bought_year: number;
    specs: DeviceSpecs;
    compatible_with: string[];
    chipset?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface MusicalInstrumentDetails {
    accessories?: string[];
}
export interface MusicalInstrument {
    _id?: string;
    sr_no: number;
    category: string;
    details: MusicalInstrumentDetails;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface MobilityDetails {
    availability?: string;
    notes?: string;
}
export interface Mobility {
    _id?: string;
    sr_no: number;
    category: string;
    device_name: string;
    purpose: string;
    description: string;
    usage: string[];
    details: MobilityDetails;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface StreamingApp {
    _id?: string;
    sr_no: number;
    name: string;
    type: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface SocialPlatform {
    _id?: string;
    sr_no: number;
    name: string;
    type: string;
    purpose: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface AIResource {
    _id?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface ModelUsage {
    _id?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface UsageLimit {
    _id?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface TenXiitianModule {
    sr_no: number;
    module: string;
    total_hours: number;
    completed_percentage: number;
    status: string;
    notes?: string;
}
export interface TenXiitianResource {
    _id?: string;
    track_name: string;
    modules: TenXiitianModule[];
    createdAt?: Date;
    updatedAt?: Date;
}
export interface Company {
    _id?: string;
    CompanyName: string;
    IndustryOrSector: string;
    FoundedYear: number;
    Founders: string[];
    HeadquartersLocation: string;
    CompanyHistorySummary: string;
    NotableProductsOrServices: string[];
    MarketCap: string;
    AnnualRevenue: string;
    GlobalPresence: string;
    StrategicFocusAreas: string[];
    RecentMajorNews: string[];
    Competitors: string | string[] | any[];
    CompanyCultureTraits: string[];
    VisionOrMissionStatement: string;
    CEOName: string;
    CEOBirthdate: string;
    CEOBirthplace: string;
    CEOEducation: string[];
    PreviousRoles: string[];
    YearBecameCEO: string;
    LeadershipStyle: string;
    KeyPersonalityTraits: string[];
    CEOAchievements: string[];
    CEOPublicReputation: string;
    CEONetWorth: string;
    CEOAwards: string;
    CEOQuotes: string[];
    CEOPhilanthropyFocus: string | string[];
    CEOControversies: string;
    CEOImpactOnCompanyStrategy: string;
    CompanyGrowthUnderCurrentCEO: string[];
    CEOEmployeeApprovalRating: string | string[];
    CEOInterestsAndHobbies: string;
    CEOPersonalBrandKeywords: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface User {
    _id?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export type CollectionName = 'gym-progress' | 'exercise-entries' | 'books' | 'udemycourses' | 'tlelevel3courses' | 'codingninjascourses' | 'cppproblems' | 'cppproblemlists' | 'items' | 'wardrobe' | 'fridgeitems' | 'kitchenequipments' | 'utensils' | 'devices' | 'musicalinstruments' | 'mobilities' | 'streamingapps' | 'socialplatforms' | 'airesources' | 'modelusages' | 'usagelimits' | 'companies' | 'users' | '10xiitian_Resources';
export type CollectionDomain = 'Fitness' | 'Learning' | 'Inventory' | 'Tech' | 'General';
export declare const COLLECTION_DOMAIN_MAP: Record<CollectionName, CollectionDomain>;
export type AnyCollectionDocument = GymProgress | Book | UdemyCourse | TleLevel3Course | CodingNinjasCourse | CppProblem | CppProblemList | Item | FridgeItem | KitchenEquipment | Utensil | Device | MusicalInstrument | Mobility | StreamingApp | SocialPlatform | AIResource | ModelUsage | UsageLimit | Company | User | TenXiitianResource;
