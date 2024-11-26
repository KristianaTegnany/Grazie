import React from 'react';
import View from 'widget/Native/View';

type IProps = {
  width: number;
};

const LineProgress = (props: IProps) => {
  return (
    <View width={'80%'} sCenter marginV={10}>
      <View color='white' height={3} fullWidth border={1.5} />
      <View color='primary' border={1.5} height={3} width={`${props?.width}%`} absolute={1} top={0} left={0} />
    </View>
  );
};

export default LineProgress;
