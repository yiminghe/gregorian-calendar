# gregorian-calendar

gregorian calendar lib on browser and nodejs

[![date](https://nodei.co/npm/gregorian-calendar.png)](https://npmjs.org/package/gregorian-calendar)
[![NPM downloads](http://img.shields.io/npm/dm/gregorian-calendar.svg)](https://npmjs.org/package/gregorian-calendar)
[![Build Status](https://secure.travis-ci.org/kissyteam/gregorian-calendar.png?branch=master)](https://travis-ci.org/kissyteam/gregorian-calendar)
[![Coverage Status](https://img.shields.io/coveralls/kissyteam/gregorian-calendar.svg)](https://coveralls.io/r/kissyteam/gregorian-calendar?branch=master)
[![Dependency Status](https://gemnasium.com/kissyteam/gregorian-calendar.png)](https://gemnasium.com/kissyteam/gregorian-calendar)
[![Bower version](https://badge.fury.io/bo/gregorian-calendar.svg)](http://badge.fury.io/bo/gregorian-calendar)
[![node version](https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square)](http://nodejs.org/download/)


## use on node

```javascript
var GregorianCalendar = require('gregorian-calendar');
var date = new GregorianCalendar(require('gregorian-calendar/lib/locale/zh-cn')); // defaults to en-us
date.setTime(+new Date());
console.log(date.getDayOfWeek());
```