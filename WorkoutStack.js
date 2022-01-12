import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import WorkScreen from "./WorkoutsScreen";
import { Pressable, Text } from "react-native";

const Stack = createNativeStackNavigator();
export default function WorkoutStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Workout"
        component={WorkScreen}
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
