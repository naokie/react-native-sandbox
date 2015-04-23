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
      data: {},
      loaded: false
    }
  },
  componentDidMount: function() {
    this.fetchData();
  },
  _urlForQueryAndPage() {
    return (
      API_URL + '?car_id=' + this.props.car.car_id
    );
  },
  fetchData: function() {
    fetch(this._urlForQueryAndPage())
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData.car_data);
        this.setState({
          data: responseData.car_data,
          loaded: true
        });
      })
      .done()
  },
  render() {
    var car = this.state.data;
    return (
      <View style={styles.container} id={car.car_id}>
        <Text style={styles.text}>{car.model_name}</Text>
        <Text style={styles.text}>{car.maker_name}</Text>
        <Image source={{uri: car.image_url}} style={[{width: 320, height: 320}]} />
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
    margin: 20
  }
});

module.exports = CarDetail;
