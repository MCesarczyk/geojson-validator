import { useState } from "react";
import { Feature, Polygon } from "geojson";
import styles from "./App.module.css";
import { Form } from "./form";
import { Preview } from "./preview";

export function App() {
  const [geojson, setGeojson] = useState<Feature<Polygon>>();

  return (
    <div className={styles.wrapper}>
      <h1>Geojson Validator</h1>
      <main className={styles.main}>
        <Form {...{ setGeojson }} />
        <Preview {...{ geojson }} />
      </main>
    </div>
  );
}
