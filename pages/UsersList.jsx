import { View, FlatList } from "react-native";
import React from "react";
import { Button, Text } from "@rneui/base";
import { useAllUsers } from "../contexts/UsersContext";
import TextAvatar from "react-native-text-avatar";
import { colorHash } from "../utils/colorHash";
import { styles } from "../styles/styles";

export default function UsersList({ navigation }) {
  const allUsers = useAllUsers();

  return (
    <>
      <Button
        title="Users List"
        onPress={() => navigation.navigate("chat_screen")}
      >
        <Text>BACK TO CHAT</Text>
      </Button>

      <FlatList
        contentContainerStyle={styles.container}
        data={allUsers}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <TextAvatar
              style={styles.TextAvatar}
              backgroundColor={colorHash(item.FirstName).hex}
              textColor={colorHash(item.LastName).hex}
              size={60}
              type={"circle"}
            >
              {item.FirstName + " " + item.LastName}
            </TextAvatar>
            <Text style={styles.setAllUsers}>
              {item.FirstName} {item.LastName}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </>
  );
}
