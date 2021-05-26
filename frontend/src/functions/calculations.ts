import { interestOffer, profitThreshold } from "../defaults";
import { MortgageData, OfferData } from "../models/mortgage";

export function getMortgageOffer(
    initialMortgageData: MortgageData
): OfferData {
    const remainingMortgageAmount = calculateRemainingMortgage(initialMortgageData);
    if (initialMortgageData.interest <= 3.5) {
        return { mortgage: remainingMortgageAmount };
    }
 
    const newMortgageData: MortgageData = {
        ...initialMortgageData,
        mortgage: remainingMortgageAmount,
        interest: interestOffer,
    }
    newMortgageData.payment = calculateMonthlyPayment(newMortgageData)
    
    const profits = calculateProfits(newMortgageData, initialMortgageData.payment)

    if (profits.bankProfit < profitThreshold) {
        return { mortgage: remainingMortgageAmount };
    }

    const mortgageOffer: OfferData = {
        mortgage: newMortgageData.mortgage,
        newPayment: newMortgageData.payment,
        newInterest: newMortgageData.interest,
        fullProfit: profits.customerProfit,
    }

    return mortgageOffer;
}

function calculateRemainingMortgage(mortgageData: MortgageData): number {
    const {
        payment,
        interest,
        periodRemaining,
    } = mortgageData;
    const normalizedMonthlyInterest = interest / 12 / 100;
    const changeFactor = 1 + normalizedMonthlyInterest;
    
    const remainingMortgage = Math.round(payment * (1 - Math.pow(changeFactor, periodRemaining * -1)) / normalizedMonthlyInterest);
    return remainingMortgage;
}

export function calculateMonthlyPayment(mortgageData: MortgageData): number {
    const {
        mortgage,
        interest,
        periodRemaining,
    } = mortgageData;
    const normalizedMonthlyInterest = interest / 12 / 100;
    const changeFactor = 1 + normalizedMonthlyInterest;
    
    const payment = Math.round(mortgage * normalizedMonthlyInterest / (1 - Math.pow(changeFactor, periodRemaining * -1)));

    return payment;
}

function calculateProfits(newMortgageData: MortgageData, oldPayment: number): { bankProfit: number, customerProfit: number} {
    const {
        mortgage,
        payment,
        periodRemaining,
    } = newMortgageData;

    const bankProfit = periodRemaining * payment - mortgage;
    const customerProfit = periodRemaining * (oldPayment - payment);

    return { bankProfit, customerProfit };
}