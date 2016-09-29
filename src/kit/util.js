
const util = {
  makeWord: function(rowData) {
    const words = {};
    words[1] = ['已过天数', rowData.diffDays];
    words[2] = [`距${rowData.baseYear}周年天数`, rowData.baseDiff];
    words[3] = [rowData.is29 ?
      `距${rowData.newYearPer * 2}个10年天数` :
      `距${rowData.newYearPer}个10年天数`, rowData.newDiff];
    return words;
  },
};

export default util;
