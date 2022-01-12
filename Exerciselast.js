import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";

const ExerciseLast = (props) => {
  const [currentDate, setCurrentDate] = useState();
  useEffect(async () => {
    const day = new Date().getDate();
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    console.log(day, month, year);
    setCurrentDate(`${day}/${month}/${year}`);
  }, []);
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
  return {
    headerStyle: {
      backgroundColor: "purple",
    },
  };
};
