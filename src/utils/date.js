const dateUtil = {
  format(dateVal, formatter) {
    const date = new Date(dateVal);

    let fmt = formatter;
    const o = {
      'M+': date.getMonth() + 1, // 月份
      '[Dd]+': date.getDate(), // 日
      '[Hh]+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      S: date.getMilliseconds(), // 毫秒
    };

    if (/([Yy]+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, `${date.getFullYear()}`.substr(4 - RegExp.$1.length));
    }

    Object.keys(o)
      .forEach((k) => {
        if (new RegExp(`(${k})`).test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ?
            (o[k]) :
            (`00${o[k]}`.substr(`${o[k]}`.length)));
        }
      });

    return fmt;
  },
};

export default dateUtil;
