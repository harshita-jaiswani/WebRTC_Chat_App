import Remote from './room';
import 'react-chatbox-component/dist/style.css';
import {ChatBox} from 'react-chatbox-component';
import Video from "./video";
import React, { Component } from 'react';
var sendChannel;
class Server extends Component  {
    constructor(p)
    {
      super(p);
      this.send= this.send.bind(this);
      this.cal= this.cal.bind(this);
      this.vc= this.vc.bind(this);
      sendChannel = this.props.lc.createDataChannel("sendChannel");
      this.props.lc.onicecandidate = e =>  {
        this.props.app.setState({c: JSON.stringify(this.props.lc.localDescription)});
        }
     
        sendChannel.onmessage =e =>  {
          this.props.app.setState({ 
           messages: this.props.app.state.messages.concat([{
            "text":e.data,
            "id":this.props.app.state.messages.length,
            "sender": {
              "name": "He",
              "uid": "user2",
              "avatar": "https://i.guim.co.uk/img/media/d31ebd49b32a5aa609a584ababb1e03bc70b4942/573_213_2929_1758/master/2929.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=a54fc963e39dd6645fce012663ed13c1",
            }
          }])
          });
          
          console.log(this.props.app.state.messages);  };
        sendChannel.onopen = e => console.log("open!!!!");
          sendChannel.onclose =e => console.log("closed!!!!!!");
     
     
          this.props.lc.createOffer().then(o => this.props.lc.setLocalDescription(o) );
          this.state={vc:false};
    }
    vc()
    {
      this.setState({vc:true});
    }
    send(e)
  {
    this.props.app.setState({ 
      messages: this.props.app.state.messages.concat([{
       "text":e,
       "id":this.props.app.state.messages.length,
       "sender": {
         "name": "ME",
         "uid": "user1",
         "avatar": "https://cdn.dribbble.com/users/1041205/screenshots/3636353/dribbble.jpg",
       }
     }])
     });
     sendChannel.send(e);
  }
  cal()
  {
    this.props.app.setState({r:document.getElementById("lk").value});
      this.props.lc.setRemoteDescription (JSON.parse(document.getElementById("lk").value)).then(a=>this.props.app.chat());        
}
    render()
  {
    return (
      <div className="App">
        {this.state.vc?<Video s={this} port={this.props.lc}></Video>:
        <>
           {this.props.app.state.rd?<Remote con={this.props.app} server={this}></Remote>:""}
           {this.props.app.state.rd?
        ""
        :
        <div className='container'>  
        <div className='chat-header'> 
        <button onClick={this.vc}>Video Call</button>
        <h1>Chat</h1> 
        </div>  
        <div id="ko">
        <ChatBox key={this.props.app.state.messages.length} onSubmit={this.send} messages={this.props.app.state.messages} />
        </div>
        </div>}
        </>}
      </div>
    );
  }
}
  export default Server;