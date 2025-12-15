import { useReducer, useState } from "react";
import MortgageFormComponent from "./components/mortgage_form";
import MortgageOfferComponent from "./components/mortgage-result";
import { defaultMortgageFormData, initialMortgageData } from "./defaults";
import { InputType } from "./models/input_models";
import formReducer from "./reducers/form_reducers";

const App = (): React.ReactElement => {
	const [formState, setFormState] = useReducer(formReducer, defaultMortgageFormData);
	const [mortgageData, submitMortgage] = useState(initialMortgageData);

	const goToDefaultState = () => {
		submitMortgage(initialMortgageData);
		for (const [key, value] of Object.entries(defaultMortgageFormData)) {
			setFormState({
				type: InputType.NUMBER,
				field: key,
				payload: value,
			});
		}
	};

	const clearMortgageOffer = () => {
		submitMortgage({ ...mortgageData, submitted: false });
	};

	return (
		<div className="App">
			<header className="App-header">Flytta annuitetslån</header>
			<MortgageFormComponent
				formState={formState}
				onChange={setFormState}
				submitMortgage={submitMortgage}
				resetForm={goToDefaultState}
			/>
			{mortgageData.submitted && (
				<MortgageOfferComponent mortgageData={mortgageData} resetApplication={clearMortgageOffer} />
			)}
		</div>
	);
};

export default App;
