import React, { useState } from "react";

function CreateVolumeOfAlcohol() {
  const [volume, setVolume] = useState("");
  const [currentAlcohol, setCurrentAlcohol] = useState("");
  const [desiredStrength, setDesiredStrength] = useState("");
  const [temperature, setTemperature] = useState("");
  const [correctedAlcohol, setCorrectedAlcohol] = useState("");
  const [waterToAdd, setWaterToAdd] = useState("");

  const handleCalculate = () => {
    if (!volume || !currentAlcohol || !desiredStrength || !temperature) {
      alert("Please fill all fields");
      return;
    }

    // Convert inputs to numbers
    const vol = parseFloat(volume);
    const currentABV = parseFloat(currentAlcohol);
    const desiredABV = parseFloat(desiredStrength);
    const temp = parseFloat(temperature);

    // Correction Factor based on temperature
    const correctionFactor = 1 + 0.0025 * (temp - 20);
    const correctedAlcoholContent = currentABV * correctionFactor;

    // Calculate amount of pure alcohol and water to add
    const alcAmount = (desiredABV * vol) / correctedAlcoholContent;
    const waterAmount = vol - alcAmount;

    // Update the state with the results
    setCorrectedAlcohol(correctedAlcoholContent.toFixed(3));
    setWaterToAdd(waterAmount.toFixed(3));
  };

  const handleClear = () => {
    setVolume("");
    setCurrentAlcohol("");
    setDesiredStrength("");
    setTemperature("");
    setCorrectedAlcohol("");
    setWaterToAdd("");
  };

  return (
    <div className="container">
      <h1>Alcohol Dilution Calculator</h1>
      <div>
        <label>Volume (liters):</label>
        <input
          type="number"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
        />
      </div>
      <div>
        <label>Current Alcohol Content (ABV %):</label>
        <input
          type="number"
          value={currentAlcohol}
          onChange={(e) => setCurrentAlcohol(e.target.value)}
        />
      </div>
      <div>
        <label>Desired Strength (ABV %):</label>
        <input
          type="number"
          value={desiredStrength}
          onChange={(e) => setDesiredStrength(e.target.value)}
        />
      </div>
      <div>
        <label>Temperature (°C):</label>
        <input
          type="number"
          value={temperature}
          onChange={(e) => setTemperature(e.target.value)}
        />
      </div>

      <button onClick={handleCalculate}>Calculate</button>
      <button onClick={handleClear}>Clear</button>

      <h2>Results:</h2>
      <div>
        <p>Corrected Alcohol Content: {correctedAlcohol}%</p>
        <p>Water to Add: {waterToAdd} liters</p>
      </div>
    </div>
  );
}

export default CreateVolumeOfAlcohol;
