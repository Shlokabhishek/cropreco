import * as dfd from "danfojs";

export async function loadDatasets() {
  const cropDf = await dfd.readCSV("/data/crop_dataset.csv");
  const soilDf = await dfd.readCSV("/data/soil_dataset.csv");
  return { cropDf, soilDf };
}