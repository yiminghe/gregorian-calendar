var GregorianCalendar = require('../../');
var date = new GregorianCalendar(GregorianCalendar.locales['zh-cn']);
date.setTime(+new Date());
console.log(date.getDayOfWeek());