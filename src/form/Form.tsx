import { useState } from "react";
import styles from "./Form.module.css";
import valid from "../fixtures/valid.json";
import multi from "../fixtures/multi.json";
import intersecting from "../fixtures/intersecting.json";
import { Feature, Polygon } from "geojson";

const options = [
  { name: "valid", label: "Valid" },
  { name: "multi", label: "Intersecting polygons" },
  { name: "intersecting", label: "Self-intersecting polygon" },
];

const fixtures = {
  valid: valid,
  multi: multi,
  intersecting: intersecting,
};

interface Props {
  setGeojson: (geojson: Feature<Polygon>) => void;
}

export const Form = ({ setGeojson }: Props) => {
  const [selection, setSelection] = useState("valid");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelection(event.target.name);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setGeojson(
      fixtures[selection as keyof typeof fixtures] as Feature<Polygon>
    );
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <ul className={styles.list}>
        {options.map((option) => (
          <li key={option.name}>
            <input
              type="radio"
              name={option.name}
              id={option.name}
              checked={selection === option.name}
              onChange={handleChange}
            />
            <label htmlFor={option.name}>{option.label}</label>
          </li>
        ))}
      </ul>
      <button type="submit" className={styles.button}>
        Validate
      </button>
    </form>
  );
};
