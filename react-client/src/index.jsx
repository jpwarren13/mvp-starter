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

  componentDidMount(){
    axios({
      method:'get',
      url:'http://127.0.0.1:3000/recieveTexts',
    }).then(response => {
      console.log(response, "comp did mount");
      this.setState({texts: response.data});
    })
  }
  
  sendMessage(phoneNumber, smsMessage){
    console.log('[CLIENT]: Inside sendMessage', phoneNumber, smsMessage);
    const options = {
      method: 'post',
      url:'http://127.0.0.1:3000/smsout',
      data: {phoneNumber, smsMessage, outgoing: true},
    }

    axios(options).then(response =>{
      console.log('############[SENDING MESSAGE RESPONE]', response)
      axios({
        method:'get',
        url:'http://127.0.0.1:3000/recieveTexts',
      }).then(response => {
        this.setState({texts: response.data});
        console.log('[CLIENT] BACK TO SERVER', response);
      })
    })
  }

  render () {
    return (<div>
      <h1>Send a Message</h1>
      <Message sendMessage={this.sendMessage}/>
      <div className='messages'> 
      {this.state.texts.map(text => {
        return(
          <List text={text.smsMessage} outgoing={text.outgoing}/>
        )
      })}
      </div>

    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));