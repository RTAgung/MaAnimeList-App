import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
} from 'react-native'
import Axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';

export default class Detail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {},
      id: this.props.route.params.id,
      isLoading: true,
      isError: false,
    };
  }

  componentDidMount() {
    this.getDetailAnime()
  }

  getDetailAnime = async () => {
    try {
      const response = await Axios.get(`http://api.jikan.moe/v3/anime/${this.state.id}`)
      this.setState({ isError: false, isLoading: false, data: response.data })
    } catch (error) {
      this.setState({ isLoading: false, isError: true })
    }
  }

  getArrayObject = (data) => {
    var names = data.map((item) => {
      return item.name
    })

    return names.join(", ")
  }

  checkPremiered = (data) => {
    if (data != null) {
      return (
        <Text style={styles.info}>{data}</Text>
      )
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, backgroundColor: colors.oxfordBlue, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: colors.white }}>LOADING...</Text>
        </View>
      );
    } else if (this.state.isError) {
      return (
        <View style={{ flex: 1, backgroundColor: colors.oxfordBlue, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: colors.white }}>ERROR...</Text>
        </View>
      )
    } else {
      const data = this.state.data
      return (
        <View style={styles.container}>
          <View style={styles.topContainer}>
            <Image source={{ uri: data.image_url }} style={styles.image} />
            <View style={styles.boxInfo}>
              <Text style={styles.title}>{data.title}</Text>
              <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <Text style={styles.infoItalic}>{`Score : ${data.score}  (${data.scored_by})`}</Text>
                {this.checkPremiered(data.premiered)}
                <Text style={styles.info}>{`Status : ${data.status}`}</Text>
                <Text style={styles.info}>{`Source : ${data.source}`}</Text>
                <Text style={styles.info}>{`Studios : ${this.getArrayObject(data.studios)}`}</Text>
                <Text style={styles.info}>{`${data.duration.split(" ")[0]} min/ep in ${data.episodes} episodes`}</Text>
              </View>
            </View>
          </View>
          <View style={{ marginVertical: 10 }}>
            <Text style={styles.infoItalic}>Genre :</Text>
            <Text style={styles.infoGenre}>{this.getArrayObject(data.genres)}</Text>
          </View>
          <Text style={styles.info}>Synopsis</Text>
          <View style={styles.separator} />
          <View style={styles.synopsisBox}>
            <View style={styles.backOpacity} />
            <View style={styles.scrollBox}>
              <ScrollView>
                <Text style={styles.textSynopsis}>
                  {data.synopsis}
                </Text>
              </ScrollView>
            </View>
          </View>
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
  },
  topContainer: {
    flexDirection: 'row',
  },
  image: {
    width: 150 * 1.1,
    resizeMode: 'cover',
    height: 214 * 1.1,
    borderRadius: 10,
  },
  boxInfo: {
    flex: 1,
    marginLeft: 15,
  },
  title: {
    fontSize: 16,
    color: colors.orangeWeb,
    minHeight: 78,
    width: '100%',
    fontWeight: 'bold',
    maxHeight: 78,
  },
  info: {
    color: colors.platinum,
    fontSize: 14,
  },
  infoItalic: {
    color: colors.platinum,
    fontSize: 14,
    fontStyle: 'italic',
  },
  infoGenre: {
    color: colors.platinum,
    fontSize: 14,
    fontWeight: 'bold',
    maxHeight: 54,
    minHeight: 54,
  },
  separator: {
    height: 1,
    backgroundColor: colors.platinum,
    opacity: 0.75,
    marginTop: 4,
    marginBottom: 8,
  },
  synopsisBox: {
    flex: 1,
    borderRadius: 6,
  },
  backOpacity: {
    position: 'absolute',
    backgroundColor: colors.platinum,
    opacity: 0.65,
    borderRadius: 6,
    width: '100%',
    height: '100%',
  },
  scrollBox: {
    paddingLeft: 12,
    paddingRight: 8,
    paddingVertical: 10,
  },
  textSynopsis: {
    textAlign: 'justify',
    color: colors.black,
    fontSize: 14,
    paddingRight: 8,
  }
})