import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import InfoScreen from "./InfoScreen";
import { Pressable, Text } from "react-native";

const Stack = createNativeStackNavigator();
export default function InfoStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Info and Settings"
        component={InfoScreen}
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
