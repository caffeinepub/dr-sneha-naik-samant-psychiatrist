import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Appointment {
    name: string;
    preferredTime: string;
    timestamp: Time;
    phone: string;
    condition: string;
}
export type Time = bigint;
export interface backendInterface {
    getAllAppointments(): Promise<Array<Appointment>>;
    submitAppointment(name: string, phone: string, condition: string, preferredTime: string, timestamp: Time): Promise<void>;
}
