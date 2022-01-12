import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { FIREBASE_API_ENDPOINT } from "./env";
import axios from "axios";

const HistoryDetailScreen = (props) => {
  const [exercises, setExercises] = useState();
  const date = props.route.params.date;

  useEffect(async () => {
    const data = await AsyncStorage.getItem("userData");
    const parsedData = JSON.parse(data);
    const localId = parsedData.localId;

    const response = await axios.get(
      `${FIREBASE_API_ENDPOINT}userExerciseHistory/${localId}/${date}.json`
    );
    const responseData = response.data;

    const newArr = [];

    for (var key in responseData) {
      const item = responseData[key];
      newArr.push({
        bodyPart: item.bodyPart,
        exerciseName: item.exerciseName,
        repitition: item.repitition,
        weight: item.weight,
      });
    }

    setExercises(newArr);
  }, []);
  return (
    <View style={styles.root}>
      <View style={{ width: "100%", height: 100, flexDirection: "row" }}>
        <View
          style={{
            width: "25%",
            height: 100,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
          }}
        >
          <Text>Body Part</Text>
        </View>
        <View
          style={{
            width: "25%",
            height: 100,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
          }}
        >
          <Text>Exercise Name</Text>
        </View>
        <View
          style={{
            width: "25%",
            height: 100,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
          }}
        >
          <Text>Weight</Text>
        </View>
        <View
          style={{
            width: "25%",
            height: 100,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
          }}
        >
          <Text>Repitition</Text>
        </View>
      </View>
      <FlatList
        style={{ width: "100%" }}
        data={exercises}
        renderItem={(itemData) => {
          return (
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                height: 100,
                marginVertical: 20,
                backgroundColor: "purple",
              }}
            >
              <View
                style={{
                  width: "25%",
                  height: 100,
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 1,
                }}
              >
                <Text>{itemData.item.bodyPart}</Text>
              </View>
              <View
                style={{
                  width: "25%",
                  height: 100,
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 1,
                }}
              >
                <Text>{itemData.item.exerciseName}</Text>
              </View>
              <View
                style={{
                  width: "25%",
                  height: 100,
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 1,
                }}
              >
                <Text>{itemData.item.weight}</Text>
              </View>
              <View
                style={{
                  width: "25%",
                  height: 100,
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 1,
                }}
              >
                <Text>{itemData.item.repitition}</Text>
              </View>
            </View>
          );
        }}
        keyExtractor={(item, index) => {
          return index;
        }}
      />
    </View>
  );
};

export default HistoryDetailScreen;
const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
});
