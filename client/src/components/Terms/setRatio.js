export function setRatio(windowWidth, wrapperDom) {
    if (windowWidth < 576) {
        return 'ratio-7';
    } else if (windowWidth < 768) {
        return 'ratio-8'
    } else if (windowWidth < 992) {
        return 'ratio-9'
    } else {
        return 'ratio-10'
    }
}