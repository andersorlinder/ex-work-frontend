import { MortgageOfferData } from "./mortgage";

export interface ContactFormData {
        name: string;
        address: string,
        zipCode: number | null,
        city: string,
        phoneNumber: number | null,
        email: string,
    }

export interface ApplicationData {
    contact: ContactFormData,
    offer: MortgageOfferData
}