import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import styles from "./Map.module.css";

export const Map = () => {
  return (
    <MapContainer className={styles.mapContainer} center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={[51.505, -0.09]}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  </MapContainer>
  )
}
