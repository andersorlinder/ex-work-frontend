import React from "react";
import { useReducer } from "react";
import { apiURL } from "../defaults";
import { ApplicationData, ContactFormData } from "../models/contact";
import { MortgageOfferData } from "../models/mortgage";
import formReducer, { InputType } from "../reducers/formReducers";
import postRequest from "../server/http_request";

interface ContactFormProps {
    givenOffer: MortgageOfferData;
}

const ContactFormComponent = (props: ContactFormProps) => {
    const statusRef = React.createRef<HTMLParagraphElement>();
    const initialFormState: ContactFormData = {
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
        const postObject: ApplicationData = { ...formState, ...props.givenOffer }
        const jsonString = JSON.stringify(postObject);
        postRequest(apiURL, jsonString)
    }

    return (
        <div className="container contact-form">
            <h4><u>Ansökningsformulär</u></h4>
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
            <p ref={statusRef}></p>
        </div>
    )
}

export default ContactFormComponent;