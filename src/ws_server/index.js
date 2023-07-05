import { WebSocketServer } from 'ws';

function heartbeat() {
  this.isAlive = true;
}

const WS_PORT = 3000;
console.log(`Start ws server on the ${WS_PORT} port!`);
export const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', function connection(ws) {
  ws.isAlive = true;
  ws.on('error', console.error);

  ws.on('message', function handleMessage(data) {
    console.log('received: ', '' + data);
  });

  //   ws.send(JSON.stringify({ message: 'aaa' }));
});

const interval = setInterval(function ping() {
  wss.clients.forEach(function each(ws) {
    if (ws.isAlive === false) return ws.terminate();

    ws.isAlive = false;
    ws.ping();
  });
}, 30000);

wss.on('close', function close() {
  clearInterval(interval);
  console.log('client disconnected');
});
