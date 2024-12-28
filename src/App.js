import React, { useState, useEffect } from "react";

function App() {
  const [prediction, setPrediction] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(null);

  useEffect(() => {
    const fetchPrediction = async () => {
      try {
        const response = await fetch("http://localhost:5000/predict");
        if (!response.ok) {
          throw new Error("Failed to fetch prediction");
        }
        const data = await response.json();
        setPrediction(data.prediction);
        setCurrentPrice(data.current_price);
      } catch (error) {
        console.error("Error fetching prediction:", error);
      }
    };

    fetchPrediction();
    const interval = setInterval(fetchPrediction, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>BNB Price Prediction</h1>
      {currentPrice !== null && prediction !== null ? (
        <>
          <p>Current Price: ${currentPrice.toFixed(2)}</p>
          <p>Predicted Price: ${prediction.toFixed(2)}</p>
        </>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}

export default App;
