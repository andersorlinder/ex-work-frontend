import { interestOffer, profitThreshold } from "../defaults";
import { MortgageData, MortgageOfferData } from "../models/mortgage_models";

export function getMortgageOffer(
    initialMortgageData: MortgageData
): MortgageOfferData {
    const remainingMortgageAmount =
        calculateRemainingMortgage(initialMortgageData);
    if (initialMortgageData.interest <= interestOffer) {
        return { mortgage: remainingMortgageAmount };
    }

    const newMortgageData: MortgageData = {
        ...initialMortgageData,
        mortgage: remainingMortgageAmount,
        interest: interestOffer,
    };
    newMortgageData.payment = calculateMonthlyPayment(newMortgageData);

    const profits = calculateProfits(
        newMortgageData,
        initialMortgageData.payment
    );

    if (profits.bankProfit < profitThreshold) {
        return { mortgage: remainingMortgageAmount };
    }

    const mortgageOffer: MortgageOfferData = {
        mortgage: newMortgageData.mortgage,
        payment: newMortgageData.payment,
        interest: newMortgageData.interest,
        customerProfit: profits.customerProfit,
        bankProfit: profits.bankProfit,
    };

    return mortgageOffer;
}

function calculateRemainingMortgage(mortgageData: MortgageData): number {
    const { payment, interest, periodRemaining } = mortgageData;
    const normalizedMonthlyInterest = interest / 12 / 100;
    const changeFactor = 1 + normalizedMonthlyInterest;

    const remainingMortgage = Math.round(
        (payment * (1 - Math.pow(changeFactor, periodRemaining * -1))) /
            normalizedMonthlyInterest
    );
    return remainingMortgage;
}

export function calculateMonthlyPayment(mortgageData: MortgageData): number {
    const { mortgage, interest, periodRemaining } = mortgageData;
    const normalizedMonthlyInterest = interest / 12 / 100;
    const changeFactor = 1 + normalizedMonthlyInterest;

    const payment = Math.round(
        (mortgage * normalizedMonthlyInterest) /
            (1 - Math.pow(changeFactor, periodRemaining * -1))
    );

    return payment;
}

function calculateProfits(
    newMortgageData: MortgageData,
    oldPayment: number
): { bankProfit: number; customerProfit: number } {
    const { mortgage, payment, periodRemaining } = newMortgageData;

    const bankProfit = periodRemaining * payment - mortgage;
    const customerProfit = periodRemaining * (oldPayment - payment);

    return { bankProfit, customerProfit };
}
