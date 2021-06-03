import React from "react";
import {
    maxInterest,
    maxMortgageAmount,
    maxTotalPeriod,
    minMortgageAmount,
    minTotalPeriod,
} from "../defaults";
import { calculateMonthlyPayment } from "../functions/calculations";
import { MortgageData, MortgageFormData } from "../models/mortgageModels";
import { InputType } from "../reducers/formReducers";

interface MortgageFormProps {
    formState: MortgageFormData;
    onChange: React.Dispatch<{ type: InputType, field: string, payload: string}>;
    submitMortgage: (mortgageData: MortgageData) => void;
    resetForm: () => void;
}

const MortgageFormComponent = (props: MortgageFormProps) => {
    const { formState } = props;
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange({
            type: InputType.NUMBER,
            field: event.target.name,
            payload: event.target.value,
        })
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const mortgageData: MortgageData = {
            mortgage: formState.mortgage,
            payment: 0,
            interest: formState.interest,
            periodRemaining: formState.periodTotal,
            submitted: true,
        }
        mortgageData.payment = calculateMonthlyPayment(mortgageData);
        mortgageData.periodRemaining = formState.periodTotal - formState.periodPaidOff

        props.submitMortgage(mortgageData);
    }

    return (
        <div className="container mortgage-form">
            <form name="form-container" onSubmit={handleSubmit}>
                <label>
                    <p>Ursprungligt lån:</p>
                    <input
                        type="number"
                        name="mortgage"
                        value={formState.mortgage}
                        max={maxMortgageAmount}
                        min={minMortgageAmount}
                        onChange={handleChange}
                        required
                    ></input>
                    <div className="input-unit-box">kr</div>
                </label>
                <label>
                    <p>Ränta per år (%):</p>
                    <input 
                        type="number" 
                        name="interest" 
                        value={formState.interest} 
                        max={maxInterest}
                        min={0}
                        step={0.01}
                        onChange={handleChange}
                        required
                    ></input>
                    <div className="input-unit-box">%</div>
                </label>
                <label>
                    <p>Lånets längd (månader):</p>
                    <input 
                        type="number" 
                        name="periodTotal" 
                        value={formState.periodTotal} 
                        max={maxTotalPeriod}
                        min={minTotalPeriod}
                        onChange={handleChange}
                        required
                    ></input>
                    <div className="input-unit-box">mån</div>
                </label>
                <label>
                    <p>Antal betalda månader:</p>
                    <input 
                        type="number" 
                        name="periodPaidOff" 
                        value={formState.periodPaidOff} 
                        max={formState.periodTotal - 3}
                        min={0}
                        onChange={handleChange}
                        required
                    ></input>
                    <div className="input-unit-box">mån</div>
                </label>
                <button type="submit">Kontrollera</button>
            </form>
            <button onClick={props.resetForm}>Återställ</button>
        </div>
    )
}

export default MortgageFormComponent;