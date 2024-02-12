import { StatusBar } from 'expo-status-bar';
import { Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Map from './screens/Map';
import Constants from 'expo-constants';
import { useState } from 'react';
import * as Location from 'expo-location'
import { PaperProvider } from 'react-native-paper';
import MainAppBar from './components/MainAppBar';
import { Marker } from 'react-native-maps';

const settings = {
  backgroundColor: '#00a484'
}

const icons = {
  location_not_known: 'crosshairs',
  location_searching: 'crosshairs-question',
  location_found: 'crosshairs-gps'
}

export default function App() {

const [icon, setIcon] = useState(icons.location_not_known)
const[location, setLocation] = useState({
  latitude: 65.0800,
  longitude: 25.4800,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
})

const GetUserLocation = async () =>{

  let {status} = await Location.requestForegroundPermissionsAsync()
  
  try {
      if(status !== 'granted'){
          console.log('Geolocation failed')
          return
      }
      const position = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High})
      setLocation({...location,"latitude" : position.coords.latitude, "longitude" : position.coords.longitude})
      setIcon(icons.location_found)
      
  } catch (error) {
      console.log(error)
      setIcon(icons.location_not_known)
  }

}

  return (
<PaperProvider>
  <MainAppBar 
  title="Map"
  backgroundColor={settings.backgroundColor}
  icon={icon}
  GetUserLocation={GetUserLocation}
  />
  <SafeAreaView style={styles.container}>
    <Map location={location}/>
  </SafeAreaView>
  </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Platform.OS === 'android' ? Constants.statusBarHeight: 0
  },
});
