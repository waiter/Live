import Keys from './keys';
import {AsyncStorage} from 'react-native';
import moment from 'moment';
import Language from '../Language';

const datas = {
  start: 1,
  ids: ['a1'],
  datas: {
    a1: {
      title: 'xxx',
      time: moment().format('YYYY-MM-DD')
    }
  },
  dataResetTime: null,
  initData: function(allLocal) {
    const re = {};
    if (parseInt(allLocal[Keys.DATA_IS_OPENED] || '0', 10)) {
      datas.start = parseInt(allLocal[Keys.DATA_EVENT_START_ID], 10) || 1;
      datas.ids = JSON.parse(allLocal[Keys.DATA_EVENT_ID_LIST] || '[]');
      datas.datas = {};
      datas.ids.forEach(id => {
        const pk = JSON.parse(allLocal[Keys.DATA_EVENT_CONTENT_PRE + id] || '{}');
        if (pk.time && pk.title) {
          datas.datas[id] = datas.makeDataTime(pk);
        }
      });
    } else {
      datas.datas = {
        a1: {
          title: Language.datas.startApp,
          time: moment().format('YYYY-MM-DD')
        }
      };
      re[Keys.DATA_EVENT_START_ID] = '' + datas.start;
      re[Keys.DATA_EVENT_ID_LIST] = JSON.stringify(datas.ids);
      const idds = Object.keys(datas.datas);
      const newD = {};
      idds.forEach(id => {
        re[Keys.DATA_EVENT_CONTENT_PRE + id] = JSON.stringify({
          ...datas.datas[id]
        });
        newD[id] = datas.makeDataTime(datas.datas[id]);
      });
      datas.datas = newD;
      re[Keys.DATA_IS_OPENED] = '1';
    }
    datas.dataResetTime = moment();
    return re;
  },
  resetDatas: function() {
    datas.ids.forEach(id => {
      datas.datas[id] = datas.makeDataTime(datas.datas[id]);
    });
    datas.dataResetTime = moment();
  },
  makeDataTime: function(obj) {
    const re = {...obj};
    const date = moment(obj.time, 'YYYY-MM-DD').startOf('day');
    const now = moment().startOf('day');
    re.diffDays = now.diff(date, 'days');
    const minDiffYear = re.diffDays < 365 ? 1 : parseInt(re.diffDays / 365, 10);
    re.is29 = date.isLeapYear() && date.format('MM-DD') === '02-29';
    if (re.is29) {
      let start = parseInt(minDiffYear / 4, 10);
      let diff = moment(date).add(start, 'y').diff(now, 'days');
      while (diff < 0) {
        start += 4;
        diff = moment(date).add(start, 'y').diff(now, 'days');
      }
      re.baseYear = start;
      re.baseDiff = diff;
      let newY = parseInt(start / 20, 10) + (start % 20 == 0 ? 0 : 1);
      let newYD = moment(date).add(newY * 20, 'y');
      while (!newYD.isLeapYear()) {
        newY++;
        newYD = moment(date).add(newY * 20, 'y');
      }
      re.newYearPer = newY;
      re.newDiff = newYD.diff(now, 'days');
    } else {
      let start = minDiffYear;
      let diff = moment(date).add(start, 'y').diff(now, 'days');
      while (diff < 0) {
        start++;
        diff = moment(date).add(start, 'y').diff(now, 'days');
      }
      re.baseYear = start;
      re.baseDiff = diff;
      re.newYearPer = parseInt(start / 10, 10) + (start % 10 == 0 ? 0 : 1);
      re.newDiff = moment(date).add(re.newYearPer * 10, 'y').diff(now, 'days');
    }
    return re;
  },
  getCurrentDatas: function() {
    return {
      ids: datas.ids,
      datas: datas.datas
    };
  },
  addData: function(obj) {
    datas.start++;
    const cur = datas.start;
    const key = 'a' + cur;
    datas.ids.push(key);
    datas.datas[key] = datas.makeDataTime(obj);
    const re = {
      [Keys.DATA_EVENT_START_ID]: cur + '',
      [Keys.DATA_EVENT_ID_LIST]: JSON.stringify(datas.ids),
      [Keys.DATA_EVENT_CONTENT_PRE + key]: JSON.stringify(obj)
    }
    return re;
  },
  deleteData: function(key) {
    datas.ids = datas.ids.filter(it => it != key);
    delete datas.datas[key];
    const re = {
      [Keys.DATA_EVENT_ID_LIST]: JSON.stringify(datas.ids)
    }
    const del = Keys.DATA_EVENT_CONTENT_PRE + key;
    return [re, del];
  },
  editData: function(key, obj) {
    datas.datas[key] = datas.makeDataTime(obj);
    const re = {
      [Keys.DATA_EVENT_CONTENT_PRE + key]: JSON.stringify({
        title: obj.title,
        time: obj.time,
        iconId: obj.iconId
      })
    };
    return re;
  }
};

export default datas;
