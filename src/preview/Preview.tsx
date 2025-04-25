import { Feature, Polygon } from "geojson";
import styles from "./Preview.module.css";

interface Props {
  geojson: Feature<Polygon> | undefined;
}

export const Preview = ({ geojson }: Props) => {
  return (
    <pre className={styles.preview}>
      <code>
        {geojson ? JSON.stringify(geojson, null, 2) : "No geojson selected"}
      </code>
    </pre>
  );
};
