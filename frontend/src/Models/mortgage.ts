export interface MortgageData {
    mortgage: number;
    payment: number;
    interest: number;
    periodRemaining: number;
    submitted: boolean
}

export interface OfferData {
    mortgage: number;
    newPayment?: number;
    newInterest?: number;
    fullProfit?: number;
}