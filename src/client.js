import Remote from "./clientRoom";
import Video from "./video";
import "react-chatbox-component/dist/style.css";
import { ChatBox } from "react-chatbox-component";
import React, { Component } from "react";
class Client extends Component {
  constructor(p) {
    super(p);
    this.state = {
      sid: "",
      pid: true,
      vc: false,
    };
    this.cal = this.cal.bind(this);
    this.send = this.send.bind(this);
    this.vc = this.vc.bind(this);
    this.props.lc.onicecandidate = (e) => {
      this.setState({ sid: JSON.stringify(this.props.lc.localDescription) });
    };

    this.props.lc.ondatachannel = (e) => {
      const receiveChannel = e.channel;
      receiveChannel.onmessage = (e) => {
        this.props.app.setState({
          messages: this.props.app.state.messages.concat([
            {
              text: e.data,
              id: this.props.app.state.messages.length,
              sender: {
                name: "He",
                uid: "user2",
                avatar:
                  "https://i.guim.co.uk/img/media/d31ebd49b32a5aa609a584ababb1e03bc70b4942/573_213_2929_1758/master/2929.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=a54fc963e39dd6645fce012663ed13c1",
              },
            },
          ]),
        });
      };
      receiveChannel.onopen = (e) => this.props.app.chat();
      receiveChannel.onclose = (e) => console.log("closed!!!!!!");
      this.props.lc.channel = receiveChannel;
    };
  }
  vc() {
    this.setState({vc:true});
  }
  send(e) {
    this.props.app.setState({
      messages: this.props.app.state.messages.concat([
        {
          text: e,
          id: this.props.app.state.messages.length,
          sender: {
            name: "ME",
            uid: "user1",
            avatar:
              "https://cdn.dribbble.com/users/1041205/screenshots/3636353/dribbble.jpg",
          },
        },
      ]),
    });
    this.props.lc.channel.send(e);
  }
  cal(e) {
    console.log(document.getElementById("sa").value);
    this.props.app.setState({ r: document.getElementById("sa").value });
    this.props.lc
      .setRemoteDescription(JSON.parse(document.getElementById("sa").value))
      .then((a) => console.log("done"))
      .then(async (reponse) => {
        this.props.lc
          .createAnswer()
          .then((a) => this.props.lc.setLocalDescription(a));
      })
      .then(this.setState({ pid: false }));
  }
  render() {
    return (
      <div className="App">
        {this.state.vc?<Video s={this} port={this.props.lc}></Video>:
        <>
        {this.props.app.state.rd && this.state.pid ? (
          <Remote client={this}></Remote>
        ) : (
          ""
        )}
        {this.props.app.state.rd && !this.state.pid ? this.state.sid : ""}
        {this.props.app.state.rd  ? (
          ""
        ) : (
          <div className="container">
            <div className="chat-header">
              <button onClick={this.vc}>Video Call</button>
              <h1>Chat</h1>
            </div>
            <div id="ko">
              <ChatBox
                key={this.props.app.state.messages.length}
                onSubmit={this.send}
                messages={this.props.app.state.messages}
              />
            </div>
          </div>
        )}
        </>}
      </div>
    );
  }
}
export default Client;
