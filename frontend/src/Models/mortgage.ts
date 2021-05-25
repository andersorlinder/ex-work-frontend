export interface MortgageData {
    mortgage: number;
    payment: number;
    interest: number;
    periodTotal: number;
    periodPaidOff: number;
    periodRemaining?: number;
}

export interface MortgageOffer {
    mortgage?: number;
    newPayment?: number;
    newInterest?: number;
    fullProfit?: number;
}