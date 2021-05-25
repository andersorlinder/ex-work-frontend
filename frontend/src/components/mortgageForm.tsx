import { useReducer } from "react";
import { MortgageData } from "../Models/mortgage";
import formReducer, { InputType } from "../reducers/formReducers";

interface MortgageFormProps {
    submitMortgage: (mortgageData: MortgageData) => void;
}

export const MortgageForm = (props: MortgageFormProps) => {
    const initialFormState: MortgageData = {
        mortgage: 10000,
        payment: 500,
        interest: 2,
        periodTotal: 60,
        periodPaidOff: 12,
    }
    const [formState, dispatch] = useReducer(formReducer, initialFormState);

    const handleChange = (event: any) => {
        dispatch({
            type: InputType.NUMBER,
            field: event.target.name,
            payload: event.target.value,
        })
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();

        props.submitMortgage(formState);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
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
                    <p>Månadsinbetalning:</p>
                    <input
                        type="number"
                        name="payment"
                        value={formState.payment}
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
        </div>
    )
}