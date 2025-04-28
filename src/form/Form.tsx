import { useState } from "react";
import styles from "./Form.module.css";
import nofeature from "../fixtures/nofeature.json";
import linestring from "../fixtures/linestring.json";
import valid from "../fixtures/valid.json";
import multi from "../fixtures/multi.json";
import intersecting from "../fixtures/intersecting.json";
import { Feature, Polygon } from "geojson";

const options = [
  { name: "nofeature", label: "Not a feature" },
  { name: "linestring", label: "Linestring" },
  { name: "valid", label: "Valid polygon" },
  { name: "multi", label: "Intersecting polygons" },
  { name: "intersecting", label: "Self-intersecting polygon" },
];

const fixtures = {
  nofeature,
  linestring,
  valid,
  multi,
  intersecting,
};

interface Props {
  setGeojson: (geojson: Feature<Polygon>) => void;
}

export const Form = ({ setGeojson }: Props) => {
  const [selection, setSelection] = useState("nofeature");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelection(event.target.id);
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
              name="geojson"
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
