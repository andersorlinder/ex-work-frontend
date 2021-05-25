import { interestOffer, profitThreshold } from "../defaults";
import { MortgageData, MortgageOffer } from "../Models/mortgage";

export function getMortgageOffer(
    initialMortgageData: MortgageData
): MortgageOffer | void {
    const remainingMortgageAmount = calculateRemainingMortgage(initialMortgageData);
    if (initialMortgageData.interest <= 3.5) {
        return { mortgage: remainingMortgageAmount };
    }
 
    const newMortgageData: MortgageData = {
        ...initialMortgageData,
        mortgage: remainingMortgageAmount,
        interest: interestOffer,
    }
    newMortgageData.payment = calculateMortgageWithInterest(newMortgageData)
    
    const profits = calculateProfits(newMortgageData, initialMortgageData.payment)

    if (profits.bankProfit < profitThreshold) {
        return { mortgage: remainingMortgageAmount };
    }

    const mortgageOffer: MortgageOffer = {
        mortgage: newMortgageData.mortgage,
        newPayment: newMortgageData.payment,
        newInterest: newMortgageData.interest,
        fullProfit: profits.customerProfit,
    }

    return mortgageOffer;
}

function getRemainingPeriod(mortgageData: MortgageData) {
    return mortgageData.periodTotal - mortgageData.periodPaidOff;
}

function calculateRemainingMortgage(mortgageData: MortgageData): number {
    const {
        mortgage,
        payment,
        interest,
        periodTotal,
        periodPaidOff,
        periodRemaining,
    } = mortgageData;
    const normalizedMonthlyInterest = interest / 100;
    const changeFactor = 1 + normalizedMonthlyInterest;
    const remainingPeriod = periodTotal - periodPaidOff;
    
    const remainingMortgage = Math.round(payment * (1 - Math.pow(changeFactor, remainingPeriod * -1)) / normalizedMonthlyInterest);
    return remainingMortgage;
}

function calculateMortgageWithInterest(mortgageData: MortgageData): number {
    const {
        mortgage,
        interest,
        periodTotal,
        periodPaidOff,
    } = mortgageData;
    const normalizedMonthlyInterest = interest / 100;
    const changeFactor = 1 + normalizedMonthlyInterest;
    const remainingPeriod = periodTotal - periodPaidOff;

    
    const payment = Math.round(mortgage * normalizedMonthlyInterest / (1 - Math.pow(changeFactor, remainingPeriod * -1)));

    return payment;
}

function calculateProfits(newMortgageData: MortgageData, oldPayment: number): { bankProfit: number, customerProfit: number} {
    const {
        mortgage,
        payment,
        periodTotal,
        periodPaidOff,
    } = newMortgageData;
    const remainingPeriod = periodTotal - periodPaidOff;
    const bankProfit = remainingPeriod * payment - mortgage;
    const customerProfit = remainingPeriod * (oldPayment - payment);

    return { bankProfit, customerProfit };
}