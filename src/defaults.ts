import type { ContactFormData } from "./models/application_models";
import type { MortgageData, MortgageFormData, MortgageOfferData } from "./models/mortgage_models";

export const mortgageApplicationApiUrl = "http://localhost:5000/MortgageApplication/submit";
export const minMortgageAmount = 1000;
export const maxMortgageAmount = 250000;
export const minTotalPeriod = 6;
export const maxTotalPeriod = 120;
export const maxInterest = 100;
export const interestOffer = 3.5;
export const profitThreshold = 500;
export const defaultMortgageFormData: MortgageFormData = {
	mortgage: 25000,
	payment: 490,
	interest: 6.5,
	periodTotal: 60,
	periodPaidOff: 12,
};
export const initialMortgageData: MortgageData = {
	mortgage: defaultMortgageFormData.mortgage,
	payment: defaultMortgageFormData.payment,
	interest: defaultMortgageFormData.interest,
	periodRemaining: defaultMortgageFormData.periodTotal - defaultMortgageFormData.periodPaidOff,
	submitted: false,
};
export const mortgageOffer: MortgageOfferData = {
	mortgage: defaultMortgageFormData.mortgage,
	payment: defaultMortgageFormData.payment,
	interest: interestOffer,
	customerProfit: 1000,
};
export const defaultContactFormData: ContactFormData = {
	name: "",
	address: "",
	zipCode: 0,
	city: "",
	phoneNumber: "",
	email: "",
};
