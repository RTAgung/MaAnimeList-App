import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class AnimeList extends React.Component {
  render() {
    let data = this.props.data
    let moveToDetail = this.props.moveToDetail
    return (
      <View style={styles.container}>
        <ImageBackground source={{ uri: data.image_url }} style={{ height: 121 }} imageStyle={{ borderRadius: 8 }}>
          <View style={styles.layer}>
          </View>
          <View style={styles.box}>
            <Text style={styles.title}>{data.title}</Text>
            <Text style={styles.date}>{`${data.season_name} ${data.season_year}`}</Text>
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <Text style={styles.episode}>{`${data.total_episodes} episodes`}</Text>
                <TouchableOpacity style={styles.button} onPress={() => moveToDetail(data.mal_id)}>
                  <Text style={styles.buttonText}>More...</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    )
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
    marginBottom: 16,
  },
  layer: {
    backgroundColor: colors.black,
    opacity: 0.55,
    position: 'absolute',
    height: "100%",
    width: "100%",
    borderRadius: 8,
  },
  box: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  title: {
    opacity: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
  },
  date: {
    color: colors.white,
    fontSize: 12,
  },
  episode: {
    color: colors.white,
    fontSize: 14,
  },
  button: {
    borderRadius: 5,
    borderColor: colors.orangeWeb,
    borderWidth: 2,
    paddingVertical: 4,
    paddingHorizontal: 14,
  },
  buttonText: {
    fontSize: 12,
    color: colors.orangeWeb,
    fontWeight: 'bold'
  }
})