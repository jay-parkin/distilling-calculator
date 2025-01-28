import React, { useState } from "react";

import "../../styles/DiluteAlcohol.css";

const DiluteAlcohol = () => {
  const [litresDiluted, setlitresDiluted] = useState("");
  const [alcContent, setAlcContent] = useState("");
  const [desiredStrength, setDesiredStrength] = useState("");
  const [temperature, setTemperature] = useState(""); // Measured Temperature input
  const [amountToAdd, setAmountToAdd] = useState("");

  // Function to handle the calculation
  const handleCalculate = () => {
    // Validate input fields
    if (!litresDiluted || !alcContent || !desiredStrength || !temperature) {
      alert("Please fill in all fields.");
      return;
    }

    // Convert inputs to numeric values
    const litres = parseFloat(litresDiluted);
    const alcoholContent = parseFloat(alcContent); // Alcohol content in ABV %
    const desiredABV = parseFloat(desiredStrength); // Desired ABV %
    const measuredTemperature = parseFloat(temperature); // Measured Temperature in °C

    /* Apply the alcohol density correction factor based on the measured temperature
     * Initial alcohol content (V₀) is measured at 20°C.
     * Termal expansion conefficient (β) of alcohol is 0.00078945 per degree Celsius.
     * Reference temperature is (T₀) 20°C.
     * Target temperature is (T) the measured temperature.
     *
     * Formula: Vₜ = V₀ × (1 - β × (T − T₀))
     */

    // Apply the alcohol density correction factor based on the measured temperature
    // The alcohol density correction factor is calculated using the following formula:
    const correctionFactor = 1 - 0.00078945 * (measuredTemperature - 20);
    const correctedAlcoholContent = alcoholContent * correctionFactor; // Correct the alcohol content based on temp

    console.log("correctionFactor:", correctionFactor);
    console.log("Corrected Alcohol Content:", correctedAlcoholContent);

    // Calculate the final volume needed to reach the desired ABV
    // The corrected alcohol content will now be used to calculate the final dilution
    const finalVolume = (correctedAlcoholContent * litres) / desiredABV;

    // Calculate the amount of water to add
    const waterToAdd = finalVolume - litres;

    // Set the result (amount of water to add)
    setAmountToAdd(waterToAdd.toFixed(3)); // Show the result rounded to 3 decimal places
  };

  const handleClear = () => {
    setlitresDiluted("");
    setAlcContent("");
    setDesiredStrength("");
    setTemperature("");
    setAmountToAdd("");
  };

  return (
    <div className="container">
      <h1>Alcohol Dilution Calculator</h1>

      {/* Input for litres to Dilute */}
      <div className="input-group">
        <label>Litres to Dilute:</label>
        <input
          type="number"
          value={litresDiluted}
          onChange={(e) => setlitresDiluted(e.target.value)}
        />
      </div>

      {/* Input for Alcohol Content */}
      <div className="input-group">
        <label>Alcohol Content (ABV %):</label>
        <input
          type="number"
          value={alcContent}
          onChange={(e) => setAlcContent(e.target.value)}
        />
      </div>

      {/* Input for Desired Strength */}
      <div className="input-group">
        <label>Desired Strength (ABV %):</label>
        <input
          type="number"
          value={desiredStrength}
          onChange={(e) => setDesiredStrength(e.target.value)}
        />
      </div>

      {/* Input for Measured Temperature */}
      <div className="input-group">
        <label>Measured Temperature (°C):</label>
        <input
          type="number"
          value={temperature}
          onChange={(e) => setTemperature(e.target.value)}
        />
      </div>

      {/* Result Display */}
      <div className="result">
        <h3>Amount of Water to Add: {amountToAdd} litres</h3>
      </div>

      {/* Buttons for calculation and clearing */}
      <div className="buttons">
        <button onClick={handleClear}>Clear</button>
        <button onClick={handleCalculate}>Calculate</button>

      </div>
    </div>
  );
};

export default DiluteAlcohol;
