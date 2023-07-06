import { WebSocketServer } from 'ws';
import { registration } from './reg.js';
import { addPlayer } from './add_player.js';
import { updateRoom } from './update_room.js';

const WS_PORT = 3000;
console.log(`Start ws server on the ${WS_PORT} port!`);
export const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function handleMessage(data) {
    if (JSON.parse(data).type === 'reg') {
      registration(ws, JSON.parse(data));
    } else if (JSON.parse(data).type === 'create_room') {
      updateRoom(ws);
    } else if (JSON.parse(data).type === 'add_user_to_room') {
      addPlayer(ws, JSON.parse(data));
    }
    console.log('' + data);
  });
});
