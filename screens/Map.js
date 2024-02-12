import { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'

export default function Map(props) {
const [pin, setPin] = useState(null)


useEffect(() => {
  (async()=> {
    GetUserLocation()
  })()
}, [])

const showPin = (e) => {
    const coords = e.nativeEvent.coordinate
    setPin(coords)
}

  return (
   <MapView
   style={styles.map}
   region={props.location}
   mapType='standard'
   userInterfaceStyle='default'
   onLongPress={showPin}
   showsUserLocation={true}
   >
    {pin &&
    <Marker 
    title='Paikka'
    coordinate={{latitude: pin.latitude, longitude: pin.longitude}}
    />
    }
   </MapView>

  )
}

const styles = StyleSheet.create({

    map: {
        height: '100%',
        width: '100%'
    }
});