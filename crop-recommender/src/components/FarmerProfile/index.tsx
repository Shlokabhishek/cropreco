import React, { useState } from "react";
import { recommend } from "../../services/recommender";

export default function FarmerProfile({ mergedDf }: { mergedDf: any }) {
  const [state, setState] = useState("");
  const [area, setArea] = useState<number>(1);
  const [soilType, setSoilType] = useState("");
  const [budget, setBudget] = useState<number>(50000);
  const [season, setSeason] = useState<string>("");
  const [results, setResults] = useState<any[]>([]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mergedDf) return;
    const recs = await recommend(mergedDf, { state, area, soilType, budget, season });
    setResults(recs.values);
  };

  return (
    <div className="card">
      <h2>Farmer profile</h2>
      <form onSubmit={onSubmit} className="grid">
        <label>
          State
          <input value={state} onChange={e => setState(e.target.value)} />
        </label>
        <label>
          Area (hectares)
          <input type="number" value={area} onChange={e => setArea(Number(e.target.value))} />
        </label>
        <label>
          Soil type
          <input value={soilType} onChange={e => setSoilType(e.target.value)} />
        </label>
        <label>
          Budget (₹)
          <input type="number" value={budget} onChange={e => setBudget(Number(e.target.value))} />
        </label>
        <label>
          Season
          <input value={season} onChange={e => setSeason(e.target.value)} />
        </label>
        <button type="submit">Get recommendations</button>
      </form>

      <div className="results">
        {results.map((row, idx) => (
          <div key={idx} className="crop-card">
            <h3>{row[row.indexOf("Crop")] ?? row[0]}</h3>
            <p><strong>Yield:</strong> {row[row.indexOf("Yield")]}</p>
            <p><strong>Fertilizer:</strong> {row[row.indexOf("Fertilizer")]}</p>
            <p><strong>Estimated cost:</strong> ₹{row[row.indexOf("Estimated_Cost")]}</p>
            <p><strong>Market price:</strong> ₹{row[row.indexOf("Price")]}</p>
            <p><strong>Score:</strong> {row[row.indexOf("Final_Score")]?.toFixed?.(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}