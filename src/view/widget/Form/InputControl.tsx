import React from 'react';
import { getFormFieldError } from 'services/utils';
import { Control, Controller } from 'react-hook-form';
import View from 'widget/Native/View';
import Text from 'widget/Native/Text';
import Input, { IInputProps } from 'widget/Native/Input';
import { NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';

type IProps = IInputProps & {
  control: Control<any>;
  error?: any;
  noTextError?: boolean;
  name: string;
  onFocus?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
};

const InputControl = (props: IProps) => {
  const { control, error, noTextError, name } = props;
  const hasError = getFormFieldError(error, name);

  return (
    <View marginB={25} fullWidth>
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange, onBlur } }) => <Input value={value} hasError={noTextError && hasError} zip={name === 'zip_code'} onChange={onChange} onBlur={onBlur} {...props} />}
      />
      {!noTextError && hasError && (
        <Text color='error' marginL={10}>
          {hasError?.type === 'required'
            ? '* Champ obligatoire'
            : hasError?.message}
        </Text>
      )}
    </View>
  );
};

export default InputControl;
