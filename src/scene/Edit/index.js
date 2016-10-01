import React, {Component} from 'react';
import BindComponent from '../../components/BindComponent';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  ScrollView,
  TextInput,
} from 'react-native';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';
import DataHelper from '../../data/helper';
import Events from '../../data/events';
import ReduxActions from '../../redux/actions';
import { connect } from 'react-redux';
import ImageHelper from '../../data/image';
import Constant from '../../constant';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DatePicker from 'rmc-date-picker';
import Language from '../../Language';

const bindThing = [
  'onDone',
  'renderIcons',
  'onBack'
];

class Edit extends BindComponent {
  constructor(props) {
    super(props, bindThing);
    const rowData = this.props.rowData || {};
    this.state = {
      rowKey: this.props.rowKey || '',
      iconId: rowData.iconId || 0,
      dateShow: false,
      monDate: rowData.time ? moment(rowData.time, 'YYYY-MM-DD') : moment(),
      text: rowData.title || Language.datas.defaultTitle,
    };
    this.minDate = moment('1900-01-01', 'YYYY-MM-DD');
    this.maxDate = moment();
    this.needReset = true;
  }

  async onDone() {
    this.refs.textInput.blur();
    const nowData = {
      title: this.state.text || Language.datas.defaultTitle,
      time: this.state.monDate.format('YYYY-MM-DD'),
      iconId: this.state.iconId
    }
    const need = this.state.rowKey.length > 0 ?
      Events.editData(this.state.rowKey, nowData) :
      Events.addData(nowData);
    const dispatch = this.props.dispatch;
    try {
      await DataHelper.saveDatasAsync(need);
      dispatch(ReduxActions.eventRestData(Events.getCurrentDatas()));
      this.needReset = true;
      Actions.pop();
    } catch (err) {
      console.log(e);
    }
  }

  onBack() {
    this.refs.textInput.blur();
    this.needReset = true;
    Actions.pop();
  }

  componentWillMount () {
    this.needReset = false;
    Actions.refresh({
      rightButtonImage: ImageHelper.done,
      backButtonImage: ImageHelper.arrowBack,
      onRight: this.onDone,
      title: this.state.rowKey.length > 0 ? Language.datas.edit : Language.datas.add,
      onBack: this.onBack
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.needReset) {
      this.componentWillMount();
    }
  }

  renderIcons() {
    const views = [];
    for(let i = 0 ; i < 3; i++){
      const items = [];
      for(let j = 0; j < 4; j++) {
        const kid = i*4+j;
        const sty = [j==0?styles.iconSelFirst:styles.iconSel];
        if (kid == this.state.iconId) {
          sty.push(styles.iconHighlight);
        }
        items.push(
          <TouchableHighlight
            underlayColor={Constant.colors.line}
            key={j} style={sty} onPress={_ => this.setState({iconId: kid})}>
            <Icon name={Constant.iconWords[kid]} size={Constant.size.topBarImg} color={Constant.colors.iconColor} />
          </TouchableHighlight>
        );
      }
      views.push(
        <View key={i} style={styles.line1}>
          {items}
        </View>
      );
    }
    return views;
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.line1}>
          <View style={styles.iconV} >
            <Icon name={Constant.iconWords[this.state.iconId]} size={Constant.size.topBarImg} color={Constant.colors.iconColor} />
          </View>
          <TextInput
            ref="textInput"
            style={styles.textInput}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            autoFocus
            placeholder={Language.datas.placeholder}
            defaultValue={Language.datas.defaultTitle}
          />
        </View>
        {this.renderIcons()}
        <View style={styles.dateV}>
          <Text style={styles.dateText}>{Language.datas.date}</Text>
          <Text style={styles.dateText}>{this.state.monDate.format('YYYY-MM-DD')}</Text>
        </View>
        <View style={styles.datePicker}>
          <DatePicker
            defaultDate={this.state.monDate}
            mode="date"
            minDate={this.minDate}
            maxDate={this.maxDate}
            onDateChange={v => this.setState({monDate: v})}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  line1: {
    flex: 1,
    flexDirection: 'row',
    height: Constant.size.editHeight,
    borderBottomWidth: 1,
    borderBottomColor: Constant.colors.line,
  },
  dateV: {
    flex: 1,
    backgroundColor: Constant.colors.item,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 8,
    height: Constant.size.editHeight,
    borderBottomWidth: 1,
    borderBottomColor: Constant.colors.line,
  },
  dateText: {
    fontSize: 17,
  },
  iconV: {
    width: Constant.size.editHeight,
    backgroundColor: Constant.colors.item,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: Constant.colors.line,
  },
  textInput: {
    flex: 1,
    backgroundColor: Constant.colors.item,
    textAlign: 'right',
    paddingRight: 8,
  },
  iconSelFirst: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: Constant.colors.line,
    backgroundColor: Constant.colors.item,
    height: Constant.size.editHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconSel: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: Constant.colors.line,
    borderLeftWidth: 1,
    borderLeftColor: Constant.colors.line,
    backgroundColor: Constant.colors.item,
    height: Constant.size.editHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconHighlight: {
    backgroundColor: Constant.colors.line
  },
  datePicker: {
    backgroundColor: Constant.colors.item,
    borderRightWidth: 1,
    borderRightColor: Constant.colors.line,
  }
});

export default connect(state => state)(Edit);
