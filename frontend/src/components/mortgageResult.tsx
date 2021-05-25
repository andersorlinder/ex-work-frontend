import { MortgageData } from "../Models/mortgage";

interface MortgageResultProps {
    mortgageData: MortgageData;
    mortgageOffer: (displayOffer: boolean) => void;
}

export const MortgageResult = (props: MortgageResultProps) => {
    const { mortgageData } = props;

    if (!mortgageData) {
        return null;
    }

    
    return (
        <div>
            <p>Info om lån</p>
            <p>Låneerbjudande eller inte</p>
        </div>
    )
}