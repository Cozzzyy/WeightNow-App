export type WeightCreate = Omit<Weight, 'id'>;

export type Weight = {
    id: string;
    weight: number;
    date: Date | string;
    profile_id: string;
    timestamp: number;
}