import React from 'react';
import Message from './components/Message.jsx';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import axios from 'axios';
import { MemberContext } from 'twilio/lib/rest/chat/v1/service/channel/member';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: []
    }
    this.sendMessage.bind(this);
  }

  componentDidMount() {
    $.ajax({
      url: '/items', 
      success: (data) => {
        this.setState({
          items: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  sendMessage(phoneNumber, message){
    console.log('Inside sendMessage', phoneNumber, message);
    const options = {
      method: 'post',
      url:'http://127.0.0.1:3000/sms',
      data: {phoneNumber, message},
    }

    axios(options).then(response => console.log(response))
  }

  render () {
    return (<div>
      <h1>Send a Message</h1>
      <Message sendMessage={this.sendMessage}/>
      {/* <List items={this.state.items}/> */}
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));