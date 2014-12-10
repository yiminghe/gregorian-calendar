var GregorianCalendar = require('../../');
var date = new GregorianCalendar(require('../../lib/locale/zh-cn'));
date.setTime(+new Date());
console.log(date.getDayOfWeek());