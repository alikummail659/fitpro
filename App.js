import "react-native-gesture-handler";
import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Button,
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import axios from "axios";
import { initializeApp,getApps } from 'firebase/app';
import { getDatabase, ref, onValue, set } from 'firebase/database';





// Optionally import the services that you want to use
//import {...} from "firebase/auth";
//import {...} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDd0WcW6uhPXTOCYLOd1JkzpOxqOqpvjzc",
  authDomain: "mobileappproject-a26eb.firebaseapp.com",
  databaseURL: "https://mobileappproject-a26eb-default-rtdb.firebaseio.com",
  projectId: "mobileappproject-a26eb",
  storageBucket: "mobileappproject-a26eb.appspot.com",
  messagingSenderId: "435160651175",
  appId: "1:435160651175:web:8386852e52d7b6c5df1282",
  measurementId: "G-2TTJTTL522"
};
let app;
if(!getApps.length){
  app=initializeApp(firebaseConfig)
}

  const db = getDatabase();
  const reference = ref(db, 'users/' + 12);
  set(reference, {
    highscore: 13,
  });

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
