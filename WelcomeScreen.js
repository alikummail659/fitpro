import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDatabase, ref, set, onValue } from "firebase/database";
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
  ScrollView,
  Image,
} from "react-native";
import Db from "./Db";
import axios from "axios";
import Icon from "react-native-vector-icons/Ionicons";
import Exercise from "./Exercise";
var fitness = require("./fitness.png");
import LottieView from "lottie-react-native";

export default function Welcome(Props) {
  useEffect(() => {
    setTimeout(async () => {
      const data = await AsyncStorage.getItem("userData");
      const parsedData = JSON.parse(data);
      if (parsedData) {
        Props.navigation.replace("MainDrawer");
      } else {
        Props.navigation.replace("LoginScreen");
      }
    }, 4500);
  }, []);
  return (
    <View
      style={{
        flex: 1,
        height: "100%",
        width: "100%",
        backgroundColor: "purple",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LottieView source={require("./intro.json")} autoPlay loop />
      <Text style={{ color: "white", fontSize: 30, bottom: -200 }}>
        Welcome to Fit Pro
      </Text>
    </View>
  );
}
