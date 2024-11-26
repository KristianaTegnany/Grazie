import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { StyleSheet } from 'react-native';
import colors from 'themes/colors';

const CELL_COUNT = 6;

type IProps = {
  disabled?: boolean;
  value: string;
  setValue: (value: string) => void;
  onValidate?: (value: string) => void;
};

const AppCode = ({ disabled, value, setValue, onValidate }: IProps) => {
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <SafeAreaView style={styles.root}>
      <CodeField
        ref={ref}
        {...props}
        editable={!disabled}
        //autoFocus={true}
        value={value}
        onChangeText={(text: string) => {
          setValue(text)
          if (text.length === CELL_COUNT && onValidate)
            onValidate(text)
        }}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <View
            onLayout={getCellOnLayoutHandler(index)}
            key={index}
            style={[styles.cellRoot, isFocused && styles.focusCell]}>
            <Text style={styles.cellText}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { padding: 20, minHeight: 100 },
  title: { textAlign: 'center', fontSize: 30 },
  codeFieldRoot: {
    marginTop: 20,
    width: 250,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cellRoot: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  cellText: {
    color: colors.onSecondaryDark,
    fontSize: 25,
    textAlign: 'center',
  },
  focusCell: {
    borderBottomColor: colors.primaryDark,
    borderBottomWidth: 2,
  },
});

export default AppCode;
