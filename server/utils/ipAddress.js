const os = require("os");

export default function ip() {
  let ipAddress = "";
  const ifaces = os.networkInterfaces();

  Object.keys(ifaces).forEach(ifname => {
    let alias = 0;

    ifaces[ifname].forEach(iface => {
      if (iface.family !== "IPv4" || iface.internal !== false) {
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        return;
      }

      if (alias >= 1) {
        // this single interface has multiple ipv4 addresses
        // console.log("one",ifname + ':' + alias, iface.address);
        // ipAddress = iface.address;
      } else {
        // this interface has only one ipv4 adress
        /* eslint-disable no-console */
        console.log("two", ifname, iface.address);
        if (ifname === "wlp8s0") ipAddress = iface.address;
      }
      alias += 1;
    });
  });
  console.log(ipAddress);
  return ipAddress;
}
