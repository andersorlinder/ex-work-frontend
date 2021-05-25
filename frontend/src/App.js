import { useState } from 'react';
import { ContactForm } from './components/contactForm';
import { MortgageForm } from './components/mortgageForm';
import { MortgageResult } from './components/mortgageResult';

function App() {
  const [mortageSubmitted, submitMortgage] = useState(null);
  const [contactFormActive, displayContactForm] = useState(false);

  const handleMortgage = (mortgageData) => {
    submitMortgage(mortgageData)
  }

  return (
    <div className="App">
      <header className="App-header">
        Flytta annuitetslån
      </header>
      <MortgageForm
        submitMortgage={handleMortgage}
      ></MortgageForm>
      {mortageSubmitted ?? (
        <MortgageResult
          mortgageData={mortageSubmitted}
          mortgageOffer={displayContactForm}
        ></MortgageResult>
      )}
      {contactFormActive ?? (
        <ContactForm></ContactForm>
      )}
    </div>
  );
}

export default App;
