import * as React from 'react';
import { Animated, FlatList, NativeModules, View, } from 'react-native';
import Pagination from './pagination';
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
export const Carousel = React.forwardRef(({ startIndex = 0, bounces, data, itemWidth, onSnapToItem, pagination, paginationColor, paginationType, renderItem, autoplay = false, autoplayDelay, placeholderContent, getCurrentIndex, customPagination, paginationPosition, paginationBackgroundColor, ...props }, ref) => {
    const [currentIndex, setCurrentIndex] = React.useState(startIndex);
    const [didReachEnd, setDidReachEnd] = React.useState(false);
    const slidesRef = React.useRef(null);
    const scrollX = React.useRef(new Animated.Value(0)).current;
    const viewabilityConfig = React.useRef({
        viewAreaCoveragePercentThreshold: 70,
        waitForInteraction: true,
    }).current;
    const onEndReacted = (info) => {
        var _a;
        setDidReachEnd(true);
        (_a = props.onEndReached) === null || _a === void 0 ? void 0 : _a.call(props, info);
    };
    const onViewableItemsChanged = React.useCallback(({ viewableItems }) => {
        if (viewableItems && viewableItems.length > 0) {
            const index = viewableItems[0].index;
            setCurrentIndex(index);
            if (index < (data === null || data === void 0 ? void 0 : data.length) - 1) {
                setDidReachEnd(false);
            }
        }
    }, [data]);
    const viewabilityConfigCallbackPairs = React.useRef([
        { viewabilityConfig, onViewableItemsChanged },
    ]);
    const getItemLayout = (_data, index) => ({
        length: itemWidth,
        offset: itemWidth * index,
        index,
    });
    const renderCustomPagination = () => {
        if (customPagination && !pagination && (data === null || data === void 0 ? void 0 : data.length) > 1) {
            return customPagination({ activeIndex: currentIndex });
        }
    };
    const scrollToIndex = ({ index, animated, ...otherProps }) => {
        var _a;
        (_a = slidesRef.current) === null || _a === void 0 ? void 0 : _a.scrollToIndex({
            animated,
            index,
            ...otherProps
        });
    };
    React.useImperativeHandle(ref, () => ({
        scrollToIndex
    }));
    React.useEffect(() => {
        onSnapToItem === null || onSnapToItem === void 0 ? void 0 : onSnapToItem(data[currentIndex]);
        getCurrentIndex === null || getCurrentIndex === void 0 ? void 0 : getCurrentIndex(currentIndex);
    }, [currentIndex, data, onSnapToItem, getCurrentIndex]);
    React.useEffect(() => {
        let timer;
        if (autoplay) {
            timer = setTimeout(() => {
                var _a, _b;
                if (didReachEnd) {
                    (_a = slidesRef.current) === null || _a === void 0 ? void 0 : _a.scrollToIndex({
                        index: 0,
                        animated: true,
                    });
                }
                else {
                    (_b = slidesRef.current) === null || _b === void 0 ? void 0 : _b.scrollToIndex({
                        index: currentIndex + 1,
                        animated: true,
                    });
                }
            }, autoplayDelay !== null && autoplayDelay !== void 0 ? autoplayDelay : 2500);
        }
        return () => clearTimeout(timer);
    }, [autoplay, autoplayDelay, currentIndex, didReachEnd]);
    return (React.createElement(React.Fragment, null,
        paginationPosition === 'top' && renderCustomPagination(),
        pagination && paginationPosition === 'top' && (data === null || data === void 0 ? void 0 : data.length) > 1 && (React.createElement(Pagination, { data: data, activeIndex: scrollX, paginationType: paginationType, color: paginationColor, paginationBackgroundColor: paginationBackgroundColor })),
        React.createElement(AnimatedFlatList, { ...props, ref: slidesRef, data: data, extraData: data, renderItem: (itemProps) => (React.createElement(View, { style: { width: itemWidth }, key: itemProps.index }, renderItem(itemProps))), onScroll: Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false }), ListEmptyComponent: () => (React.createElement(View, { style: { width: itemWidth } }, placeholderContent)), getItemLayout: getItemLayout, horizontal: true, pagingEnabled: true, bounces: bounces, showsHorizontalScrollIndicator: false, snapToInterval: itemWidth, snapToAlignment: 'start', renderToHardwareTextureAndroid: true, scrollEventThrottle: 32, decelerationRate: 0, style: { width: itemWidth }, viewabilityConfigCallbackPairs: viewabilityConfigCallbackPairs.current, onEndReached: onEndReacted, onEndReachedThreshold: 0.5, keyExtractor: (_, index) => index.toString(), initialScrollIndex: startIndex }),
        pagination && paginationPosition !== 'top' && (data === null || data === void 0 ? void 0 : data.length) > 1 && (React.createElement(Pagination, { data: data, activeIndex: scrollX, paginationType: paginationType, color: paginationColor, paginationBackgroundColor: paginationBackgroundColor })),
        paginationPosition !== 'top' && renderCustomPagination()));
});
export default NativeModules.RNBasicCarouselModule;
//# sourceMappingURL=index.js.map