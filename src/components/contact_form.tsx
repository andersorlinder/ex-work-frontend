import React, { useState } from "react";
import { useReducer } from "react";
import { defaultContactFormData, mortgageApplicationApiUrl } from "../defaults";
import { ApplicationData } from "../models/application_models";
import { InputType } from "../models/input_models";
import { MortgageOfferData } from "../models/mortgage_models";
import formReducer from "../reducers/form_reducers";
import postRequest from "../server/http_requests";
import StatusText, { StatusType } from "./status_text";

interface ContactFormProps {
    givenOffer: MortgageOfferData;
    onSubmit: () => void;
}

const ContactFormComponent = (props: ContactFormProps): JSX.Element => {
    const [formState, setFormState] = useReducer(
        formReducer,
        defaultContactFormData
    );
    const [submittedResponse, setResponse] = useState(0);
    const [submitButtonDisabled, disableButton] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({
            type: InputType.TEXT,
            field: event.target.name,
            payload: event.target.value,
        });
    };

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        const applicationData: ApplicationData = {
            ...formState,
            ...props.givenOffer,
        };
        const body = JSON.stringify(applicationData);
        const respons = await postRequest(mortgageApplicationApiUrl, body);
        setResponse(respons);

        if (respons === 200) {
            disableButton(true);
            setTimeout(() => {
                props.onSubmit();
            }, 3000);
        }
    }

    const submitStatus = submittedResponse ? (
        submittedResponse === 200 ? (
            <StatusText
                status={StatusType.APPROVED}
                label="Ansökan registrerad!"
            />
        ) : (
            <StatusText
                status={StatusType.FAIL}
                label="Serverfel, vänligen försök igen"
            />
        )
    ) : null;

    return (
        <div className="container contact-form">
            <h4>
                <u>Ansökningsformulär</u>
            </h4>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Namn:</p>
                    <input
                        type="text"
                        name="name"
                        value={formState.name}
                        onChange={handleInputChange}
                        required
                    ></input>
                </label>
                <label>
                    <p>Adress:</p>
                    <input
                        type="text"
                        name="address"
                        value={formState.address}
                        onChange={handleInputChange}
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
                        onChange={handleInputChange}
                        required
                    ></input>
                </label>
                <label>
                    <p>Postort:</p>
                    <input
                        type="text"
                        name="city"
                        value={formState.city}
                        onChange={handleInputChange}
                        required
                    ></input>
                </label>
                <label>
                    <p>Telefonnummer:</p>
                    <input
                        type="tel"
                        name="phoneNumber"
                        value={formState.phoneNumber || ""}
                        onChange={handleInputChange}
                        required
                    ></input>
                </label>
                <label>
                    <p>Epost:</p>
                    <input
                        type="email"
                        name="email"
                        value={formState.email}
                        onChange={handleInputChange}
                        required
                    ></input>
                </label>
                <button type="submit" disabled={submitButtonDisabled}>
                    Ansök
                </button>
            </form>
            {submitStatus}
        </div>
    );
};

export default ContactFormComponent;
