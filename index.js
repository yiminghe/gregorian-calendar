module.exports = require('./lib/gregorian-calendar');
module.exports.locales = {
    'en-us': require('./lib/gregorian-calendar/i18n/en-us'),
    'zh-cn': require('./lib/gregorian-calendar/i18n/zh-cn')
};
module.exports.version = require('./package.json').version;