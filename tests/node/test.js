var GregorianCalendar = require('../../');
var date = new GregorianCalendar();
date.setTime(+new Date());
console.log(date.getDayOfWeek());