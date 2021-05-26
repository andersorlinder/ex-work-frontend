import { useState } from 'react';
import MortgageFormComponent from './components/mortgageForm';
import MortgageOfferComponent from './components/mortgageResult';
import { initialMortgageData } from './defaults';

function App() {
  const [mortgageData, submitMortgage] = useState(initialMortgageData);
  
  return (
    <div className="App">
      <header className="App-header">
        Flytta annuitetslån
      </header>
      <MortgageFormComponent
        submitMortgage={submitMortgage}
      ></MortgageFormComponent>
      {mortgageData.submitted && (
        <MortgageOfferComponent
          mortgageData={mortgageData}
        ></MortgageOfferComponent>
      )}
    </div>
  );
}

export default App;
