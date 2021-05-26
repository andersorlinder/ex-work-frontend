import { noOffer } from "../defaults";
import { getMortgageOffer } from "../functions/calculations";
import { MortgageData } from "../models/mortgage";
import ContactFormComponent from "./contactForm";
import { ErrorText } from "./errorText";

interface MortgageResultProps {
    mortgageData?: MortgageData;
}

const MortgageOfferComponent = (props: MortgageResultProps) => {
    const { mortgageData } = props;
    if (!mortgageData) {
        return null;
    }

    const mortgageOffer = getMortgageOffer(mortgageData);

    return mortgageOffer.newPayment ? (
        <div className="container">
            <h4>Grattis, vi kan erbjuda dig ett bättre lån!</h4>
            <p>Ny annuitet: <strong>{mortgageOffer.newPayment} kr</strong></p>
            <p>Total vinst: <strong>{mortgageOffer.fullProfit} kr</strong></p>
            <p>Ny ränta: <strong>{mortgageOffer.newInterest}%</strong></p>
            <p>Kvarvarande lånebelopp: <strong>{mortgageOffer.mortgage} kr</strong></p>
            <ContactFormComponent
                givenOffer={mortgageOffer}
            ></ContactFormComponent>
        </div>
    ): (
        <div>
            <ErrorText label={noOffer}></ErrorText>
            <p>Kvarvarande lånebelopp: <strong>{mortgageOffer.mortgage} kr</strong></p>
        </div>
    )
}

export default MortgageOfferComponent;