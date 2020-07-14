import * as React from 'react';
import 'react-native-gesture-handler';
import { connect } from 'react-redux'
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';

class Profile extends React.Component {
  render() {
    const { username } = this.props
    return (
      <ScrollView style={styles.container}>
        <View style={styles.picture}>
          <Image source={require('../images/person-circle.png')} />
          <Text style={styles.username}>Hi, {username}!</Text>
        </View>

        <View style={styles.box}>
          <View style={styles.socialMedia}>
            <View style={styles.account}>
              <Image style={styles.image} source={require('../images/logo-facebook.png')} />
              <Text style={styles.fontBold}>{username}</Text>
            </View>
            <View style={styles.account}>
              <Image style={styles.image} source={require('../images/logo-instagram.png')} />
              <Text style={styles.fontBold}>@{username}</Text>
            </View>
            <View style={styles.account}>
              <Image style={styles.image} source={require('../images/logo-twitter.png')} />
              <Text style={styles.fontBold}>{username}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  username: state.username,
})

export default connect(mapStateToProps)(Profile)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#14213D'
  },
  picture: {
    alignItems: 'center'
  },
  username: {
    fontSize: 39,
    color: '#FCA311',
    fontWeight: 'bold'
  },
  box: {
    marginHorizontal: 17,
    padding: 16,
    borderRadius: 5,
    marginVertical: 54,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  socialMedia: {
    flexDirection: 'column',
  },
  account: {
    flexDirection: 'row',
    marginVertical: 10
  },
  fontBold: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    marginLeft: 14,
    textAlignVertical: 'center'
  },
})