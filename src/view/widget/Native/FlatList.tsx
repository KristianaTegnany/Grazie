import React, { ReactNode, Ref, /*memo,*/ useCallback } from 'react';
import { FlatListProps, FlatList as RNFlatList, ScrollViewProps } from 'react-native';
import View from './View';
import ActivityIndicator from './ActivityIndicator';
import { ScrollView } from 'react-native-gesture-handler';
import normalize from 'services/utils/normalize';

type IProps = FlatListProps<any> & {
  color?: 'white',
  horizontal?: boolean;
  flex?: boolean;
  carousel?: boolean;
  padding?: number;
  paddingH?: number;
  paddingV?: number;
  paddingT?: number;
  paddingB?: number;
  width?: number;
  height?: number;
  infiniteScroll?: boolean;
  keyExtractor?: (item: any, index: number) => string;
  loading?: boolean;
  numColumns?: number;
  forwardRef?: Ref<RNFlatList>;
  renderFooter?: ReactNode;
};

const FooterComponent = ({ loading, renderFooter }: { loading?: boolean, renderFooter?: ReactNode }) => {
  return (
    <>
      {loading && <ActivityIndicator paddingT={10} paddingB={20} />}
      {renderFooter}
    </>
  )
} //, (prev, next) => prev.loading === next.loading)

const FlatList = (props: IProps) => {
  const { color, horizontal, data, height, infiniteScroll, loading, padding,
    paddingH,
    paddingV,
    paddingB,
    paddingT, renderFooter } = props;
  const style = props.flex ? { flex: 1 } : {}
  const contentContainerStyle = {
    paddingBottom: normalize(paddingB),
    paddingTop: normalize(paddingT),
    paddingHorizontal: normalize(paddingH),
    paddingVertical: normalize(paddingV),
    padding: normalize(padding)
  }

  const { flex, forwardRef, ListFooterComponent, keyExtractor, renderScrollComponent, ...flatlistProps } = props

  const isLoading = infiniteScroll && (data || []).length > 0 && loading
  const defaultKeyExtractor = useCallback((item: any) => item.id, [])
  const customRenderScrollComponent: any = horizontal ? (p: ScrollViewProps) => <ScrollView {...p} /> : renderScrollComponent

  return (
    <View height={height} color={color} flex={flex}>
      <RNFlatList ref={forwardRef} bounces={false} contentContainerStyle={contentContainerStyle} style={style} /*removeClippedSubviews={true} maxToRenderPerBatch={5}*/ onStartReachedThreshold={0.2} onEndReachedThreshold={0.2} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} horizontal={horizontal}
        keyExtractor={keyExtractor || defaultKeyExtractor}
        ListFooterComponent={ListFooterComponent || <FooterComponent loading={isLoading} renderFooter={renderFooter} />}
        {...flatlistProps}
        renderScrollComponent={customRenderScrollComponent}
      />
    </View>
  );
}

export default FlatList;