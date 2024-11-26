//import {memo} from 'react';
import { memo } from 'react';
import { Dimensions } from 'react-native';
import RenderHTML, { MixedStyleDeclaration } from 'react-native-render-html';
import normalize from 'services/utils/normalize';
import colors from 'themes/colors';
import fonts from 'themes/fonts';
import Button from './Button';
import { useSelector } from 'react-redux';
import { rootState } from 'store/reducer';
import useAppNavigator from 'hooks/useAppNavigator';
import routeName from 'routes/routeName';

const { width } = Dimensions.get('window')

type IProps = {
  center?: boolean;
  size?: number;
  rosha?: boolean;
  opacity?: number;
  color?: 'white' | 'black' | 'onSecondary' | 'onSecondaryLight' | 'onSecondaryDark' | 'textField' | 'textFieldLight';
  hexColor?: `#${string}`;
  letterSpacing?: number;
  light?: boolean;
  lineHeight?: number;
  marginV?: number;
  medium?: boolean;
  thin?: boolean;
  children: string;
}

const TextHtml = memo((props: IProps) => {
  const navigator = useAppNavigator();
  const { center, children, letterSpacing, lineHeight, medium, rosha, opacity, color, hexColor, light, size, thin, marginV } = props;

  const proMessaging = useSelector((s: rootState) => s.appReducer.burgerMenuDatas.translation.proMessaging);

  function LinkRenderer({ TDefaultRenderer, ...props }: any) {
    const onPress = () => navigator.navigate(routeName.user.chat as never);

    return props.tnode.domNode.attribs.href?.includes('//messagerie-pro') ?
      <Button
        flex
        marginH={20}
        marginT={10}
        marginB={10}
        onPress={onPress}
        text={proMessaging}
      /> : <TDefaultRenderer {...props} />
  }

  const fontSize = normalize(size || 17, true)

  const source = { html: (children || '').replaceAll('\n', '<br>') },
    systemFonts = [fonts.roboto, fonts.rosha],
    baseStyle: MixedStyleDeclaration = {
      fontWeight: medium ? '500' : (light ? '300' : (thin ? '100' : '400')),
      fontFamily: rosha ? fonts.rosha : fonts.roboto,
      fontSize,
      color: hexColor || colors[color || 'onSecondaryExtraDark'],
      textAlign: center ? 'center' : 'left',
      opacity: opacity || 1,
      marginVertical: normalize(marginV),
      letterSpacing,
      ...lineHeight ? { lineHeight: normalize(lineHeight) } : {}
    },
    tagsStyles = {
      big: {
        fontSize: normalize(17), // ??  17?
      },
      /*em: {
        fontSize: normalize(28),
      },*/
      p: {
        margin: 0
      }
    },
    defaultTextProps = {
      allowFontScaling: false
    },
    /*customHTMLElementModels = {
      'link': HTMLElementModel.fromCustomModel({
        tagName: 'div',
        contentModel: HTMLContentModel.block
      })
    },*/
    renderers = {
      a: LinkRenderer
    };

  return (
    <RenderHTML
      contentWidth={width}
      source={source}
      systemFonts={systemFonts}
      baseStyle={baseStyle}
      tagsStyles={tagsStyles}
      defaultTextProps={defaultTextProps}
      renderers={renderers}
    //customHTMLElementModels={customHTMLElementModels}
    />
  )
});

export default TextHtml;