import { getMortgageOffer } from "../functions/calculations";
import type { MortgageData } from "../models/mortgage_models";
import ContactFormComponent from "./contact_form";
import StatusText, { StatusType } from "./status_text";

interface MortgageResultProps {
	mortgageData?: MortgageData;
	resetApplication: () => void;
}

const MortgageOfferComponent = (props: MortgageResultProps): React.ReactElement | null => {
	const { mortgageData } = props;
	if (!mortgageData) {
		return null;
	}

	const mortgageOffer = getMortgageOffer(mortgageData);

	return mortgageOffer.payment ? (
		<div className="container">
			<StatusText status={StatusType.APPROVED} label="Grattis, vi kan erbjuda dig ett bättre lån!" />
			<div className="results">
				<p>
					Ny månadsinbetalning: <strong>{mortgageOffer.payment} kr</strong>
				</p>
				<p>
					Total vinst: <strong>{mortgageOffer.customerProfit} kr</strong>
				</p>
				<p>
					Ny ränta: <strong>{mortgageOffer.interest}%</strong>
				</p>
				<p>
					Kvarvarande lånebelopp: <strong>{mortgageOffer.mortgage} kr</strong>
				</p>
			</div>
			<ContactFormComponent givenOffer={mortgageOffer} onSubmit={props.resetApplication} />
		</div>
	) : (
		<div>
			<StatusText status={StatusType.FAIL} label="Tyvärr, vi kan inte erbjuda er ett låneerbjudande." />
			<div className="results">
				<p>
					Kvarvarande lånebelopp: <strong>{mortgageOffer.mortgage} kr</strong>
				</p>
			</div>
		</div>
	);
};

export default MortgageOfferComponent;
