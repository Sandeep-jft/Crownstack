/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {SafeAreaView, View, Text, Image, ActivityIndicator} from 'react-native'
import SplashScreen from 'react-native-splash-screen'



const App= ()  => {

  useEffect(()=>{
    SplashScreen.hide();
    fetchUserData();
  },[])

  const fetchUserData = async ()=>{
    const movieList = await fetch('https://parseapi.back4app.com/classes/Movie?limit=14');
  
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <Text>Hello</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

});

export default App;
