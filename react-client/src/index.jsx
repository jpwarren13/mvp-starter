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
      texts: []
    }
    this.sendMessage.bind(this);
  }

  componentDidMount() {
    $.ajax({
      type: "GET",
      url: '/recieveTexts', 
      success: (data) => {
        console.log('[CLIENT]########COMPONENT DID MOUNT', data)
        this.setState({
          items: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  sendMessage(phoneNumber, smsMessage){
    console.log('[CLIENT]: Inside sendMessage', phoneNumber, smsMessage);
    const options = {
      method: 'post',
      url:'http://127.0.0.1:3000/smsout',
      data: {phoneNumber, smsMessage, outgoing: true},
    }

    axios(options).then(response =>{
      axios({
        method:'get',
        url:'http://127.0.0.1:3000/recieveTexts',
      }).then()
    })
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