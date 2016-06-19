import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.parts}>
          <Text style={styles.welcome}>宣传横幅滚动</Text>
        </View>
        <View style={[styles.parts, styles.row]}>
          <View style={styles.parts}>
            <Text style={styles.welcome}>游戏分类1</Text>
          </View>
          <View style={styles.parts}>
            <Text style={styles.welcome}>游戏分类2</Text>
          </View>
        </View>
        <View style={styles.parts}>
          <View style={[styles.parts, styles.row]}>
            <View style={styles.parts}>
              <Text style={styles.welcome}>充值</Text>
            </View>
            <View style={styles.parts}>
              <Text style={styles.welcome}>兑现</Text>
            </View>
          </View>
          <View style={[styles.parts, styles.row]}>
            <View style={styles.parts}>
              <Text style={styles.welcome}>转换</Text>
            </View>
            <View style={styles.parts}>
              <Text style={styles.welcome}>查询</Text>
            </View>
          </View>
        </View>
        <View style={[styles.parts, styles.row]}>
          <View style={styles.parts}>
            <Text style={styles.welcome}>个人信息</Text>
          </View>
          <View style={styles.parts}>
            <Text style={styles.welcome}>游戏账户</Text>
          </View>
          <View style={styles.parts}>
            <Text style={styles.welcome}>其他消息</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  parts: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    // flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'red'
  },
  row: {
    flexDirection: 'row'
  }
});

export default App;
