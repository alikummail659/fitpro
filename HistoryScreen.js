import React, { useEffect, useState } from "react";
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
  Pressable,
} from "react-native";
import axios from "axios";
import { FIREBASE_API_ENDPOINT } from "./env";
import { useIsFocused } from "@react-navigation/native";

export default function HistoryScreen(props) {
  const [historyItems, setHistoryItems] = useState();
  const isFocused = useIsFocused();
  useEffect(async () => {
    const data = await AsyncStorage.getItem("userData");
    const parsedData = JSON.parse(data);
    const localId = parsedData.localId;

    const response = await axios.get(
      `${FIREBASE_API_ENDPOINT}userExerciseHistory/${localId}.json`
    );

    const originalData = response.data;
    // console.log(originalData);

    const newArr = [];

    for (var dateKey in originalData) {
      // for (var objKey in originalData[dateKey]) {
      //   const history = originalData[dateKey];
      //   console.log(history[objKey]);
      //   newArr.push({
      //     dateKey:dateKey,
      //     historyItems
      //   })
      // }
      newArr.push(dateKey);
    }
    setHistoryItems(newArr);
  }, [isFocused]);
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <FlatList
        style={{ width: "100%" }}
        data={historyItems}
        renderItem={(itemData) => {
          return (
            <Pressable
              style={{
                width: "100%",
                height: 100,
                borderRadius: 10,
                padding: 20,
                marginVertical: 20,
                backgroundColor: "purple",
                justifyContent: "center",
              }}
              onPress={() => {
                props.navigation.navigate("HistoryDetailScreen", {
                  date: itemData.item,
                });
              }}
            >
              <Text style={{ color: "white", fontSize: 50 }}>
                {itemData.item}
              </Text>
            </Pressable>
          );
        }}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
}
