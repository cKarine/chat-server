import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { Button, Input } from "@rneui/base";
import TextAvatar from "react-native-text-avatar";
import { useUser, useSetUser } from "../contexts/CurrUserContext";
import { Platform } from "react-native";
import { colorHash } from "../utils/colorHash";
import { useAllUsers, useSetAllUsers } from "../contexts/UsersContext";
import { styles } from "../styles/styles";
import socket from "../utils/socket";

export default function ChatScreen({ navigation }) {
  const mysocket = useRef();
  const input = useRef();
  const scrollRef = useRef();

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      send();
      input.current.focus();
    }
  };

  const user = useUser();
  const setUser = useSetUser();

  const allUsers = useAllUsers();
  const setAllUsers = useSetAllUsers();

  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollToEnd({ animated: true });
    }
  }, [messageList]);

  useEffect(() => {
    mysocket.current = socket.connect();
    if (user != null) {
      mysocket.current.emit("message", {
        message: `${user.FirstName} has connected`,
        type: "connectUser",
        user: user,
      });
    }
    mysocket.current.on("message", (msg) => {
      if (Array.isArray(msg)) {
        setMessageList(msg);
      } else {
        setMessageList((prevMessages) => [...prevMessages, msg]);
      }
    });

    mysocket.current.on("getPeople", (allUsers) => {
      const otherUsers = allUsers.filter((u) => u.id !== mysocket.current.id);
      setAllUsers(otherUsers);
    });

    return () => {
      mysocket.current.disconnect();
    };
  }, [user, setAllUsers]);

  const send = () => {
    if (message.trim()) {
      mysocket.current.emit("message", {
        str: message,
        checkid: mysocket.current.id,
        Usersender: user,
        type: "chatmessage",
      });
      setMessage("");
    }
  };

  return (
    <>
      {allUsers.length > 0 && (
        <Button
          title={`Users List (${allUsers.length})`}
          onPress={() => navigation.navigate("users_list")}
        />
      )}
      <ScrollView style={styles.scrollView} ref={scrollRef}>
        {messageList.map((msg, index) => (
          <View key={index}>
            {msg.type === "chatmessage" && (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  padding: 10,
                  justifyContent:
                    msg.checkid !== mysocket.current.id
                      ? "flex-start"
                      : "flex-end",
                }}
              >
                {msg.checkid !== mysocket.current.id && (
                  <TextAvatar
                    style={styles.TextAvatar}
                    backgroundColor={colorHash(msg.Usersender.FirstName).hex}
                    textColor={colorHash(msg.Usersender.LastName).hex}
                    size={Platform.OS === "web" ? 60 : 40}
                    type="circle"
                  >
                    {`${msg.Usersender.FirstName} ${msg.Usersender.LastName}`}
                  </TextAvatar>
                )}
                <Text
                  style={{
                    width: "70%",
                    color:
                      msg.checkid !== mysocket.current.id ? "red" : "green",
                    fontSize: 20,
                    padding: 20,
                    textAlign:
                      msg.checkid !== mysocket.current.id ? "left" : "right",
                    backgroundColor:
                      msg.checkid !== mysocket.current.id
                        ? "#FF7F7F"
                        : "lightgreen",
                  }}
                >
                  {msg.str}
                </Text>
                {msg.checkid === mysocket.current.id && (
                  <TextAvatar
                    style={styles.TextAvatar}
                    backgroundColor={colorHash(msg.Usersender.FirstName).hex}
                    textColor={colorHash(msg.Usersender.LastName).hex}
                    size={Platform.OS === "web" ? 60 : 40}
                    type="circle"
                  >
                    {`${msg.Usersender.FirstName} ${msg.Usersender.LastName}`}
                  </TextAvatar>
                )}
              </View>
            )}
            {(msg.type === "connectUser" || msg.type === "disconnectUser") && (
              <View style={styles.userjoinedleft}>
                <View style={styles.userjoined}>
                  <Text style={styles.userjoinedtext}>{msg.message}</Text>
                </View>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
      <View style={styles.bottomchat}>
        <View style={styles.InputChat}>
          <Input
            placeholder="type here"
            value={message}
            onKeyPress={handleKeyPress}
            onChangeText={setMessage}
            ref={input}
          />
        </View>
        <Button
          title="send"
          onPress={() => {
            send();
            input.current.focus();
          }}
        />
      </View>
    </>
  );
}
