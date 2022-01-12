import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import ExerciseStack from "./ExercisesStack";
import Workoutstack from "./WorkoutStack";
import CustomWorkoutStack from "./CreateWorkoutStack";
import DietPlanStack from "./DietPlanStack";
import HistoryScreen from "./HistoryScreen";
import HistoryDetailScreen from "./HistoryDetailScreen";
import InfoStack from "./InfoStack";
import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUP from "./SignUp";
import Welcome from "./WelcomeScreen";
import LoginScreen from "./LoginScreen";
import { Pressable, Text } from "react-native";

const Drawer = createDrawerNavigator();
const RootStack = createNativeStackNavigator();
const HistoryStack = createNativeStackNavigator();

const HistoryNavigator = () => {
  return (
    <HistoryStack.Navigator>
      <HistoryStack.Screen
        name={"HistoryScreen"}
        component={HistoryScreen}
        options={(navData) => {
          return {
            headerLeft: () => {
              return (
                <Pressable
                  onPress={() => {
                    navData.navigation.toggleDrawer();
                  }}
                >
                  <Text>Open Drawer</Text>
                </Pressable>
              );
            },
          };
        }}
      />
      <HistoryStack.Screen
        name={"HistoryDetailScreen"}
        component={HistoryDetailScreen}
      />
    </HistoryStack.Navigator>
  );
};

function MainDrawer() {
  const [header, setheader] = React.useState(true);
  const setparam = (navigation) => {
    React.useEffect(() => {
      navigation.setParams({ header: header, setheader: setheader });
    }, []);
  };
  return (
    <Drawer.Navigator
      initialRouteName="Exercises"
      screenOptions={{
        // headerStyle: { backgroundColor: "purple" },
        // headerTintColor: "white",
        // drawerStyle: {
        //   backgroundColor: "purple",
        // },
        // drawerLabelStyle: { color: "white" },
        headerShown: false,
      }}
    >
      <Drawer.Screen name="Exercises" component={ExerciseStack} />
      <Drawer.Screen name="Workouts" component={Workoutstack} />
      <Drawer.Screen name="Create Workout" component={CustomWorkoutStack} />
      <Drawer.Screen name="Diet Plan" component={DietPlanStack} />
      <Drawer.Screen name="History" component={HistoryNavigator} />
      <Drawer.Screen name="Info and Settings" component={InfoStack} />
    </Drawer.Navigator>
  );
}

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name={"Welcome"} component={Welcome} />
        <RootStack.Screen name={"LoginScreen"} component={LoginScreen} />
        <RootStack.Screen name={"SignUpScreen"} component={SignUP} />
        <RootStack.Screen name={"MainDrawer"} component={MainDrawer} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
