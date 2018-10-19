import React from 'react';

export default class Message extends React.Component {
  constructor(props){
    super(props);
  this.state = {
    message: '',
    number: ''
  }
  this.updateMessage = this.updateMessage.bind(this);
  this.updateNumber = this.updateNumber.bind(this);
  }

  updateNumber(e){
    this.setState({number: e.target.value});
  }

  updateMessage(e) {
    this.setState({message: e.target.value});
  }




render(){
return (  <div>
    <h4> Send a Message </h4>
    Phone Number: <input type="text" value={this.state.number} onChange={this.updateNumber}></input>
    <div>Message: <input type="text" value={this.state.message} onChange={this.updateMessage}/></div> 
    <button name="send-message" onClick={() => this.props.sendMessage(this.state.number, this.state.message)}>Send Message</button>
  </div>)
}
}
