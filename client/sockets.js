import io from "socket.io-client";

const getUserIP = () =>
  new Promise(onNewIP => {
    //  onNewIp - your listener function for new IPs
    // compatibility for firefox and chrome
    const myPeerConnection =
      window.RTCPeerConnection ||
      window.mozRTCPeerConnection ||
      window.webkitRTCPeerConnection;
    const pc = new myPeerConnection({
      iceServers: []
    });

    const noop = function() {};

    const localIPs = {};

    const ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g;

    function iterateIP(ip) {
      if (!localIPs[ip]) onNewIP(ip);
      localIPs[ip] = true;
    }

    // create a bogus data channel
    pc.createDataChannel("");

    // create offer and set local description
    pc.createOffer(sdp => {
      sdp.sdp.split("\n").forEach(line => {
        if (line.indexOf("candidate") < 0) return;
        line.match(ipRegex).forEach(iterateIP);
      });

      pc.setLocalDescription(sdp, noop, noop);
    }, noop);

    // listen for candidate events
    pc.onicecandidate = function(ice) {
      if (
        !ice ||
        !ice.candidate ||
        !ice.candidate.candidate ||
        !ice.candidate.candidate.match(ipRegex)
      )
        return;
      ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
    };
  });

// Usage

const Singleton = (() => {
  // Instance stores a reference to the Singleton
  let instance;

  async function init() {
    // Singleton
    // Private methods and variables
    // let HOST = "ws://10.0.1.5:8080";
    let HOST = `${await getUserIP()}:8080`;

    if (process.env.NODE_ENV === "production") {
      HOST = window.location.origin.replace(/^http/, "ws");
    }
    const socket = io.connect(HOST);
    return {
      // Public methods and variables
      getSocket() {
        return socket;
      }
    };
  }

  return {
    // Get the Singleton instance if one exists
    // or create one if it doesn't
    async getInstance() {
      if (!instance) {
        instance = await init();
      }
      return instance.getSocket();
    }
  };
})();

/* eslint-disable */
export const setupWebsocket = () =>
  new Promise(async (resolve, reject) => {
    const webSocket = await Singleton.getInstance();

    const receive = dispatch =>
      webSocket.on("recieve", action => {
        dispatch(action);
      });

    const send = ({ type, payload }) =>
      new Promise(resolve =>
        webSocket.emit(type, JSON.stringify({ type, payload }), resolve)
      );

    webSocket.on("connection", () => {
      resolve({ send, receive });
    });
    /*
		webSocket.on('connect_error', () => {
			webSocket.close();
			reject(new Error("WebSocket Closed"));
		})
		*/
  });
