import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import CWorkScreen from "./CreateWorkoutScreen";
import { Pressable, Text } from "react-native";

const Stack = createNativeStackNavigator();
export default function CustomWorkoutStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Create Your Workouts"
        component={CWorkScreen}
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
    </Stack.Navigator>
  );
}
