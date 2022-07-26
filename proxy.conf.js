const PROXY_CONFIG = {
  "/api": {
    "target": "http://localhost:8080",
    "secure": false
    // THIS is probably not required but in case of a problem with authentication please uncomment and follow
    // instruction from https://jmrobles.medium.com/mastering-angular-proxy-configuration-6c8df0b175fe
    // "onProxyRes": function (pr, req, res) {
    //   if (pr.headers['set-cookie']) {
    //     const cookies = pr.headers['set-cookie'].map(cookie =>
    //       cookie.replace(/;(\ )*secure/gi, '')
    //     );
    //     pr.headers['set-cookie'] = cookies;
    //   }
    // }

  }
};

module.exports = PROXY_CONFIG;


