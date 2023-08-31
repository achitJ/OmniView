export const debounceFn = (fn: any, delay: number) => {
    let timerId: NodeJS.Timeout;
    return (...args: any[]) => {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}