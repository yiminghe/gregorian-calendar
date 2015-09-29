var GregorianCalendar = require('../../');
var date = new GregorianCalendar(require('../../src/locale/zh-cn'));
date.setTime(+new Date());
console.log(date.getDayOfWeek());