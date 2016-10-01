import format from 'format';
import Language from '../Language';

const util = {
  makeWord: function(rowData) {
    const words = {};
    let th = 'th';
    if (rowData.baseYear == 1) {
      th = 'st';
    } else if (rowData.baseYear == 2) {
      th = 'rd';
    }
    words[1] = [Language.datas.pastDays, rowData.diffDays];
    words[2] = [format(Language.datas.yearDays, rowData.baseYear, th), rowData.baseDiff];
    words[3] = [format(Language.datas.year10Days, rowData.is29 ? rowData.newYearPer * 2 : rowData.newYearPer),
      rowData.newDiff];
    return words;
  },
};

export default util;
