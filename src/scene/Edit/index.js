import React, {Component} from 'react';
import BindComponent from '../../components/BindComponent';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  ScrollView,
  Image,
  TextInput
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
import Popup from 'rmc-date-picker/lib/Popup';

const titleDefault = '十年之前';
const bindThing = [
  'onDone'
];

class Edit extends BindComponent {
  constructor(props) {
    super(props, bindThing);
    const rowData = this.props.rowData || {};
    this.state = {
      rowKey: this.props.rowKey || '',
      title: rowData.title || titleDefault,
      date: rowData.time || moment().format('YYYY-MM-DD'),
      iconId: rowData.iconId || 0,
      dateShow: false,
      monDate: rowData.time ? moment(rowData.time, 'YYYY-MM-DD') : moment(),
      text: rowData.title || titleDefault,
    };
    this.minDate = moment('1900-01-01', 'YYYY-MM-DD');
    this.maxDate = moment();
  }

  onDone() {
    const nowData = {
      title: this.state.text || titleDefault,
      time: this.state.monDate.format('YYYY-MM-DD'),
      iconId: this.state.iconId
    }
    const need = this.state.rowKey.length > 0 ?
      Events.editData(this.state.rowKey, nowData) :
      Events.addData(nowData);
    const dispatch = this.props.dispatch;
    DataHelper.saveDatas(need)((e,d) => {
      console.log(Events.getCurrentDatas());
      dispatch(ReduxActions.eventRestData(Events.getCurrentDatas()));
      Actions.pop();
    });
  }

  componentWillMount () {
    Actions.refresh({
      rightButtonImage: ImageHelper.done,
      backButtonImage: ImageHelper.arrowBack,
      onRight: this.onDone,
    })
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
            <Image source={ImageHelper[Constant.icons[kid]]} style={styles.icon}/>
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
      <ScrollView keyboardShouldPersistTaps={true} >
        <View style={styles.line1} >
          <View style={styles.iconV} >
            <Image source={ImageHelper[Constant.icons[this.state.iconId]]} style={styles.icon}/>
          </View>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            autoFocus
            placeholder="<输入标题>"
            defaultValue={titleDefault}
          />
        </View>
        {this.renderIcons()}
        <View style={styles.dateV}>
          <Text style={styles.dateText}>日期</Text>
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
  icon: {
    width: Constant.size.topBarImg,
    height: Constant.size.topBarImg
  },
  textV: {
    flex: 1
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

// iconRight={[<Icon style={{alignSelf:'center', marginLeft:10}} name='ios-arrow-forward' size={30} />,
//             <Icon style={{alignSelf:'center', marginLeft:10}} name='ios-arrow-down' size={30} />
//             ]}
