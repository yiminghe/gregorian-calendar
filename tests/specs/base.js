/**
 * tests for gregorian gregorianCalendar
 * @author yiminghe@gmail.com
 */

const GregorianCalendar = require('../../');
const ONE_SECOND = 1000;
const ONE_MINUTE = 60 * ONE_SECOND;
const ONE_HOUR = 60 * ONE_MINUTE;
const ONE_DAY = 24 * ONE_HOUR;
const expect = require('expect.js');
// const ONE_WEEK = 7 * ONE_DAY;

describe('GregorianCalendar', () => {
  describe('simple case', () => {
    let gregorianCalendar;

    beforeEach(() => {
      gregorianCalendar = new GregorianCalendar(require('../../src/locale/zh_CN'));
      gregorianCalendar.set(2013,
        GregorianCalendar.JUNE, 8, 18, 0, 0, 0);
    });

    it('time works', () => {
      expect(gregorianCalendar.getYear()).to.be(2013);
      expect(gregorianCalendar.getMonth()).to.be(5);
      expect(gregorianCalendar.getDayOfMonth()).to.be(8);
      expect(gregorianCalendar.getHourOfDay()).to.be(18);
      expect(gregorianCalendar.getMinutes()).to.be(0);
      expect(gregorianCalendar.getSeconds()).to.be(0);
      expect(gregorianCalendar.getMilliseconds()).to.be(0);
    });

    it('compareToDay works', () => {
      const other = new GregorianCalendar(require('../../src/locale/zh_CN'));
      other.set(2013,
        GregorianCalendar.JUNE, 8, 18, 30, 0, 0);
      expect(gregorianCalendar.compareToDay(other)).to.be(0);
      other.set(2013,
        GregorianCalendar.JUNE, 9, 19, 0, 0, 0);
      expect(gregorianCalendar.compareToDay(other)).to.be(-1);
      other.set(2013,
        GregorianCalendar.JUNE, 7, 17, 0, 0, 0);
      expect(gregorianCalendar.compareToDay(other)).to.be(1);
    });

    describe('WEEK_OF_YEAR works', () => {
      it('works for zh-cn', () => {
        expect(gregorianCalendar.getWeekOfYear()).to.be(23);
      });

      it('works for start of year', () => {
        gregorianCalendar.setYear(2012);
        gregorianCalendar.setMonth(0);
        gregorianCalendar.setDayOfMonth(1);
        expect(gregorianCalendar.getWeekOfYear()).to.be(1);
      });

      it('works for start of year for setFirstDayOfWeek2', () => {
        gregorianCalendar.setYear(2012);
        gregorianCalendar.setMonth(0);
        gregorianCalendar.setDayOfMonth(1);
        gregorianCalendar.setFirstDayOfWeek(GregorianCalendar.THURSDAY);
        expect(gregorianCalendar.getWeekOfYear()).to.be(1);
      });

      it('works for start of year 2', () => {
        gregorianCalendar.setYear(2011);
        gregorianCalendar.setMonth(0);
        gregorianCalendar.setDayOfMonth(1);
        expect(gregorianCalendar.getWeekOfYear()).to.be(1);
      });

      it('works for end of year', () => {
        gregorianCalendar.setYear(2011);
        gregorianCalendar.setMonth(11);
        gregorianCalendar.setDayOfMonth(31);
        expect(gregorianCalendar.getWeekOfYear()).to.be(1);
      });

      it('works for end of year', () => {
        gregorianCalendar.setYear(2012);
        gregorianCalendar.setMonth(11);
        gregorianCalendar.setDayOfMonth(31);
        expect(gregorianCalendar.getWeekOfYear()).to.be(1);
        expect(gregorianCalendar.getWeekYear()).to.be(2013);
      });

      it('works for ISO 8601', () => {
        gregorianCalendar.setYear(2012);
        gregorianCalendar.setMonth(0);
        gregorianCalendar.setDayOfMonth(1);
        gregorianCalendar.setMinimalDaysInFirstWeek(4);
        expect(gregorianCalendar.getWeekOfYear()).to.be(52);
        expect(gregorianCalendar.getWeekYear()).to.be(2011);
      });
    });

    it('DAY_OF_WEEK works', () => {
      expect(gregorianCalendar.getDayOfWeek()).to.be(GregorianCalendar.SATURDAY);
    });

    describe('WEEK_OF_MONTH', () => {
      it('simply works', () => {
        expect(gregorianCalendar.getWeekOfMonth()).to.be(2);
        gregorianCalendar.setDayOfMonth(1);
        expect(gregorianCalendar.getWeekOfMonth()).to.be(1);
        gregorianCalendar.setDayOfMonth(3);
        expect(gregorianCalendar.getWeekOfMonth()).to.be(2);
        gregorianCalendar.setYear(2011);
        gregorianCalendar.setMonth(11);
        gregorianCalendar.setDayOfMonth(31);
        gregorianCalendar.setFirstDayOfWeek(GregorianCalendar.MONDAY);
        expect(gregorianCalendar.getWeekOfMonth()).to.be(5);
        gregorianCalendar.setFirstDayOfWeek(GregorianCalendar.THURSDAY);
        expect(gregorianCalendar.getWeekOfMonth()).to.be(5);
      });

      // For example, if getFirstDayOfWeek() is SUNDAY and getMinimalDaysInFirstWeek() is 4,
      // then the first week of January 1998 is Sunday, January 4 through Saturday, January 10.
      // These days have a WEEK_OF_MONTH of 1.
      // Thursday, January 1 through Saturday, January 3 have a WEEK_OF_MONTH of 0.
      // If getMinimalDaysInFirstWeek() is changed to 3,
      // then January 1 through January 3 have a WEEK_OF_MONTH of 1.

      it('getMinimalDaysInFirstWeek 1', () => {
        gregorianCalendar.set(1998, GregorianCalendar.JANUARY, 1);
        gregorianCalendar.setFirstDayOfWeek(GregorianCalendar.SUNDAY);
        gregorianCalendar.setMinimalDaysInFirstWeek(4);
        expect(gregorianCalendar.getWeekOfMonth()).to.be(0);
      });

      it('getMinimalDaysInFirstWeek 1', () => {
        gregorianCalendar.set(1998, GregorianCalendar.JANUARY, 1);
        gregorianCalendar.setFirstDayOfWeek(GregorianCalendar.SUNDAY);
        gregorianCalendar.setMinimalDaysInFirstWeek(3);
        expect(gregorianCalendar.getWeekOfMonth()).to.be(1);
      });
    });

    describe('DAY_OF_WEEK_IN_MONTH', () => {
      it('simply works', () => {
        expect(gregorianCalendar.getDayOfWeekInMonth()).to.be(2);

        gregorianCalendar.set(2013, GregorianCalendar.APRIL, 7, 18, 0, 0);

        expect(gregorianCalendar.getDayOfWeekInMonth()).to.be(1);
      });

      // does not affect DAY_OF_WEEK_IN_MONTH
      it('getMinimalDaysInFirstWeek 1', () => {
        gregorianCalendar.set(1998, GregorianCalendar.JANUARY, 1);
        gregorianCalendar.setFirstDayOfWeek(GregorianCalendar.SUNDAY);
        gregorianCalendar.setMinimalDaysInFirstWeek(4);
        expect(gregorianCalendar.getDayOfWeekInMonth()).to.be(1);
      });

      it('getMinimalDaysInFirstWeek 1', () => {
        gregorianCalendar.set(1998, GregorianCalendar.JANUARY, 1);
        gregorianCalendar.setFirstDayOfWeek(GregorianCalendar.SUNDAY);
        gregorianCalendar.setMinimalDaysInFirstWeek(3);
        expect(gregorianCalendar.getDayOfWeekInMonth()).to.be(1);
      });
    });

    it('getTime works', () => {
      const jsDate = new Date(2013, GregorianCalendar.JUNE, 8, 18, 0, 0, 0);
      expect(jsDate.getTime() === gregorianCalendar.getTime());
    });

    it('DAY_OF_YEAR works', () => {
      const jan1Date = new Date(2013, GregorianCalendar.JANUARY, 1, 0, 0, 0, 0);
      const jsDate = new Date(gregorianCalendar.getTime());
      const expected = parseInt((jsDate.getTime() - jan1Date.getTime()) / ONE_DAY, 10) + 1;
      expect(gregorianCalendar.getDayOfYear()).to.be(expected);
    });

    it('WEEK_OF_YEAR works', () => {
      const gregorianCalendar2 = new GregorianCalendar();
      gregorianCalendar2.setYear(1);
      gregorianCalendar2.setDayOfWeek(GregorianCalendar.TUESDAY);
      gregorianCalendar2.setWeekOfYear(1);
      expect(gregorianCalendar2.getYear()).to.be(1);
      expect(gregorianCalendar2.getDayOfWeek()).to.be(GregorianCalendar.TUESDAY);
      expect(gregorianCalendar2.getDayOfMonth()).to.be(2);
    });
  });

  describe('add works', () => {
    it('can adjust DAY_OF_MONTH', () => {
      const d = new GregorianCalendar();
      d.set(2012, GregorianCalendar.JANUARY, 31);
      d.addMonth(1);
      expect(d.getYear()).to.be(2012);
      expect(d.getMonth()).to.be(GregorianCalendar.FEBRUARY);
      expect(d.getDayOfMonth()).to.be(29);
      // 2012-2-28
    });

    it('can adjust YEAR', () => {
      const d = new GregorianCalendar();
      d.set(2012, GregorianCalendar.JANUARY, 31);
      d.addMonth(13);
      expect(d.getYear()).to.be(2013);
      expect(d.getMonth()).to.be(GregorianCalendar.FEBRUARY);
      expect(d.getDayOfMonth()).to.be(28);
      // 2012-2-28
    });
  });

  describe('roll works', () => {
    it('can adjust DAY_OF_MONTH', () => {
      const d = new GregorianCalendar();
      d.set(1999, GregorianCalendar.AUGUST, 31);
      d.rollMonth(8);
      expect(d.getYear()).to.be(1999);
      expect(d.getMonth()).to.be(GregorianCalendar.APRIL);
      expect(d.getDayOfMonth()).to.be(30);
      // 2012-2-28
    });

    it('can roll to begin', () => {
      const d = new GregorianCalendar();
      d.set(1999, GregorianCalendar.JUNE, 1);
      d.rollWeekOfMonth(-1);
      expect(d.getYear()).to.be(1999);
      expect(d.getMonth()).to.be(GregorianCalendar.JUNE);
      expect(d.getDayOfMonth()).to.be(29);
      // 2012-2-28
    });

    it('rollSet works', () => {
      let d = new GregorianCalendar();
      d.set(2015, GregorianCalendar.SEPTEMBER, 29);
      d.setMonth(GregorianCalendar.FEBRUARY);
      expect(d.getYear()).to.be(2015);
      expect(d.getMonth()).to.be(GregorianCalendar.MARCH);
      expect(d.getDayOfMonth()).to.be(1);
      d = new GregorianCalendar();
      d.set(2015, GregorianCalendar.SEPTEMBER, 29);
      d.rollSetMonth(GregorianCalendar.FEBRUARY);
      expect(d.getYear()).to.be(2015);
      expect(d.getMonth()).to.be(GregorianCalendar.FEBRUARY);
      expect(d.getDayOfMonth()).to.be(28);
    });
  });
});
