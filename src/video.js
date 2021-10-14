function Video(props) {
  function fun() {
    props.s.setState({ vc: false });
  }

  let localStream;
  let remoteStream;
  var webcamButton;
  var webcamVideo;
  var remoteVideo;
  async function start() {
    webcamButton = document.getElementById("webcamButton");
    webcamVideo = document.getElementById("webcamVideo");
    localStream=await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,});
    remoteVideo = document.getElementById("remoteVideo");
    localStream.getTracks().forEach((track) => {
      props.port.addTrack(track, localStream);
    });
    remoteStream = new MediaStream();
    props.port.ontrack = (event) => {
      console.log("received");
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
    }
    webcamVideo.srcObject = localStream;
    remoteVideo.srcObject = remoteStream;
    webcamButton.disabled = true;
  }
  return (
    <>
      <button onClick={fun}>BACK</button>
      <h2>Start your Webcam</h2>
      <div>
        <span>
          <h3>Local Stream</h3>
          <video id="webcamVideo" autoPlay playsInline></video>
        </span>
        <span>
          <h3>Remote Stream</h3>
          <video id="remoteVideo" autoPlay playsInline></video>
        </span>
      </div>

      <button id="webcamButton" onClick={start}>
        Start webcam
      </button>
      <button id="hangupButton" disabled>
        Hangup
      </button>
    </>
  );
}
export default Video;