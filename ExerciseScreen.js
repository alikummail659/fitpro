import * as React from "react";
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
  Pressable,
} from "react-native";
import Db from "./Db";
import axios from "axios";
import Icon from "react-native-vector-icons/Ionicons";
import Exercise from "./Exercise";

export default function ExerScreen(Props) {
  const FIREBASE_API_ENDPOINT =
    "https://mobileappproject-a26eb-default-rtdb.firebaseio.com/"; // << LOOK Here, provide URL of your Firebase Realtime Database

  const [Exercisename, SetExercisename] = React.useState([]);
  const [newexercise, setnewexrecise] = React.useState();
  const [newdata, setnewdata] = React.useState(false);
  const [userExercises, setUserExercises] = React.useState([]);
  const [modalVisible, setModalVisible] = React.useState(false);
  let component = <View style={{ backgroundColor: "purples" }}></View>;

  const UpdateData = async (name) => {
    const asyncData = await AsyncStorage.getItem("userData");
    const parsedData = JSON.parse(asyncData);
    const localId = parsedData.localId;
    const response = await axios.get(
      `${FIREBASE_API_ENDPOINT}users/${localId}/exercises.json`
    );
    console.log(response.data, "Hello");
    var newArr = [];
    var newkey = "";
    for (var key in response.data) {
      newkey = key;
      newArr = response.data;
    }

    console.log(newArr);

    if (response.data) {
      await axios.patch(`${FIREBASE_API_ENDPOINT}users/${localId}.json`, {
        exercises: [...newArr, name],
      });
    } else {
      await axios.patch(`${FIREBASE_API_ENDPOINT}users/${localId}.json`, {
        exercises: [name],
      });
    }
  };
  const getData = async () => {
    const asyncData = await AsyncStorage.getItem("userData");
    const parsedData = JSON.parse(asyncData);
    const localId = parsedData.localId;

    const userExercises = await axios.get(
      `${FIREBASE_API_ENDPOINT}users/${localId}/exercises.json`
    );

    // console.log(userExercises.data);

    const response = await axios.get(`${FIREBASE_API_ENDPOINT}Exercises.json`);

    var newArr = [];
    for (var key in response.data) {
      newArr = response.data[key].name;
    }
    if (response.data) {
      SetExercisename([...newArr]);
      setUserExercises([...userExercises.data]);
    } else {
      SetExercisename([]);
      setUserExercises([]);
    }
    console.log(response.data);
  };
  if (newdata) {
    console.log("Opened");
    component = (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(false);
            setnewdata(false);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput
                placeholder="Enter Exercise Name"
                onChangeText={(v) => {
                  setnewexrecise(v);
                }}
                value={newexercise}
              />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  UpdateData(newexercise);
                  setUserExercises([...userExercises, newexercise]);
                  setModalVisible(false);
                  setnewdata(false);
                }}
              >
                <Text style={styles.textStyle}>✓</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
  React.useEffect(() => {
    getData();
  }, []);

  return (
    <View style={{ height: "100%", width: "100%", backgroundColor: "purple" }}>
      <View>
        <FlatList
          data={Exercisename}
          keyExtractor={(item, index) => {
            return index;
          }}
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity
                style={{
                  width: 400,
                  height: 50,
                  backgroundColor: "purple",
                  borderBottomWidth: 1,
                  justifyContent: "center",
                }}
                onPress={() => {
                  Props.navigation.navigate("Exercise", { name: item });
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: 14,
                  }}
                >
                  <Text style={{ fontSize: 20, color: "white" }}>{item}</Text>
                  <Icon name="arrow-forward" size={15} color={"white"} />
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
      <View
        style={{
          justifyContent: "center",
          height: 100,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 20,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 50,
          }}
        >
          Your Exercises
        </Text>
        <Pressable
          onPress={() => {
            setModalVisible(true);
            setnewdata(true);
          }}
          style={{
            borderRadius: 20,
            borderColor: "white",
            height: 50,
            width: 50,
            borderWidth: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 30, color: "white" }}>+</Text>
        </Pressable>
      </View>
      <View>
        <FlatList
          data={userExercises}
          keyExtractor={(item, index) => {
            return index;
          }}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                borderBottomWidth: 1,
              }}
            >
              <TouchableOpacity
                style={{
                  width: "90%",
                  height: 50,
                  backgroundColor: "purple",
                  padding: 14,
                  justifyContent: "center",
                }}
                onPress={() => {
                  Props.navigation.navigate("Exercise", { name: item });
                }}
              >
                <Text style={{ fontSize: 20, color: "white" }}>{item}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  const asyncData = await AsyncStorage.getItem("userData");
                  const parsedData = JSON.parse(asyncData);
                  const localId = parsedData.localId;
                  const exerciseResponse = await axios.get(
                    `${FIREBASE_API_ENDPOINT}users/${localId}/exercises.json`
                  );

                  const exerciseArray = exerciseResponse.data;
                  // console.log(exerciseResponse);
                  console.log(exerciseArray);
                  // console.log(item);
                  const newArr = exerciseArray.filter((item1) => {
                    return item1 != item;
                  });
                  await axios.patch(
                    `${FIREBASE_API_ENDPOINT}users/${localId}.json`,
                    {
                      exercises: newArr,
                    }
                  );
                  setUserExercises(newArr);
                }}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 10,
                }}
              >
                <Icon name="trash" size={30} color={"white"} />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

      {component}
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "85%",
    height: "50%",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
