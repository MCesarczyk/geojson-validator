import { useState } from "react";
import classNames from "classnames";
import styles from "./Form.module.css";
import nofeature from "../fixtures/nofeature.json";
import linestring from "../fixtures/linestring.json";
import valid from "../fixtures/valid.json";
import multi from "../fixtures/multi.json";
import intersecting from "../fixtures/intersecting.json";
import { Feature, Polygon } from "geojson";
import { Dropzone } from "../dropzone";

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
  const [selection, setSelection] = useState<string | undefined>();
  const [uploadedGeojson, setUploadedGeojson] = useState<Feature<Polygon>>();
  const [filename, setFilename] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelection(event.target.id);
  };

  const handleUpload = (payload: {
    file: string | ArrayBuffer;
    name: string;
  }) => {
    const { file, name } = payload;
    try {
      setUploadedGeojson(
        JSON.parse(
          typeof file === "string"
            ? file
            : new TextDecoder().decode(file as ArrayBuffer)
        )
      );
      setFilename(name);
      setError(undefined);
    } catch (error) {
      console.log("Error parsing file:" + error);
      setUploadedGeojson(undefined);
      setFilename(undefined);
      setError("Error parsing file");
    }
  };

  const handleError = (error: string) => {
    setError(error);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selection) {
      setGeojson(
        fixtures[selection as keyof typeof fixtures] as Feature<Polygon>
      );
    }
    if (uploadedGeojson) {
      setGeojson(uploadedGeojson);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <fieldset className={styles.fieldset}>
        <h2>Select sample:</h2>
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
      </fieldset>
      <fieldset
        className={classNames(
          styles.fieldset,
          error ? styles.fieldsetError : undefined
        )}
      >
        <h2>Or paste your own GeoJSON:</h2>
        <Dropzone {...{ handleUpload, handleError, error, filename }} />
      </fieldset>
      <button
        type="submit"
        className={styles.button}
        disabled={!selection && !uploadedGeojson}
      >
        Validate
      </button>
    </form>
  );
};
