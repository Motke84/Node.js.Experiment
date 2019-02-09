const os = require('os');

const getIp = () => {
    const ifaces = os.networkInterfaces();
 
    Object.keys(ifaces).forEach((ifname) => {
        var alias = 0;

        ifaces[ifname].forEach((iface) => {
            if ('IPv4' !== iface.family || iface.internal !== false) {
                // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
             
            }

            if (alias >= 1) {
                // t9his single interface has multiple ipv4 addresses
                return iface.address;
            } else {
                // this interface has only one ipv4 address
               // return iface.address;
            }
            ++alias;
        });
    });
};


module.exports = {
    getIp
}