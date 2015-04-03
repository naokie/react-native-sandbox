'use strict';

var React = require('react-native');
var {
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} = React;
var Dimensions = require('Dimensions');
var CarDetail = require('./CarDetail');

var API_URL = 'https://dev-api.anyca.net/api/cars/list';
var REQUEST_URL = API_URL;
var IMAGE_BASE_URL = 'http://cdn-image.pf.dena.com/48a571359bb41ecdd6557088c3b4cab6a588dbfa/1/';

var CarSearchList = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      loaded: false
    }
  },
  componentDidMount: function() {
    this.fetchData();
  },
  fetchData: function() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.list),
          loaded: true
        });
      })
      .done()
  },
  render: function() {
    var {
      width,
      height,
      scale
    } = Dimensions.get('window');
    this.state.width = width;

    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (
      <ListView dataSource={this.state.dataSource} renderRow={this.renderCar} style={styles.listView} />
    );
  },
  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading movies...
        </Text>
      </View>
    );
  },
  rowPressed: function(car) {
    this.props.navigator.push({
      title: car.car_name,
      component: CarDetail,
      passProps: {car}
    });
  },
  renderCar: function(car) {
    var addFigure = function(str) {
      var num = new String(str).replace(/,/g, "");
      while(num != (num = num.replace(/^(-?\d+)(\d{3})/, "$1,$2")));
      return num;
    };
    var price = '¥' + addFigure(car.price);
    return (
      <TouchableHighlight onPress={() => this.rowPressed(car)}>
        <View style={styles.row}>
          <Image source={{uri: IMAGE_BASE_URL + car.image_url}} style={[styles.thumbnail, {width: this.state.width}]}>
            <View style={[styles.bar, {flexDirection: 'row'}]}>
              <View style={styles.leftContainer}>
                <Text style={styles.name}>{car.car_name}</Text>
                <Text style={styles.maker}>{car.maker}</Text>
                <Text style={styles.station}>{car.station_name}</Text>
              </View>
              <View style={styles.rightContainer}>
                <Text style={styles.price}>{price}</Text>
              </View>
            </View>
          </Image>
        </View>
      </TouchableHighlight>
    );
  }
});

var styles = StyleSheet.create({
  row: {
    height: 129,
    borderBottomColor: '#d2d2d2',
    borderBottomWidth: 1,
    backgroundColor: '#f5f5f5'
  },
  thumbnail: {
    width: 320,
    height: 129,
    backgroundColor: 'transparent'
  },
  bar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 39,
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },
  leftContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  rightContainer: {
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 172, 196, 0.5)'
  },
  name: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
    lineHeight: 15
  },
  maker: {
    color: '#ffffff',
    fontSize: 12,
    lineHeight: 12
  },
  station: {
    position: 'absolute',
    right: 10,
    bottom: 5,
    color: '#ffffff',
    fontSize: 10
  },
  price: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold'
  }
});

module.exports = CarSearchList;
