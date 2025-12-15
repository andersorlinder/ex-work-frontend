import type React from "react";
import { maxInterest, maxMortgageAmount, maxTotalPeriod, minMortgageAmount, minTotalPeriod } from "../defaults";
import { calculateMonthlyPayment } from "../functions/calculations";
import { type InputAction, InputType } from "../models/input_models";
import type { MortgageData, MortgageFormData } from "../models/mortgage_models";

interface MortgageFormProps {
	formState: MortgageFormData;
	onChange: (InputState: InputAction) => void;
	submitMortgage: (mortgageData: MortgageData) => void;
	resetForm: () => void;
}

const MortgageFormComponent = (props: MortgageFormProps): JSX.Element => {
	const { formState } = props;
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		props.onChange({
			type: InputType.NUMBER,
			field: event.target.name,
			payload: event.target.value,
		});
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		const mortgageData: MortgageData = {
			mortgage: formState.mortgage,
			payment: 0,
			interest: formState.interest,
			periodRemaining: formState.periodTotal,
			submitted: true,
		};
		mortgageData.payment = calculateMonthlyPayment(mortgageData);
		mortgageData.periodRemaining = formState.periodTotal - formState.periodPaidOff;

		props.submitMortgage(mortgageData);
	};

	return (
		<div className="container mortgage-form">
			<form name="form-container" onSubmit={handleSubmit}>
				<label>
					<p>Ursprungligt lån:</p>
					<input
						type="number"
						name="mortgage"
						value={formState.mortgage.toString()}
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
						value={formState.interest.toString()}
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
						value={formState.periodTotal.toString()}
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
						value={formState.periodPaidOff.toString()}
						max={formState.periodTotal - 3}
						min={0}
						onChange={handleChange}
						required
					></input>
					<div className="input-unit-box">mån</div>
				</label>
				<button type="submit">Kontrollera</button>
			</form>
			<button type="reset">Återställ</button>
		</div>
	);
};

export default MortgageFormComponent;
