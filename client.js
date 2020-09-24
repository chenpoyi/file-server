const net = require('net');
const fs = require('fs');
const readline = require('readline');


let fileName;

const conn = net.createConnection({
  host: 'localhost', // change to IP address of computer or ngrok host if tunneling
  port: 3000 // or change to the ngrok port if tunneling
});

// client.js
conn.on('data', (data) => {
  console.log('Server says: ', data);



});
conn.on('connect', () => {
  conn.write('Hello from client!');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  setTimeout(() => {
    rl.question('Which file do you want?\n', (answer) => {
      conn.write(answer);
      fileName = answer;
      conn.on('data', (file) => {
        fs.writeFile(`./client-files/${fileName}`, file, (err) => {
          if(err){
            throw err;
          } else {
            console.log('File transfer complete.');
          }

        });
      });
    });
  },1000);

});

conn.setEncoding('utf8'); // interpret data as text