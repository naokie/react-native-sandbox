'use strict';

var React = require('react-native');
var {
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
} = React;

var API_URL = 'https://dev-api.anyca.net/api/cars/detail';

var CarDetail = React.createClass({
  getInitialState() {
    return {
      loaded: false
    }
  },
  _urlForQueryAndPage() {
    return (
      API_URL + '' + this.props.car.car_id
    );
  },
  render() {
    var car = this.props.car;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{car.car_name}</Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: 'black',
    backgroundColor: 'pink',
    fontSize: 30,
    margin: 80
  }
});

module.exports = CarDetail;
