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

import axios from "axios";
import { getDatabase, ref, onValue, set } from "firebase/database";
import Db from "./Db";
import StackNavigator from "./DrawerContainer";
import Welcome from "./WelcomeScreen";
import SignUP from "./SignUp";

// Optionally import the services that you want to use
//import {...} from "firebase/auth";
//import {...} from "firebase/database";

export default function App() {
  return (
    //  <MainDrawer/>
    <StackNavigator />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
