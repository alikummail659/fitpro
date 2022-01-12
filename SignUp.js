import React, { useState } from "react";
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
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const database_API =
  "https://mobileappproject-a26eb-default-rtdb.firebaseio.com/";

const SignUP = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [username, setUsername] = useState();
  const [confirmPassoword, setConfirmPassword] = useState();

  return (
    <View
      style={{
        flex: 1,
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TextInput
        placeholder="Email"
        style={{
          width: "80%",
          height: 50,
          marginBottom: 10,
          borderRadius: 10,
          borderWidth: 1,
          borderBottomWidth: 1,
          padding: 10,
        }}
        value={email}
        onChangeText={(v) => {
          console.log(v);
          setEmail(v);
        }}
      />
      <TextInput
        placeholder="Username"
        style={{
          width: "80%",
          height: 50,
          marginBottom: 10,
          borderRadius: 10,
          borderWidth: 1,
          borderBottomWidth: 1,
          padding: 10,
        }}
        value={username}
        onChangeText={(v) => {
          console.log(v);
          setUsername(v);
        }}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={{
          width: "80%",
          height: 50,
          marginBottom: 10,
          padding: 10,
          borderRadius: 10,
          borderWidth: 1,
          borderBottomWidth: 1,
        }}
        value={password}
        onChangeText={(v) => {
          console.log(v);
          setPassword(v);
        }}
      />
      <TextInput
        placeholder="Confirm Password"
        secureTextEntry
        style={{
          width: "80%",
          height: 50,
          marginBottom: 10,
          padding: 10,
          borderRadius: 10,
          borderWidth: 1,
          borderBottomWidth: 1,
        }}
        value={confirmPassoword}
        onChangeText={(v) => {
          console.log(v);
          setConfirmPassword(v);
        }}
      />
      <TouchableOpacity
        onPress={async () => {
          const response = await axios.post(
            "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDd0WcW6uhPXTOCYLOd1JkzpOxqOqpvjzc",
            {
              email: email,
              password: password,
              returnSecureToken: true,
            }
          );
          const userData = response.data;
          const localId = userData.localId;

          console.log(userData);

          await AsyncStorage.setItem(
            "userData",
            JSON.stringify({
              localId: userData.localId,
              email: userData.email,
            })
          );

          await axios.post(`${database_API}users/${localId}.json`, {
            username: username,
            email: email,
          });

          props.navigation.navigate("MainDrawer");
        }}
      >
        <Text>Signup</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: "row" }}>
        <Text>Already have an account?? </Text>
        <TouchableOpacity
          onPress={() => {
            props.navigation.replace("LoginScreen");
          }}
        >
          <Text style={{ color: "blue" }}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUP;
