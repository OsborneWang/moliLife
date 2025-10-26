import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { View } from './Themed';

interface DividerProps {
  /** 分割线高度，默认 0.5 */
  height?: number;
  /** 分割线颜色，默认 #E5E5E5 */
  color?: string;
  /** 水平边距，默认 10 */
  marginHorizontal?: number;
  /** 垂直边距，默认 0 */
  marginVertical?: number;
  /** 自定义样式 */
  style?: ViewStyle;
}

/**
 * 分割线组件
 * @param props DividerProps
 * @returns JSX.Element
 */
export const Divider: React.FC<DividerProps> = ({
  height = 0.5,
  color = '#E5E5E5',
  marginHorizontal = 10,
  marginVertical = 0,
  style,
}) => {
  return (
    <View
      style={[
        styles.divider,
        {
          height,
          backgroundColor: color,
          marginHorizontal,
          marginVertical,
        },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  divider: {
    width: '100%',
  },
});

export default Divider;