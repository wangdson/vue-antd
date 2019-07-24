/**
 * 空闲控制 返回函数连续调用时，空闲时间必须大于或等于 wait，func 才会执行
 *
 * @param  {function} func        传入函数
 * @param  {number}   wait        表示时间窗口的间隔
 * @param  {boolean}  immediate   设置为ture时，调用触发于开始边界而不是结束边界
 * @return {function}             返回客户调用函数
 */
export default function debounce(func, wait, immediate) {
  let timeout, args, context, result;
  let timestamp = 0;
  const later = function() {
    const now = +new Date();
    // 据上一次触发时间间隔
    const last = now - timestamp;
    // 下次触发 func 剩余的时间
    const remaining = wait - last;
    // 如果没有剩余的时间了或者你改了系统时间
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    } else {
      timeout = setTimeout(later, remaining);
    }
  };

  /**
   * 防抖操作实现
   */
  const debounced = function() {
    const now = +new Date();
    context = this;
    args = arguments;
    timestamp = now;
    // 是否立即执行
    const callNow = immediate && !timeout;

    // 如果延时不存在，重新设定延时
    if (!timeout) {
      timeout = setTimeout(later, wait);
    }
    // 如果没有剩余的时间了或者你改了系统时间
    if (callNow) {
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    }
    return result;
  };
  return debounced;
}
