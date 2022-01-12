import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { clockRunning } from "react-native-reanimated";
import { FIREBASE_API_ENDPOINT } from "./env";

const ExerciseLast = (props) => {
  const [currentDate, setCurrentDate] = useState();
  const [weight, setWeight] = useState();
  const [repitition, setRepitition] = useState();
  const [savingRepition, setSavingRepitition] = useState();
  const [restingTime, setRestingTime] = useState(15);
  const [isResting, setIsResting] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [exerciseStart, setExerciseStart] = useState();
  const bodyPart = props.route.params.bodyPart;
  const exerciseName = props.route.params.exercise;
  console.log(weight+"w")
  console.log(repitition+"r")
  useEffect(async () => {
    const day = new Date().getDate().toString();
    const month = new Date().getMonth().toString();
    const year = new Date().getFullYear().toString();
    setCurrentDate(day + " - " + month + " - " + year);
    props.navigation.setParams({
      saveData: saveData,
    });
   
  }, []);
 

  // useEffect(() => {
  //   var resting = 0;
  //   var exerciseStarted = 0;
  //   var secondCheck = 0;

  //   if (repitition > 0) {
  //     // console.log("hello");
  //     if (exerciseStart) {
  //       if (isResting) {
  //         var resting = setInterval(() => {
  //           setRestingTime((rest) => rest - 1);
  //         }, 1000);
  //         if (restingTime == 0) {
  //           setIsResting(false);
  //           var exerciseStarted = setInterval(() => {
  //             setSeconds((seconds) => seconds + 1);
  //           }, 1000);
  //           clearInterval(resting);
  //         }
  //       } else {
  //         exerciseStarted = setInterval(() => {
  //           // console.log("Hello", seconds);
  //           setSeconds((seconds) => {
  //             secondCheck = secondCheck + 1;
  //             console.log(secondCheck);
  //             return secondCheck;
  //           });
  //           if (secondCheck == 10) {
  //             setRestingTime(15);
  //             clearInterval(exerciseStarted);
  //             setIsResting(true);
  //             resting = setInterval(() => {
  //               setRestingTime((rest) => rest - 1);
  //             }, 1000);
  //             setRepitition((repitition) => repitition - 1);
  //           }
  //         }, 1000);
  //       }
  //     }
  //   } else {
  //     setExerciseStart(false);
  //   }
  // }, [exerciseStart]);

  const saveData = async () => {
    const data = await AsyncStorage.getItem("userData");
    const parsedData = JSON.parse(data);
    const localId = parsedData.localId;
    const day = new Date().getDate().toString();
    const month = new Date().getMonth().toString();
    const year = new Date().getFullYear().toString();
    const fullDate = day + "-" + month + "-" + year;
    console.log(weight+"yy")
    console.log(repitition)

    await axios.post(
      `${FIREBASE_API_ENDPOINT}userExerciseHistory/${localId}/${fullDate}.json`,
      {
        weight: weight,
        repitition: repitition,
        bodyPart: bodyPart,
        exerciseName: exerciseName,
      }
    );
  };

  return (
    <View style={styles.root}>
      <View
        style={{
          width: "100%",
          height: 100,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 30 }}>{currentDate}</Text>
      </View>
      <View style={{ width: "100%", height: 100, flexDirection: "row" }}>
        <View
          style={{
            width: "45%",
            height: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white" }}>Weight</Text>
        </View>
        <TextInput
          placeholder="Weight"
          onChangeText={(v) => {
            setWeight(v);
            console.log(weight)
          }}
         
        />
      </View>
      <View style={{ width: "100%", height: 100, flexDirection: "row" }}>
        <View
          style={{
            width: "45%",
            height: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white" }}>Repititions</Text>
        </View>
        <TextInput
          style={{ width: "45%", height: 100 }}
          placeholder="Repitition"
          onChangeText={(v) => {
            setRepitition(v);
            setSavingRepitition(v);
          }}
       
        />
      </View>
      {isResting ? (
        <View>
          <Text>restingTime</Text>
        </View>
      ) : (
        <View>
          <Text>Seconds: {seconds}</Text>
        </View>
      )}
      {!exerciseStart ? (
        <Pressable
          style={{
            backgroundColor: "pink",
            width: "100%",
            height: 100,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 50,
          }}
          onPress={() => {
            setExerciseStart(true);
          }}
        >
          <Text style={{ color: "white", fontSize: 50 }}>Start Timer</Text>
        </Pressable>
      ) : (
        <View></View>
      )}
    </View>
  );
};

export default ExerciseLast;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "purple",
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
});

export const screenOptions = (navData) => {
  const saveData = navData.route.params.saveData;
  return {
    headerStyle: {
      backgroundColor: "purple",
    },
    headerRight: () => {
      return (
        <Pressable onPress={saveData}>
          <Text style={{ fontSize: 20 }}>✅</Text>
        </Pressable>
      );
    },
  };
};
