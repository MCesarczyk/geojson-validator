import { useState } from "react";
import styles from "./Form.module.css";

const options = [
  { name: "valid", label: "Valid" },
  { name: "multi", label: "Intersecting polygons" },
  { name: "intersecting", label: "Self-intersecting polygon" },
];

export const Form = () => {
  const [selection, setSelection] = useState("valid");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelection(event.target.name);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted with selection:", selection);
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
