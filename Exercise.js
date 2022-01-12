import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { getDatabase, ref, set, onValue } from "firebase/database";
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
import Icon from "react-native-vector-icons/Ionicons";
import { FIREBASE_API_ENDPOINT } from "./env";

export default function Exercise(props) {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [exercisesName, setExercisesName] = React.useState([]);
  const [exerciseName, setExerciseName] = React.useState();
  const [newData, setNewData] = React.useState(false);
  const name = props.route.params.name;

  React.useEffect(async () => {
    const asyncData = await AsyncStorage.getItem("userData");
    const parsedData = JSON.parse(asyncData);
    const localId = parsedData.localId;
    const response = await axios.get(
      `${FIREBASE_API_ENDPOINT}userExercises/${localId}/${name}.json`
    );

    const responseData = response.data;

    console.log(responseData);
    const newArr = [];
    for (var k in responseData) {
      newArr.push({ key: k, name: responseData[k].name });
    }

    setExercisesName(newArr);

    props.navigation.setParams({
      setNewData: toggleNewData,
    });
  }, []);

  const toggleNewData = () => {
    // console.log("Hello");
    setNewData(true);
    setModalVisible(true);
    console.log(newData);
  };

  var component = <View></View>;

  if (newData) {
    // console.log(newData, "hello");
    component = (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(false);
            setNewData(false);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput
                placeholder="Enter Exercise Name"
                onChangeText={(v) => {
                  setExerciseName(v);
                }}
                value={exerciseName}
              />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={async () => {
                  const asyncData = await AsyncStorage.getItem("userData");
                  const parsedData = JSON.parse(asyncData);
                  const localId = parsedData.localId;
                  await axios.post(
                    `${FIREBASE_API_ENDPOINT}userExercises/${localId}/${name}.json`,
                    {
                      name: exerciseName,
                    }
                  );
                  setExercisesName([...exercisesName, exerciseName]);
                  setModalVisible(false);
                  setNewData(false);
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

  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "purple",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <FlatList
        data={exercisesName}
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
                props.navigation.navigate("ExerciseLast", {
                  bodyPart: name,
                  exercise: item.name,
                });
              }}
            >
              <Text style={{ fontSize: 20, color: "white" }}>
                {item.name}
                <Icon name="arrow-forward" size={15} />
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
      {component}
    </View>
  );
}

export const screenOptions = (navData) => {
  const name = navData.route.params.name;
  const toggleNewData = navData.route.params.setNewData;

  return {
    headerRight: () => {
      return (
        <Pressable onPress={toggleNewData}>
          <Icon name="add" size={20} color={"white"} />
        </Pressable>
      );
    },
    headerStyle: { backgroundColor: "purple" },
  };
};

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
