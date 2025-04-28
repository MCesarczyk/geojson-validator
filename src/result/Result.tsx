import classNames from "classnames";
import styles from "./Result.module.css";

interface Props {
  message: string | undefined;
  verdict?: 'valid' | 'invalid';
}

export const Result = ({ message, verdict }: Props) => {
  return (
    <h3 className={classNames(styles.message, message && verdict ? [styles[verdict]] : undefined )}>
      {message || "No GeoJSON object provided."}
    </h3>
  );
};
