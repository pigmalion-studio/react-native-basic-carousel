import * as React from 'react';
import { Animated } from 'react-native';
interface PaginationProps {
    data: {}[];
    activeIndex: Animated.Value;
    color?: string;
    paginationType?: 'default' | 'circle';
    paginationBackgroundColor?: string;
}
declare const Pagination: React.FC<PaginationProps>;
export default Pagination;
