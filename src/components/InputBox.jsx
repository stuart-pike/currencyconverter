// Import React and other necessary dependencies
import { useEffect } from "react";
import PropTypes from "prop-types";
import { useId } from "react-id-generator";

// InputBox component definition
function InputBox({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectedCurrency = "usd",
  amountDisabled = false, // Default value is set to false
  currencyDisabled = false,
  className = "",
}) {
  const id = useId();

  // useEffect to handle changes in amountDisabled and setAmountDisabled
  useEffect(() => {
    // Logic to handle changes in amountDisabled if needed
    // For example, you might want to perform some side effect when amountDisabled changes
    // This can be useful for enabling/disabling input fields dynamically
    console.log("amountDisabled changed:", amountDisabled);
  }, [amountDisabled]);

  return (
    <div className={`bg-slate-200 p-2 rounded-md text-sm flex ${className}`}>
      <div className="w-1/2">
        <label htmlFor={id} className="text-black/80 mb-2 inline-block">
          {label}
        </label>
        <input
          id={id}
          type="number"
          className="outline-none w-full bg-transparent py-1.5"
          placeholder="0"
          disabled={
            amountDisabled
          } /* Set the disabled attribute based on amountDisabled */
          value={amount}
          onChange={(e) =>
            onAmountChange && onAmountChange(Number(e.target.value))
          }
        />
      </div>
      <div className="w-1/2 flex flex-wrap justify-end text-right">
        <p className="text-black/80 mb-2 w-full">Currency Type</p>
        <select
          className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
          value={selectedCurrency}
          onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
          disabled={currencyDisabled}
        >
          {currencyOptions.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

// Prop types for InputBox component
InputBox.propTypes = {
  label: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  onAmountChange: PropTypes.func,
  onCurrencyChange: PropTypes.func,
  currencyOptions: PropTypes.arrayOf(PropTypes.string),
  selectedCurrency: PropTypes.string,
  amountDisabled: PropTypes.bool,
  currencyDisabled: PropTypes.bool,
  className: PropTypes.string,
};

// Export the InputBox component
export default InputBox;
