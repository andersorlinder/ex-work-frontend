import { MortgageOfferData } from "./mortgage";

export interface ContactFormData {
        name: string;
        address: string,
        zipCode: number | null,
        city: string,
        phoneNumber: string | null,
        email: string,
    }

export interface ApplicationData {
    contact: ContactFormData,
    offer: MortgageOfferData
}