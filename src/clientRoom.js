import React, { Component } from 'react';
class Remote extends Component  {
    constructor(p)
    {
      super(p);
    }
    render()
  {
    return (
      <div className="App">
          <h1>This is client</h1>
          <label for="pi">Enter the id of the server</label>
          <textarea name="pi" id="sa"/><br></br>
        <button type="submit" onClick={this.props.client.cal}>Connect</button>
      </div>
    );
  }
}
  export default Remote;
  // const remoteConnection = new RTCPeerConnection({ 'iceServers': [{ 'urls': 'stun:74.125.142.127:19302' }] })

  // remoteConnection.onicecandidate = e =>  {
  // console.log(" NEW ice candidnat!! on localconnection reprinting SDP " )
  //  console.log(JSON.stringify(remoteConnection.localDescription) )
  // }
  
   
  // remoteConnection.ondatachannel= e => {
  
  //       const receiveChannel = e.channel;
  //       receiveChannel.onmessage =e =>  console.log("messsage received!!!"  + e.data )
  //       receiveChannel.onopen = e => console.log("open!!!!");
  //       receiveChannel.onclose =e => console.log("closed!!!!!!");
  //       remoteConnection.channel = receiveChannel;
  
  // }
  
  
  // remoteConnection.setRemoteDescription(offer).then(a=>console.log("done"))
  // await remoteConnection.createAnswer().then(a => remoteConnection.setLocalDescription(a));