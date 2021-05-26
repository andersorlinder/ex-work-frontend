import { useReducer } from "react";
import { defaultMortgageFormData, initialMortgageData } from "../defaults";
import { calculateMonthlyPayment } from "../functions/calculations";
import { MortgageData } from "../models/mortgage";
import formReducer, { InputType } from "../reducers/formReducers";

interface MortgageFormProps {
    submitMortgage: (mortgageData: MortgageData) => void;
}

export interface MortgageFormData {
    mortgage: number;
    payment: number;
    interest: number;
    periodTotal: number;
    periodPaidOff: number;
}

const MortgageFormComponent = (props: MortgageFormProps) => {
    const [formState, dispatch] = useReducer(formReducer, defaultMortgageFormData);

    const handleChange = (event: any) => {
        dispatch({
            type: InputType.NUMBER,
            field: event.target.name,
            payload: event.target.value,
        })
    }

    const handleSubmit = (event: any) => {
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

    const resetForm = () => {
        props.submitMortgage(initialMortgageData)
        
        for (const [key, value] of Object.entries(defaultMortgageFormData)) {
            dispatch({
                type: InputType.NUMBER,
                field: key,
                payload: value,
            })
        }
    }

    return (
        <div>
            <form name="container form-container" onSubmit={handleSubmit}>
                <label>
                    <p>Ursprungligt lån:</p>
                    <input
                        type="number"
                        name="mortgage"
                        value={formState.mortgage}
                        max={250000}
                        min={1000}
                        onChange={handleChange}
                        required
                    ></input>
                </label>
                <label>
                    <p>Ränta per år (%):</p>
                    <input 
                        type="number" 
                        name="interest" 
                        value={formState.interest} 
                        max={100}
                        min={0}
                        step={0.01}
                        onChange={handleChange}
                        required
                    ></input>
                </label>
                <label>
                    <p>Lånets längd (månader):</p>
                    <input 
                        type="number" 
                        name="periodTotal" 
                        value={formState.periodTotal} 
                        max={120}
                        min={6}
                        onChange={handleChange}
                        required
                    ></input>
                </label>
                <label>
                    <p>Antal betalda månader:</p>
                    <input 
                        type="number" 
                        name="periodPaidOff" 
                        value={formState.periodPaidOff} 
                        max={formState.periodTotal}
                        min={1}
                        onChange={handleChange}
                        required
                    ></input>
                </label>
                <button type="submit">Kontrollera</button>
            </form>
            <button onClick={resetForm}>Återställ</button>
        </div>
    )
}

export default MortgageFormComponent;