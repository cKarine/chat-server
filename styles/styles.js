import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
    alignItems: "center",
    display: "flex",
  },
  input: {
    height: 40,
    width: 180,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
  },
  rowView: {
    flexDirection: "row",
    alignItems: "center",
  },
  columnView: {
    flexDirection: "column",
    marginLeft: 10,
  },
  mainView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  userContainer: {
    flex: 1,
    padding: 10,
    margin: 10,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 15,
  },
  profileView: {
    paddingTop: 50,
    margin: 10,
    alignItems: "center",
  },
  button: {
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  createButton: {
    backgroundColor: "#55088D",
  },
  randomButton: {
    backgroundColor: "#8852af",
  },
  buttonText: {
    color: "white",
    fontSize: 14,
  },
  profileText: {
    fontWeight: "bold",
  },
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
  userjoined: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    padding: 10,
    backgroundColor: "gray",
    width: "40%",
    borderRadius: 20,
  },
  userjoinedtext: {
    width: "70%",
    color: "black",
    style: "solid",
    fontSize: 20,
    padding: 20,
    textAlign: "center",
  },
  userjoinedleft: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    padding: 10,
  },
});
