/* eslint-disable @typescript-eslint/no-unused-expressions */
import { type Feature, type Polygon } from "geojson";
import { booleanIntersects } from "@turf/boolean-intersects";
import { booleanCrosses } from "@turf/boolean-crosses";
// import { booleanEqual } from "@turf/boolean-equal";
import { lineString } from "@turf/turf";

export const validatePolygon = (feature: Feature<Polygon>) => {
  const polygon = feature ? (feature)?.geometry?.coordinates[0] : null;
  const edges =
    polygon &&
    polygon.map((vertex, index) => {
      const nextIndex = (index + 1) % polygon.length;
      return [vertex, polygon[nextIndex]];
    });

  edges &&
    edges.forEach((edge) => {
      edges.forEach((localEdge) => {
        // if (booleanEqual(lineString(edge), lineString(localEdge))) {
        //   return;
        // }

        let endsTouching = false;

        localEdge.forEach((localVertex) => {
          edge.forEach((edgeVertex) => {
            if (localVertex[0] === edgeVertex[0] && localVertex[1] === edgeVertex[1]) {
              endsTouching = true;
            }
          });
        });
        if (endsTouching) {
          console.log("Ends are touching", edge, localEdge);
          return;
        }

        const result = booleanIntersects(
          lineString(edge),
          lineString(localEdge)
        ) || booleanCrosses(
          lineString(edge),
          lineString(localEdge)
        );

        console.log(result);
        result && console.log("Intersection kurła!", edge, localEdge);
      });
    });
};
