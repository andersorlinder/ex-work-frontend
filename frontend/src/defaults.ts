import { MortgageFormData } from "./components/mortgageForm";
import { MortgageData, OfferData } from "./models/mortgage";

export const interestOffer = 3.5;
export const profitThreshold = 500;
export const noOffer = "Tyvärr, vi kan inte erbjuda er ett låneerbjudande.";
export const defaultMortgageFormData: MortgageFormData = {
    mortgage: 25000,
    payment: 490,
    interest: 6.5,
    periodTotal: 60,
    periodPaidOff: 12,
}
export const initialMortgageData: MortgageData = {
    mortgage: defaultMortgageFormData.mortgage,
    payment: defaultMortgageFormData.payment,
    interest: defaultMortgageFormData.interest,
    periodRemaining: 
        defaultMortgageFormData.periodTotal -
        defaultMortgageFormData.periodPaidOff,
    submitted: false,
}
export const mortgageOffer: OfferData = {
    mortgage: defaultMortgageFormData.mortgage,
    newPayment: defaultMortgageFormData.payment,
    newInterest: interestOffer,
    fullProfit: 1000,
}
