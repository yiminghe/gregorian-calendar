/* eslint no-console:0, strict:0 */

'use strict';

const GregorianCalendar = require('../../lib/gregorian-calendar');
const date = new GregorianCalendar(require('../../lib/locale/zh_CN'));
date.setTime(+new Date());
console.log(date.getDayOfWeek());
