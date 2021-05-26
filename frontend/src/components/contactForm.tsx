import { useReducer } from "react";
import { ContactData } from "../models/contact";
import { OfferData } from "../models/mortgage";
import formReducer, { InputType } from "../reducers/formReducers";

interface ContactFormProps {
    givenOffer?: OfferData;
}

const ContactFormComponent = (props: ContactFormProps) => {
    const initialFormState: ContactData = {
        name: "",
        address: "",
        zipCode: null,
        city: "",
        phoneNumber: null,
        email: "",
    }
    const [formState, dispatch] = useReducer(formReducer, initialFormState);

    const handleChange = (event: any) => {
        dispatch({
            type: InputType.TEXT,   
            field: event.target.name,
            payload: event.target.value,
        })
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
    }

    return (
        <div className="container form-container">
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Namn:</p>
                    <input
                        type="text"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                    ></input>
                </label>
                <label>
                    <p>Adress:</p>
                    <input 
                        type="text" 
                        name="address" 
                        value={formState.address} 
                        onChange={handleChange}
                        required
                    ></input>
                </label>
                <label>
                    <p>Postnummer:</p>
                    <input 
                        type="number"
                        name="zipCode"
                        value={formState.zipCode || ""}
                        max={99999}
                        min={10000}
                        onChange={handleChange}
                        required
                    ></input>
                </label>
                <label>
                    <p>Postort:</p>
                    <input 
                        type="text" 
                        name="city" 
                        value={formState.city} 
                        onChange={handleChange}
                        required
                    ></input>
                </label>
                <label>
                    <p>Telefonnummer:</p>
                    <input 
                        type="tel"
                        name="phoneNumber"
                        value={formState.phoneNumber || ""}
                        onChange={handleChange}
                        required
                    ></input>
                </label>
                <label>
                    <p>Epost:</p>
                    <input 
                        type="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                    ></input>
                </label>
                <button type="submit">Ansök</button>
            </form>
        </div>
    )
}

export default ContactFormComponent;