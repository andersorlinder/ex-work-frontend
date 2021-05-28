import { noOfferMessage, offerApprovedMessage } from "../defaults";
import { getMortgageOffer } from "../functions/calculations";
import { MortgageData } from "../models/mortgage";
import ContactFormComponent from "./contactForm";
import StatusText, { StatusType } from "./statusText";

interface MortgageResultProps {
    mortgageData?: MortgageData;
}

const MortgageOfferComponent = (props: MortgageResultProps) => {
    const { mortgageData } = props;
    if (!mortgageData) {
        return null;
    }

    const mortgageOffer = getMortgageOffer(mortgageData);

    return mortgageOffer.payment ? (
        <div className="container">
            <StatusText status={StatusType.APPROVED} label={offerApprovedMessage} />
            <div className="results">
                <p>Ny månadsinbetalning: <strong>{mortgageOffer.payment} kr</strong></p>
                <p>Total vinst: <strong>{mortgageOffer.customerProfit} kr</strong></p>
                <p>Ny ränta: <strong>{mortgageOffer.interest}%</strong></p>
                <p>Kvarvarande lånebelopp: <strong>{mortgageOffer.mortgage} kr</strong></p>
            </div>
            <ContactFormComponent givenOffer={mortgageOffer} />
        </div>
    ): (
        <div>
            <StatusText status={StatusType.FAIL} label={noOfferMessage} />
            <div className="results">
                <p>Kvarvarande lånebelopp: <strong>{mortgageOffer.mortgage} kr</strong></p>
            </div>
        </div>
    )
}

export default MortgageOfferComponent;