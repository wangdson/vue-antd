import { handleError } from './error';
import { config } from '../config';
import to from './promiseWrapper';

function toStr(obj) {
  return Object.prototype.toString.call(obj);
}

export function isArray(obj) { return toStr(obj) === '[object Array]'; }
export function isDate(obj) { return toStr(obj) === '[object Date]'; }
export function isRegExp(obj) { return toStr(obj) === '[object RegExp]'; }
export function isError(obj) { return toStr(obj) === '[object Error]'; }
export function isSymbol(obj) { return toStr(obj) === '[object Symbol]'; }
export function isString(obj) { return toStr(obj) === '[object String]'; }
export function isNumber(obj) { return toStr(obj) === '[object Number]'; }
export function isBoolean(obj) { return toStr(obj) === '[object Boolean]'; }
export function isObject(obj) { return toStr(obj) === '[object Object]'; }

export function isEmpty(obj) {
  if (typeof obj === 'undefined' || obj === null || obj === '') {
    return true;
  } else {
    return false;
  }
}

/**
 * 判断是否是金额数字
 * @param {*} money 价格
 * @param {*} noPoint 是否校验有小数点
 */
export function isMoney(money, noPoint = false) {
  const moneyReg = /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/;
  const noPointMoneyReg = /((^[1-9]\d*)|^0)$/;
  if (noPoint) {
    return moneyReg.test(money);
  }
  return noPointMoneyReg.test(money);
}

/**
 * 将一个对象解析成查询字符串
 */
export function toQueryStr(obj, append = false) {
  const arr = [];
  for (const key in obj) {
    arr.push(`${key}=${encodeURIComponent(obj[key])}`);
  }
  return `${!append ? '?' : '&'}${arr.join('&')}`;
  // return "?" + JSON.stringify(obj).replace(/{|}|\"|\'/g, "").
  //     replace(/,/g, "&").replace(/:/g, "=");
}

/**
 * 将url里面query的数值进行解码
 */
export function decodeQueryObj(query = {}) {
  const newQuery = {};
  for (const key in query) {
    newQuery[key] = decodeURIComponent(query[key]);
  }
  return newQuery;
}

/**
* 时间显示调整
*/
export function formatTime(str) {
  if (!str) return;
  //
  if (str.indexOf('.') > -1) {
    str = str.substring(0, str.indexOf('.'));
  }

  return str;
}

/**
 *
 * 获取总金额
 *
*/
export function getTotalMoney(query) {
  const punishMoney = query.punishMoney ? parseInt(query.punishMoney) : 0;
  const punishLateMoney = query.punishLateMoney ? parseInt(query.punishLateMoney) : 0;
  return formatMoney(punishMoney + punishLateMoney);
}

// 处理金额
export function formatMoney(money) {
  if (!money) { return 0; }
  if (money && (money = parseFloat(money))) {
    money = Number(money / 100).toFixed(2);
  }
  return money;
}

/*
 * 判断一个字段是否字符串为空
*/
function estimateNull(filed) {
  if (filed === `null` || filed === `undefined`) {
    return ``;
  }
  return filed;
}

export function apiFailBack(res) {
  my.hideToast();
  handleError(res);
}

export const checkTel = (tel, type = '') => {
  const isPhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
  const isMob = /^((\+?86)|(\(\+86\)))?(1[0-9]{10})$/;
  return !type ? isMob.test(tel) || isPhone.test(tel) : (type === 'mobile' ? isMob.test(tel) : isPhone.test(tel));
};

// uploadImage
export function uploadImageHandle(tempImagePath) {
  return new Promise(resolve => {
    const param = {
      data: tempImagePath, // base64编码过的图片字节流 或 图片的文件URL“file://xxxx”
      dataType: 'fileURL', // 指定上传时使用的是字节流还是绝对物理路径，'dataURL'-字节流，‘fileURL'-文件URL，默认为'dataURL'
      // 可选，默认为4。 0-低质量，1-中质量，
      // 2-高质量，3-不压缩，4-根据网络情况自动选择
      compress: 2,
      business: config.ATFSBizCode, // 可选， 默认为“NebulaBiz”
    };

    my.call('uploadImage', {
      ...param,
    }, (res) => {
      const { errorMessage, multimediaID } = res;
      if (!multimediaID) {
        my.alert({
          content: `上传文件失败,${errorMessage || '请重试'}`,
          buttonText: '确定',
        });
      }
      resolve(multimediaID || '');
    });
  });
}
// downloadImage
export function downloadImage(multimediaID) {
  return new Promise(resolve => {
    my.call('downloadImage', {
      multimediaID, // multimediaId： 可以是url，id， base64(带有image**base64头部的)
      business: 'multimedia', // 该项业务存储标识 可选， 默认为“NebulaBiz”
      // width: 1200,
      // height: 500,
      match: 1, // 必选，默认为0。0-等比缩放 1-大图 2-原图 3-非等比裁剪
      quality: 80,
    }, result => {
      resolve(result);
    });
  });
}
/**
 * 判断是否是空对象
 * @param {*} obj
 */
export function isEmptyObject(obj) {
  let name;
  for (name in obj) {
    return false;
  }
  return true;
}

/**
 * 比较2个数据是否一致
 * @param {*} obj1
 * @param {*} obj2
 */
export function diff(obj1, obj2) {
  const diffObj1 = typeof obj1 + JSON.stringify(obj1);
  const diffObj2 = typeof obj2 + JSON.stringify(obj2);
  return diffObj1 !== diffObj2;
}

/**
 * 将地址对象拼接为详细地址字符串
 * @param {*} obj1
 * @param {*} obj2
 */
export function getAddress(obj = {}) {
  const address = `${obj.provinceName}${obj.cityName}${obj.districtName}${obj.address}`;
  return address;
}

function convertDateToString(date = new Date()) {
  const tempDate = new Date(date.getTime() + 8 * 3600 * 1000); // 增加8小时
  const currDate = tempDate.toJSON().substring(0, 19);
  return currDate;
}

/**
 * 将date 返回yyyyMMddHHmmss
 * @param {*} date 传入一个日期
 */
export function convertDateToYYMMSS(date = new Date()) {
  const currDate = convertDateToString(date);
  return currDate.replace(/-|:|T/g, '');
}

export const isFunction = fn => typeof fn === 'function';

/**
 * promisefy 实现类
 * @param {*} fn 调用函数
 * @param {*} args 传参
 */
export const promisefy = (fn) => (...args) => to(new Promise((resolve, reject) => {
  let options = {
    success: function(...successArgs) {
      resolve(...successArgs);
    },
    fail: function(...failArgs) {
      // eslint-disable-next-line
      reject(...failArgs);
    },
  };
  let reqArgs;
  if (args.length > 0) {
    const lastArgs = args[args.length - 1];
    // 判断当前字段是否是回调函数数据,如果是回调函数，则将最后一个对象进行混合输出
    if (isObject(lastArgs) && (isFunction(lastArgs.success) || isFunction(lastArgs.fail))) {
      options = {
        ...lastArgs,
        ...options,
      };
      reqArgs = args.slice(0, args.length - 1);
    } else {
      reqArgs = args.slice(0, args.length);
    }
  }
  // 重新拼接请求字段
  reqArgs = [
    ...reqArgs || [],
    options,
  ];
  fn(...reqArgs);
}));
