import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useUser, useSetUser, UserProvider } from "./contexts/CurrUserContext";
import {
  useAllUsers,
  useSetAllUsers,
  AllUsersProvider,
} from "./contexts/UsersContext";
import ChatsScreen from "./pages/ChatScreen";
import CreateUser from "./pages/CreateUser";
import UsersList from "./pages/UsersList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "@rneui/base";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function SecondScreen() {
  return (
    <Drawer.Navigator initialRouteName="chat_screen">
      <Drawer.Screen
        name="chat_screen"
        component={ChatsScreen}
        options={{
          headerRight: () => {
            return (
              <>
                <Button
                  title="log out"
                  onPress={() => {
                    AsyncStorage.clear();
                    navigation.navigate("create_user");
                  }}
                />
              </>
            );
          },
        }}
      />
      <Drawer.Screen name="users_list" component={UsersList} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <>
      <AllUsersProvider>
        <UserProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="create_user">
              <Stack.Screen name="create_user" component={CreateUser} />
              <Stack.Screen
                name="second_screen"
                component={SecondScreen}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </UserProvider>
      </AllUsersProvider>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    margin: 5,
    borderWidth: 1,
  },
  scrollView: {
    backgroundColor: "lightgray",
    height: "85%",
    width: "100%",
  },
  TextAvatar: {
    margin: 25,
  },
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "70%",
  },
  inputs: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    width: 290,
  },
  bottomchat: {
    display: "flex",
    flexDirection: "row",
  },
  InputChat: {
    width: "80%",
  },
});
