import * as React from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';
const { width } = Dimensions.get('window');
const Pagination = ({ activeIndex, color, data, paginationType, paginationBackgroundColor }) => {
    const styles = useStyle();
    const renderItems = () => {
        // const dotWidthFunc = () => {
        //   if (paginationType === 'circle') {
        //     return [8, 10, 8]
        //   }
        //   return [20, 35, 20]
        // }
        return data.map((_, i) => {
            const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
            // const dotWidth = activeIndex.interpolate({
            //   inputRange,
            //   outputRange: dotWidthFunc(),
            //   extrapolate: 'clamp',
            // })
            const dotWidth = paginationType === 'circle' ? 8 : 20;
            const opacity = activeIndex.interpolate({
                inputRange,
                outputRange: [0.2, 1, 0.2],
                extrapolate: 'clamp',
            });
            return (React.createElement(Animated.View, { style: [
                    styles.dot,
                    {
                        backgroundColor: color !== null && color !== void 0 ? color : '#667085',
                        width: dotWidth,
                        height: paginationType === 'circle' ? 8 : 4,
                        opacity,
                    },
                ], key: i.toString() }));
        });
    };
    return React.createElement(View, { style: [
            styles.dotContainer,
            !!paginationBackgroundColor && { backgroundColor: paginationBackgroundColor }
        ] }, renderItems());
};
export default Pagination;
const useStyle = () => {
    const styles = StyleSheet.create({
        dotContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
        },
        dot: {
            borderRadius: 7,
            marginHorizontal: 5,
        },
    });
    return styles;
};
//# sourceMappingURL=pagination.js.map