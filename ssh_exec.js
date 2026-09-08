const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  console.log('Client :: ready');
  conn.exec('whoami && cd /home/dwimitrateknindo123/htdocs/dwimitrateknindo.co.id/backend-ready && ls -la && npm install && pm2 start server.js', (err, stream) => {
    if (err) throw err;
    stream.on('close', (code, signal) => {
      console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
      conn.end();
    }).on('data', (data) => {
      console.log('STDOUT: ' + data);
    }).stderr.on('data', (data) => {
      console.log('STDERR: ' + data);
    });
  });
}).connect({
  host: '72.62.122.27',
  port: 22,
  username: 'dwimitrateknindo123',
  password: '@Webpaneldmt456'
});
