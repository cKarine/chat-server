import { Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Input } from "@rneui/base";
import { faker } from "@faker-js/faker";
import TextAvatar from "react-native-text-avatar";
import { useUser, useSetUser } from "../contexts/CurrUserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colorHash } from "../utils/colorHash";
import { styles } from "../styles/styles";

export default function CreateUser({ navigation }) {
  const user = useUser();
  const setUser = useSetUser();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("Person_value");
      if (value !== null) {
        setUser(JSON.parse(value));
        navigation.navigate("second_screen");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    age: "",
    email: "",
    gender: "",
  });

  const handleSetRandomUser = () => {
    setUserData({
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      age: faker.number.int({ min: 10, max: 100 }),
      email: faker.internet.email(),
      gender: faker.person.sex(),
    });
  };

  const storeData = async (person) => {
    try {
      const jsonValue = JSON.stringify(person);
      await AsyncStorage.setItem("Person_value", jsonValue);
    } catch (e) {}
  };

  function handleSubmit() {
    const { firstname, lastname, age, gender, email } = userData;
    const newuser = {
      FirstName: firstname,
      LastName: lastname,
      Age: age,
      Gender: gender,
      Email: email,
    };
    setUser(newuser);

    storeData(newuser);

    setUserData({
      firstname: "",
      lastname: "",
      age: "",
      email: "",
      gender: "",
    });

    alert("created user successfully!");
    navigation.navigate("second_screen");
  }

  const { firstname, lastname, age, gender, email } = userData;

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Create User</Text>

      <TextAvatar
        backgroundColor={colorHash(userData.firstname).rgb}
        textColor={"#fff"}
        size={80}
        type={"circle"}
      >
        {userData.firstname + " " + userData.lastname}
      </TextAvatar>

      <View style={styles.inputs}>
        <Input
          style={styles.input}
          placeholder="FirstName"
          value={firstname}
          onChangeText={(firstname) => setUserData({ ...userData, firstname })}
        />
        <Input
          style={styles.input}
          placeholder="LastName"
          value={lastname}
          onChangeText={(lastname) => setUserData({ ...userData, lastname })}
        />
        <Input
          style={styles.input}
          placeholder="Age"
          value={age}
          onChangeText={(age) => setUserData({ ...userData, age })}
        />
        <Input
          style={styles.input}
          placeholder="Gender"
          value={gender}
          onChangeText={(gender) => setUserData({ ...userData, gender })}
        />
        <Input
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(email) => setUserData({ ...userData, email })}
        />
      </View>
      <View style={styles.button}>
        <Button title="Submit User" onPress={() => handleSubmit()} />
        <Button title="Random User" onPress={() => handleSetRandomUser()} />
      </View>
    </View>
  );
}
