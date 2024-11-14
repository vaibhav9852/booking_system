import { MapContainer, TileLayer, useMap, Marker , Popup } from 'react-leaflet' 
import "leaflet/dist/leaflet.css";
import { useContext, useEffect, useState } from 'react';
import BookingContext from '../../../context/booking/BookingContext';

const Map = ({coordinates}) => {
 const {mapLocation} = useContext(BookingContext)
 const location = coordinates.length ? coordinates : mapLocation
 const [mapCoordinates,setMapCoordinates] = useState(location)  
 useEffect(() =>{
    setMapCoordinates(mapLocation)
 },[mapLocation]) 
    return(
        <>
        <MapContainer className=' h-96 w-1/2' zoom={9} center={mapCoordinates}  scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={mapCoordinates}>
    <Popup> 
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
</MapContainer>

        </>
    )
}

export default Map 

