import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import colors from 'themes/colors';

const AppLoading = ({ style }: any) => {
  return (
    <View style={style || styles.container}>
      <ActivityIndicator size="large" color={colors.onSecondary} />
    </View>
  );
};

export default AppLoading;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0,
    // backgroundColor: colors.blackTransparent,
    // zIndex: 10,
  },
});
