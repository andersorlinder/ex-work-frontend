export interface MortgageFormData {
	mortgage: number;
	payment: number;
	interest: number;
	periodTotal: number;
	periodPaidOff: number;
}

export interface MortgageData {
	mortgage: number;
	payment: number;
	interest: number;
	periodRemaining: number;
	submitted: boolean;
}

export interface MortgageOfferData {
	mortgage: number;
	payment?: number;
	interest?: number;
	customerProfit?: number;
	bankProfit?: number;
}
