import styles from "./App.module.css";
import { Form } from "./form";

export function App() {
  return (
    <div className={styles.wrapper}>
      <h1>Geojson Validator</h1>
      <Form />
    </div>
  );
}
