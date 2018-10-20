import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div className='singlemess'>
    {/* <h4> {props.outgoing ? "Sent Message" : "Incoming Message"} </h4>
    {props.text.smsMessage} */}
   
      <div className={props.outgoing ? 'outgoing' : 'incoming'}>{props.text}</div>


    {/* { props.items.map(item => <ListItem item={item}/>)} */}
  </div>
)

export default List;