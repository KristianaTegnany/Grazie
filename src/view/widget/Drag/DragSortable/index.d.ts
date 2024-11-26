import React, {Component} from 'react';
import {
  NativeSyntheticEvent,
  NativeScrollEvent,
  StyleProp,
  ViewStyle,
} from 'react-native';

interface AnySizeIProps {
  dataSource: any[];
  keyExtractor: (item: any, index: number) => any;
  renderItem: (
    item: any,
    index: number | null,
    isMoved: boolean,
  ) => React.ReactElement<any>;
  onDataChange: (data: any[], callback) => void;
  renderHeaderView?: any;
  headerViewHeight?: number;
  renderBottomView?: any;
  bottomViewHeight?: number;
  autoThrottle?: number;
  autoThrottleDuration?: number;
  onDragEnd: () => void;
  scrollIndicatorInsets?: {
    top: number;
    left: number;
    bottom: number;
    right: number;
  };
  onScrollListener?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onScrollRef?: (ref: any) => void;
  areaOverlapRatio?: number;
  movedWrapStyle: StyleProp<ViewStyle>;
  childMarginTop?: number;
  childMarginBottom?: number;
  childMarginLeft?: number;
  childMarginRight?: number;
}

declare class AnySizeDragSortableView extends Component<AnySizeIProps> {}

export default AnySizeDragSortableView;
