import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import ExerScreen from "./ExerciseScreen";
import Exercise, { screenOptions as ExerciseScreenOption } from "./Exercise";
import { Pressable, Text } from "react-native";
import * as Icon from "react-native-vector-icons/Ionicons";
import ExerciseLast, {
  screenOptions as ExerciseLastScreenOptions,
} from "./Exerciselast";

const Stack = createNativeStackNavigator();
export default function ExerciseStack() {
  return (
    <Stack.Navigator initialRouteName="Exercises">
      <Stack.Screen
        name="Exercises"
        component={ExerScreen}
        options={(navData) => {
          return {
            // headerShown: false,
            headerStyle: { backgroundColor: "purple" },
            headerLeft: () => {
              return (
                <Pressable
                  onPress={() => {
                    navData.navigation.toggleDrawer();
                  }}
                >
                  <Text>Drawer</Text>
                </Pressable>
              );
            },
          };
        }}
      />
      <Stack.Screen
        name="Exercise"
        component={Exercise}
        options={ExerciseScreenOption}
      />
      <Stack.Screen
        name="ExerciseLast"
        component={ExerciseLast}
        options={ExerciseLastScreenOptions}
      />
    </Stack.Navigator>
  );
}
