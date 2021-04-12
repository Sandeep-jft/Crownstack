import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, Image, ActivityIndicator, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { movieImageUrl } from './utils/constant'

const App = () => {

  const [totalMovies, setTotalMovies] = useState([]);
  const [paginationCount, setPaginationCount] = useState(0);

  useEffect(() => {
    SplashScreen.hide();
    fetchMoviesList();
  }, [])

  const fetchMoviesList = async () => {
    try{
    const movieList = await fetch(`https://parseapi.back4app.com/classes/Movie?skip=${paginationCount}&limit=14`,
      {
        headers: {
          'X-Parse-Application-Id': 'xjK389lSZ70YgvRNe9fb1kd94z9IllRKqOrQIa6l', // This is the fake app's application id
          'X-Parse-Master-Key': '7wHPVDC4MkHR7f6a3gUcYqu8rb8XfVt0GY0gkAs0', // This is the fake app's readonly master key
        }
      });
    const movieListParse = await movieList.json();
    if (movieListParse) {
      console.log("The movie list is --->",movieListParse.results);
      setTotalMovies(prev => [...prev, movieListParse.results]);
      setPaginationCount(prev => prev + 14);
    }
  }

  catch(err){
    console.log("The error is --->",err);
  }
  }


  const isListCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 30;
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
  };

  return (
    <SafeAreaView style={styles.container}>
      {
        totalMovies.length===0 ? <ActivityIndicator size="large" style={{ marginTop: 150 }} color="rgb(51,207,119" /> :
          <ScrollView style={styles.container}
            onScroll={({ nativeEvent }) => {
              if (isListCloseToBottom(nativeEvent)) {
                fetchMoviesList();
              }
            }} >
            <View style={styles.header} >
              <Text styles={styles.headerText} >Movies List</Text>
            </View>
            {
              totalMovies.length>0 && totalMovies.map((item,index) => {
                return (
                  <View key={index} style={styles.movieContainer} >
                    <Image source={{ uri: movieImageUrl }} style={styles.imageContainer} />
                    <View style={styles.movieInfo} >
                      {/* <Text>{JSON.stringify(item)}</Text> */}
                      <Text style={styles.detailStyle} >{item.title}</Text>
                      <Text style={styles.detailStyle} >Year : {item.year}</Text>
                    </View>
                  </View>
                )
              })
            }
          </ScrollView>
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(255,255,255)"
  },
  header: {
    marginTop: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 32,
    // lineHeight: 30,
    letterSpacing: 0.15,
    color: "rgb(52,52,52)"
    // textAlign:"center"
  },
  movieContainer: {
    minHeight: 66,
    marginHorizontal: 14,
    flexDirection: "row",
    // justifyContent: 'space-around',
    alignItems: "center",
    // backgroundColor:"blue",
    borderWidth: 1,
    marginVertical: 5,
    borderRadius: 4,
    borderColor: "rgba(52,52,52,0.4)"
  },
  imageContainer: {
    height: 44,
    width: 44,
    borderRadius: 22,
    resizeMode: "cover",
    marginHorizontal: 5
  },
  movieInfo: {
    justifyContent: "center",
    marginLeft: 15

  },
  detailStyle: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 20,
  }


});

export default App;
