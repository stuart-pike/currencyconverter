//import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import { InputBox } from "./components/index";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  const swap = () => {
    setFrom(to);
    setTo(from);

    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  useEffect(() => {
    // Log the updated values after the state updates have been applied
    console.log(`After swap convertedAmount: ${convertedAmount}`);
    console.log(`After swap amount: ${amount}`);
  }, [convertedAmount, amount]);

  const convert = () => {
    // Calculate the converted amount with precision
    const result = amount * currencyInfo[to];

    // Limit the result to 2 decimal places
    const roundedResult = Number(result.toFixed(2));

    // Update the state with the rounded result
    setConvertedAmount(roundedResult);
  };

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(/forex.jpg)`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto rounded-lg p-10 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="from"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)}
                onAmountChange={(amount) => setAmount(amount)}
                selectedCurrency={from}
              />
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-full bg-blue-600 text-white px-2 py-0.5">
              <button onClick={swap}>Swap</button>
            </div>
            <div className="w-full mb-1">
              <InputBox
                label="to"
                currencyOptions={options}
                amount={convertedAmount}
                onCurrencyChange={(currency) => setTo(currency)}
                selectedCurrency={to}
                amountDisabled
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
      <div className="fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2">
        <a className="text-white text-xs" href="http://www.freepik.com">
          Image designed by starline / Freepik
        </a>
      </div>
    </div>
  );
}

export default App;
