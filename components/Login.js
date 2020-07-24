import * as React from 'react';
import 'react-native-gesture-handler';
import { connect } from 'react-redux'
import { View, StyleSheet, Text, Image, TextInput, TouchableOpacity } from 'react-native';

import { actionCreators } from '../User';

class Login extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
    }
  }

  loginProcess = () => {
    const { dispatch } = this.props
    if (this.state.password == "12345678") {
      let username = this.state.username
      dispatch(actionCreators.login(username))
      this.props.navigation.navigate('Drawer')
      this.props.navigation.reset({
        index: 0,
        routes: [{ name: 'Drawer' }],
      });
    } else {
      alert("Password Salah!")
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logo}>
          <Image source={require('../images/MaAnimeList.png')} />
        </View>

        <Text style={styles.title}>LOGIN</Text>

        <View style={styles.form}>
          <TextInput
            style={styles.formInput}
            placeholder="Username"
            value={this.state.username}
            placeholderTextColor="#888888"
            onChangeText={(text) => this.setState({ username: text })} />
          <TextInput
            value={this.state.password}
            onChangeText={(text) => this.setState({ password: text })}
            style={styles.formInput}
            secureTextEntry={true}
            placeholder="Password"
            placeholderTextColor="#888888" />

          <View style={styles.box}>
            <TouchableOpacity
              style={styles.loginButton}
              activeOpacity={.5}
              onPress={() => { this.loginProcess() }}
            >
              <Text style={styles.TextStyle}>LOGIN</Text>
            </TouchableOpacity>

            <Text style={styles.register}>don't have account? {<Text style={{ color: '#FCA311' }}>create account</Text>}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  username: state.username,
})

export default connect(mapStateToProps)(Login)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#14213D'
  },
  logo: {
    marginTop: 51,
    alignItems: 'center'
  },
  title: {
    fontSize: 39,
    color: '#FCA311',
    marginTop: 80,
    textAlign: 'center',
    marginBottom: 40
  },
  form: {
    marginHorizontal: 24,
    padding: 16,
    borderRadius: 5,
    marginVertical: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  formInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.13)',
    borderWidth: 0,
    borderRadius: 5,
    height: 40,
    paddingHorizontal: 20,
    marginBottom: 23,
    color: 'white'
  },
  loginButton: {
    marginTop: 10,
    paddingVertical: 10,
    width: 100,
    backgroundColor: '#FCA311',
    borderRadius: 5,
    marginBottom: 16
  },
  TextStyle: {
    color: '#14213D',
    textAlign: 'center',
    fontSize: 18
  },
  box: {
    alignItems: 'center'
  },
  register: {
    color: '#FFFFFF'
  }
})