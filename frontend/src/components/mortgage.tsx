import { useReducer } from "react";
import { MortgageData } from "../Models";
import formReducer, { InputType } from "../reducers";


export const Mortgage = () => {
    const initialFormState: MortgageData = {
        mortgage: 5000,
        interest: 2,
        periodTotal: 60,
        periodDone: 12,
    }
    const [formState, dispatch] = useReducer(formReducer, initialFormState);

    const handleChange = (event: any) => {
        dispatch({
            type: InputType.NUMBER,
            field: event.target.name,
            payload: event.target.value,
        })
        console.log(formState);
    }
    const handleSubmit = (event: any) => {
        event.preventDefault();
        // event.stopPropagation();
        console.log(event);
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
                    ></input>
                </label>
                <label>
                    <p>Ränta (%):</p>
                    <input 
                        type="number" 
                        name="interest" 
                        value={formState.interest} 
                        max={100}
                        min={0}
                        onChange={handleChange}
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
                    ></input>
                </label>
                <label>
                    <p>Månader betalda:</p>
                    <input 
                        type="number" 
                        name="periodDone" 
                        value={formState.periodDone} 
                        max={formState.periodTotal - 1}
                        min={1}
                        onChange={handleChange}
                    ></input>
                </label>
                <button type="submit">Kontrollera</button>
            </form>
        </div>
    )
}