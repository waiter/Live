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
import { Form,
  Separator,InputField, LinkField,
  SwitchField, PickerField,DatePickerField,TimePickerField
} from 'react-native-form-generator';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';
import DataHelper from '../../data/helper';
import Events from '../../data/events';
import ReduxActions from '../../redux/actions';
import { connect } from 'react-redux';
import ImageHelper from '../../data/image';
import Constant from '../../constant';

const titleDefault = '十年之前';
const bindThing = [
  'onTitleChange',
  'onDateChange',
  'onDone'
];

class Edit extends BindComponent {
  constructor(props) {
    super(props, bindThing);
    const rowData = this.props.rowData || {};
    this.state = {
      rowKey: this.props.rowKey || '',
      title: rowData.title || titleDefault,
      date: rowData.time || moment().format('YYYY-MM-DD')
    };
  }

  onTitleChange(v) {
    console.log(v);
    this.setState({
      title: v.length > 0 ? v : titleDefault
    });
  }

  onDateChange(d) {
    console.log(d);
    this.setState({
      date: moment(d).format('YYYY-MM-DD')
    });
  }

  onDone() {
    const nowData = {
      title: this.state.title || titleDefault,
      time: this.state.date || moment().format('YYYY-MM-DD')
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
    console.log('dddddd');
  }

  componentWillMount () {
    Actions.refresh({
      rightButtonImage: ImageHelper.checkmark,
      backButtonImage: ImageHelper.arrowBack,
      onRight: this.onDone
    })
  }

  test(ggg) {
    alert('nnn');
    alert(ggg);
  }

  onPress() {
    alert('yyy');
  }

  renderIcons() {
    const views = [];
    for(let i = 0 ; i < 2; i++){
      const items = [];
      for(let j = 0; j < 4; j++) {
        items.push(
          <View key={j} style={j==0?styles.iconSelFirst:styles.iconSel}>
            <Image source={ImageHelper.alarm} style={styles.icon}/>
          </View>
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
      <ScrollView
         keyboardShouldPersistTaps={true}
      >
        <View style={styles.line1} >
          <View style={styles.iconV} >
            <Image source={ImageHelper.alarm} style={styles.icon}/>
          </View>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            autoFocus
            placeholder="<输入标题>"
          />
        </View>
        {this.renderIcons()}
        <Form
          ref="form"
        >
          <InputField ref='title' label="title" placeholder='title'
            value={this.state.title}
            onValueChange={this.onTitleChange}
          />
          <DatePickerField ref='date'
          mode="date"
          minimumDate={new Date('1/1/1900')}
          maximumDate={new Date()}

          prettyPrint={true}
          date={moment(this.state.date, 'YYYY-MM-DD').toDate()}
          dateTimeFormat={ v => moment(v).format('YYYY-MM-DD')}
          onValueChange={this.onDateChange}
          placeholder='日期'/>
        </Form>
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
  }
});

export default connect(state => state)(Edit);

// iconRight={[<Icon style={{alignSelf:'center', marginLeft:10}} name='ios-arrow-forward' size={30} />,
//             <Icon style={{alignSelf:'center', marginLeft:10}} name='ios-arrow-down' size={30} />
//             ]}
