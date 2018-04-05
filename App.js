import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { Constants, Location, Permissions, Svg, MapView } from 'expo';
import '@expo/vector-icons'; // Version can be specified in package.json

export default class App extends Component {
  state = {
    locationResult: null,
    mapRegion: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }
  };

  componentDidMount() {
    //this._getLocationAsync();
    
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        locationResult: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ locationResult: JSON.stringify(location) });
    this.setState({ mapRegion: { latitude: location["coords"]["latitude"], longitude: location["coords"]["longitude"], latitudeDelta: this.state.mapRegion.latitudeDelta, longitudeDelta: this.state.mapRegion.longitudeDelta }});
  };


  _handleTextChange = inputValue => {
    this.setState({ inputValue });
  };

  _handleButtonPress = () => {
    this.setState({ mapRegion: { latitude: location["coords"]["latitude"], longitude: location["coords"]["longitude"], latitudeDelta: this.state.mapRegion.latitudeDelta, longitudeDelta: this.state.mapRegion.longitudeDelta }});
  };

  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Gear Guard
        </Text>

        <Button title="Press me" onPress={this._getLocationAsync} />

        <MapView
          style={{ alignSelf: 'stretch', height: 400 }}
          region={this.state.mapRegion}
          onRegionChange={this._handleMapRegionChange}
        />
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fffff0',
  },
  paragraph: {
    margin: 0,
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
