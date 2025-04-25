import { useEffect, useState } from "react";
import { Feature, Polygon } from "geojson";
import validate from "geojson-validation";
import styles from "./App.module.css";
import { Form } from "./form";
import { Preview } from "./preview";
import { Result } from "./result";

const isPolygon = (testedObject: Feature) => {
  try {
    validate.isPolygon(testedObject);
    return testedObject.geometry && testedObject.geometry.type === "Polygon";
  } catch (error) {
    console.log("Error validating GeoJSON:", error);
    return false;
  }
};

export function App() {
  const [geojson, setGeojson] = useState<Feature<Polygon>>();
  const [message, setMessage] = useState<string>("");
  const [valid, setValid] = useState<boolean>(false);

  useEffect(() => {
    if (geojson && isPolygon(geojson)) {
      setMessage("The GeoJSON object is a polygon.");
      setValid(true);
    } else {
      setMessage("The GeoJSON object is not a polygon.");
      setValid(false);
    }
  }, [geojson]);

  return (
    <div className={styles.wrapper}>
      <h1>Geojson Validator</h1>
      <main className={styles.main}>
        <Form {...{ setGeojson }} />
        <div>
          <Result
            message={geojson ? message : undefined}
            verdict={geojson && valid ? "valid" : "invalid"}
          />
          <Preview {...{ geojson }} />
        </div>
      </main>
    </div>
  );
}
