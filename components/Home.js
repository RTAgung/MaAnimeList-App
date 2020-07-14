import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
} from 'react-native'
import Axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

import AnimeList from './AnimeList';

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {},
      isLoading: true,
      isError: false,
      search: "",
    };
  }

  componentDidMount() {
    this.getAllAnime()
  }

  getAllAnime = async (text = "") => {
    try {
      this.setState({ isLoading: true })
      var search = text.replace(/ /g, "%20")
      const response = await Axios.get(`http://api.jikan.moe/v3/user/nekomata1037/animelist/all?q=${search}`)
      this.setState({ isError: false, isLoading: false, data: response.data })
    } catch (error) {
      this.setState({ isLoading: false, isError: true })
    }
  }

  searchOperation = () => {
    this.getAllAnime(this.state.search)
  }

  moveToDetail = (id) => {
    this.props.navigation.navigate('Detail', {id})
  }
  
  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <View style={styles.searchBox}>
            <View style={styles.searchBoxOpacity} />
            <View style={styles.searchBoxItem}>
              <TextInput
                value={this.state.search}
                onChangeText={text => { this.setState({ search: text }) }}
                placeholder="Search Anime"
                underlineColorAndroid={colors.oxfordBlue}
                placeholderTextColor="#4C566A"
                style={styles.searchInput}
              />
              <TouchableOpacity style={{ paddingRight: 16, paddingLeft: 8 }}
                onPress={this.searchOperation}>
                <Icon name="search" size={23} style={{ color: 'black' }} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flex: 1, backgroundColor: colors.oxfordBlue, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: colors.white }}>LOADING...</Text>
          </View>
        </View>
      );
    } else if (this.state.isError) {
      return (
        <View style={{ flex: 1, backgroundColor: colors.oxfordBlue, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: colors.white }}>ERROR...</Text>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.searchBox}>
            <View style={styles.searchBoxOpacity} />
            <View style={styles.searchBoxItem}>
              <TextInput
                value={this.state.search}
                onChangeText={text => { this.setState({ search: text }) }}
                placeholder="Search Anime"
                underlineColorAndroid={colors.oxfordBlue}
                placeholderTextColor="#4C566A"
                style={styles.searchInput}
              />
              <TouchableOpacity style={{ paddingRight: 16, paddingLeft: 8 }}
                onPress={this.searchOperation}>
                <Icon name="search" size={23} style={{ color: 'black' }} />
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
            data={this.state.data.anime}
            renderItem={({ item }) =>
              <AnimeList data={item} moveToDetail={this.moveToDetail.bind(this)} />
            }
            keyExtractor={(id, index) => index}
          />
        </View>
      )
    }
  }
}

const colors = {
  black: "#000000",
  oxfordBlue: "#14213D",
  orangeWeb: "#FCA311",
  platinum: "#E5E5E5",
  white: "#FFFFFF"
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.oxfordBlue,
    padding: 18,
    paddingBottom: 0,
  },
  searchBox: {
    borderRadius: 5,
    marginBottom: 18,
  },
  searchBoxOpacity: {
    opacity: 0.55,
    backgroundColor: colors.platinum,
    borderRadius: 5,
    paddingVertical: 2,
    paddingLeft: 8,
    paddingRight: 14,
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  searchBoxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
    paddingLeft: 8,
  },
  searchInput: {
    flex: 1,
    padding: 6,
    color: colors.black,
    fontSize: 14,
  }
})