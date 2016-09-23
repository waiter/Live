import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  ScrollView
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

const titleDefault = '十年之前';
const bindThing = [
  'onTitleChange',
  'onDateChange',
  'onDone'
];

class Edit extends Component {
  constructor(props) {
    super(props);
    const rowData = this.props.rowData || {};
    this.state = {
      rowKey: this.props.rowKey || '',
      title: rowData.title || titleDefault,
      date: rowData.time || moment().format('YYYY-MM-DD')
    };
    bindThing.forEach(it => {
      this[it] = this[it].bind(this);
    });
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

  render() {
    return (
      <ScrollView
         keyboardShouldPersistTaps={true}
      >
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

export default connect(state => state)(Edit);

// iconRight={[<Icon style={{alignSelf:'center', marginLeft:10}} name='ios-arrow-forward' size={30} />,
//             <Icon style={{alignSelf:'center', marginLeft:10}} name='ios-arrow-down' size={30} />
//             ]}
