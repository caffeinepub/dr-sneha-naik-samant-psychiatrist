import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Inquiry {
    name: string;
    preferredTime: string;
    timestamp: bigint;
    phone: string;
    condition: string;
}
export interface backendInterface {
    getAllInquiries(): Promise<Array<Inquiry>>;
    submitInquiry(name: string, phone: string, condition: string, preferredTime: string, timestamp: bigint): Promise<void>;
}
