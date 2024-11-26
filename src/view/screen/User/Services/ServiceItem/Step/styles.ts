import {StyleSheet} from "react-native";
import colors from "themes/colors";

export const stepStyles = StyleSheet.create({
  body: {
    backgroundColor: "white",
    flex: 1,
  },
  pressable: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.quartenary,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  callBtn: {
    marginRight: 10,
  },
  item: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: colors.onSecondaryDark,
    paddingBottom: 10,
    borderBottomWidth: 0.7,
    marginBottom: 20,
  },
  leftItem: {
    width: "70%",
  },
  rightItem: {
    width: "30%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  minus: {
    marginRight: 10,
    color: colors.primaryDark,
  },
  plus: {
    marginLeft: 10,
    color: colors.primaryDark,
  },
  /*textBtn: {
    ...defaultStyle.robotM15,
  },*/
});
