import * as React from 'react';
import {memo} from 'react';
import {type StyleProp, type ViewStyle} from 'react-native';
import {type Source} from 'react-native-fast-image';
import {EmailIcon, EyeOffIcon, EyeOnIcon, PasswordIcon} from '../assets/images';

export enum IconName {
  ICON_PASSWORD,
  ICON_EYE_OFF,
  ICON_EMAIL,
  ICON_EYE_ON,
}

interface Props {
  style?: StyleProp<ViewStyle>;
  name?: IconName | Source | String;
  fill?: string;
  width?: number | string;
  height?: number | string;
}

const Icon = (props: Props) => {
  const {name, ...rest} = props;

  switch (name) {
    case IconName.ICON_PASSWORD:
      return <PasswordIcon {...rest} />;
    case IconName.ICON_EYE_ON:
      return <EyeOnIcon {...rest} />;
    case IconName.ICON_EYE_OFF:
      return <EyeOffIcon {...rest} />;
    case IconName.ICON_EMAIL:
      return <EmailIcon {...rest} />;
    default:
      return <React.Fragment />;
  }
};

export default memo(Icon);
