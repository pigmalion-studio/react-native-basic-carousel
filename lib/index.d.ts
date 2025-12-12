import * as React from 'react';
import { FlatListProps, ListRenderItem } from 'react-native';
export interface CarouselProps extends FlatListProps<{}> {
    startIndex: number;
    data: Array<{}>;
    renderItem: ListRenderItem<any>;
    onSnapToItem?: (item: any) => void;
    itemWidth: number;
    bounces?: boolean;
    pagination?: boolean;
    paginationColor?: string;
    paginationType?: 'default' | 'circle';
    autoplay?: boolean;
    autoplayDelay?: number;
    placeholderContent?: React.ReactNode;
    getCurrentIndex?: (value: number) => void;
    customPagination?: ({ activeIndex }: {
        activeIndex: number;
    }) => React.ReactNode;
    paginationPosition?: 'top' | 'bottom';
    paginationBackgroundColor?: string;
}
export declare const Carousel: React.FC<CarouselProps>;
declare const _default: any;
export default _default;
