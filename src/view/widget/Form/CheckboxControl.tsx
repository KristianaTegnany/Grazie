import React, { useEffect, useState } from 'react';
import { getFormFieldError } from 'services/utils';
import { Control, Controller } from 'react-hook-form';
import View from 'widget/Native/View';
import Text from 'widget/Native/Text';
import CheckBox from 'widget/Native/Checkbox';

type IProps = {
  text: string;
  checked?: boolean;
  onChecked?: Function;
  radio?: boolean;
  control: Control<any>;
  error: any;
  name: string;
  transparent?: boolean;
};

const CheckboxControl = (props: IProps) => {
  const [, setChecked] = useState<boolean>(props?.checked || false);
  const { error, name, control } = props;
  const hasError = getFormFieldError(error, name);

  useEffect(() => {
    setChecked(props?.checked || false);
  }, [props?.checked]);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <>
          <CheckBox text={props.text} value={value} onChecked={onChange} />
          <View marginB={10}>
            {hasError && (
              <Text color='error'>{hasError?.message}</Text>
            )}
          </View>
        </>
      )}
    />
  );
};

export default CheckboxControl;
