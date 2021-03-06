module.exports = {
  servers: {
    one: {
      host: '67.205.180.89',
      username: 'root',
      pem: `${process.env.HOME}/.ssh/id_rsa`
    }
  },
  meteor: {
    name: 'ubuntu-512mb-nyc3-01',
    path: process.env.PWD,
    servers: {
      one: {}
    },
    docker: {
      image:'abernix/meteord:base'
    },
    buildOptions: {
      serverOnly: true,
      debug: true,
    },
    env: {
      NODE_ENV: 'production',
      PORT: 80,
      ROOT_URL: 'http://67.205.180.89',
      MONGO_URL: "mongodb://admin:123456@ds157278.mlab.com:57278/recruiterq"
    },
    deployCheckWaitTime: 120,
    enableUploadProgressBar: true,
  }
};
