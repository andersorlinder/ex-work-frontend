import { MortgageData, MortgageFormData, MortgageOfferData } from "./models/mortgageModels";

export const mortgageApplicationApiUrl = "http://localhost:19595/MortgageApplication/submit"
export const interestOffer = 3.5;
export const profitThreshold = 500;
export const noOfferMessage = "Tyvärr, vi kan inte erbjuda er ett låneerbjudande.";
export const offerApprovedMessage = "Grattis, vi kan erbjuda dig ett bättre lån!"
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
export const mortgageOffer: MortgageOfferData = {
    mortgage: defaultMortgageFormData.mortgage,
    payment: defaultMortgageFormData.payment,
    interest: interestOffer,
    customerProfit: 1000,
}
