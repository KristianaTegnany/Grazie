import Toast, {
  BaseToast,
  ToastProps,

} from 'react-native-toast-message';
import Feather from 'react-native-vector-icons/Feather';
import { TouchableOpacity, View } from 'widget/Native';

import defaultStyle from 'themes/defaultStyle';
import colors from 'themes/colors';

const contentContainerStyle = { paddingHorizontal: 10 }
export const toastConfig = {
  success: (props: ToastProps) => (
    <BaseToast
      {...props}
      contentContainerStyle={contentContainerStyle}
      style={defaultStyle.toastSuccess}
      text1Style={defaultStyle.robotoB12}
      text2Style={defaultStyle.roboto12}
      text2NumberOfLines={4}
      renderTrailingIcon={() => <TouchableOpacity flex center onPress={() => Toast.hide()}>
        <Feather name="x" color={colors.onSecondaryLight} size={20} />
      </TouchableOpacity>}
      renderLeadingIcon={() => (
        <View center>
          <Feather name="check-circle" color={colors.success} size={25} />
        </View>
      )}
    />
  ),
  upgrade: (props: ToastProps) => (
    <BaseToast
      {...props}
      contentContainerStyle={contentContainerStyle}
      style={defaultStyle.toastUpgrade}
      text1Style={defaultStyle.robotoB14}
      text2Style={defaultStyle.roboto12}
      text2NumberOfLines={10}
      renderTrailingIcon={() => <TouchableOpacity flex center onPress={props.onPress}>
        <Feather name="download-cloud" color={colors.danger} size={25} />
      </TouchableOpacity>}
    />
  ),
  error: (props: ToastProps) => (
    <BaseToast
      {...props}
      contentContainerStyle={contentContainerStyle}
      style={defaultStyle.toastError}
      text1Style={defaultStyle.robotoB12}
      text2Style={defaultStyle.roboto12}
      text2NumberOfLines={4}
      renderTrailingIcon={() => <TouchableOpacity flex center onPress={Toast.hide}>
        <Feather name="x" color={colors.onSecondaryLight} size={20} />
      </TouchableOpacity>}
      renderLeadingIcon={() => (
        <View center>
          <Feather name="x-circle" color={colors.danger} size={25} />
        </View>
      )}
    />
  ),
};