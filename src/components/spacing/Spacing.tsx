import * as React from 'react';
import {memo, type FC} from 'react';
import {View} from 'react-native';

type Props = {
  height?: number;
  width?: number;
};

const Spacing: FC<Props> = ({height = 0, width = 0}) => {
  return <View style={{height: height, width: width}} />;
};

export default memo(Spacing);
