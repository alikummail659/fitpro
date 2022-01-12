import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Touchable,
  TouchableOpacity,
} from "react-native";

const LoginScreen = (props) => {
  const [email, setEmail] = useState();
  const [password, setpassword] = useState();
  return (
    <View style={styles.root}>
      <TextInput
        placeholder="Email"
        onChangeText={(v) => {
          setEmail(v);
        }}
        value={email}
      />
      <TextInput
        placeholder="Password"
        onChangeText={(v) => {
          setpassword(v);
        }}
        value={password}
      />
      <TouchableOpacity
        onPress={async () => {
          const response = await axios.post(
            "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDd0WcW6uhPXTOCYLOd1JkzpOxqOqpvjzc",
            {
              email: email,
              password: password,
              returnSecureToken: true,
            }
          );

          const userData = response.data;
          const localId = userData.localId;
          await AsyncStorage.setItem(
            "userData",
            JSON.stringify({
              localId: localId,
              email: email,
            })
          );

          props.navigation.replace("MainDrawer");
        }}
      >
        <Text style={{ color: "black" }}>Login</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: "row" }}>
        <Text>Don't have an account?? </Text>
        <TouchableOpacity onPress={()=>{
            props.navigation.replace("SignUpScreen")
        }}>
          <Text style={{color:'blue'}}>SignUp</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
