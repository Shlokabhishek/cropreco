import * as dfd from "danfojs";

export function preprocess(cropDf: dfd.DataFrame, soilDf: dfd.DataFrame) {
  // Normalize numeric columns
  const numericCols = ["Area", "Production", "Annual_Rainfall", "Fertilizer", "Yield", "Price"];
  numericCols.forEach(col => {
    const colSeries = cropDf[col] as dfd.Series;
    const min = colSeries.min();
    const max = colSeries.max();
    const vals = colSeries.values as any[];
    const norm = vals.map((v: any) => (max - min ? (Number(v) - min) / (max - min) : 0));
    cropDf.addColumn(`${col}_norm`, norm);
  });

  // Explode Suitable_Crops into rows
  const exploded: any[] = [];
  const soilValues = soilDf.values as any[][];
  soilValues.forEach(row => {
    const [soilType, soilQuality, suitableCrops, fertRange] = row;
    const crops = String(suitableCrops).split(",").map(c => c.trim());
    crops.forEach(crop => {
      exploded.push({ Soil_Type: soilType, Soil_Quality: soilQuality, Crop: crop, Fert_Range: fertRange });
    });
  });
  const soilExploded = new dfd.DataFrame(exploded);

  // Merge on Crop
  const merged = dfd.merge({ left: cropDf, right: soilExploded, on: ["Crop"], how: "inner" }) as dfd.DataFrame;

  // Soil suitability score
  const soilScore = Array(merged.shape[0]).fill(0.5);
  merged.addColumn("Soil_Score", soilScore);

  // Market score
  const prodVals = merged["Production_norm"].values as number[];
  const yieldVals = merged["Yield_norm"].values as number[];
  const priceVals = (merged["Price_norm"]?.values ?? []) as number[];
  const marketScore = prodVals.map((p: number, i: number) => {
    const y = yieldVals[i] ?? 0;
    const pr = priceVals[i] ?? 0;
    return 0.5 * p + 0.4 * y + 0.1 * pr;
  });
  merged.addColumn("Market_Score", marketScore);

  return merged;
}