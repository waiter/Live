import format from 'format';
import Language from '../Language';

const util = {
  makeWord: function(rowData) {
    const words = {};
    if (rowData.isAd) {
      words[1] = ['xx','xx', false];
      words[2] = ['xx','xx', false];
      words[3] = ['xx','xx', false];
    } else {
      words[1] = [Language.datas.pastDays, rowData.diffDays, false];
      if (rowData.baseDiff == 0) {
        words[2] = [Language.datas.yearDaysH2, format(Language.datas.yearDaysH1, rowData.baseYear, util.getTh(rowData.baseYear)), true];
      } else {
        words[2] = [format(Language.datas.yearDays, rowData.baseYear, util.getTh(rowData.baseYear)), rowData.baseDiff, false];
      }
      const y10 = rowData.is29 ? rowData.newYearPer * 2 : rowData.newYearPer;
      if (rowData.newDiff == 0) {
        words[3] = [Language.datas.year10DaysH2, format(Language.datas.yearDaysH1, y10, util.getTh(y10)), true];
      } else {
        words[3] = [format(Language.datas.year10Days, y10, 'th'), rowData.newDiff, false];
      }
    }
    return words;
  },
  getTh: function(num) {
    let th = 'th';
    if (num == 1) {
      th = 'st';
    } else if (num == 2) {
      th = 'rd';
    }
    return th;
  }
};

export default util;
