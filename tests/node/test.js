var GregorianCalendar = require('../../');
var date = new GregorianCalendar(require('../../src/locale/zh_CN'));
date.setTime(+new Date());
console.log(date.getDayOfWeek());