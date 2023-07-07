import { httpServer } from './src/http_server/index.ts';
import { addPlayer } from './src/ws_server/add_player.ts';
import { registration } from './src/ws_server/reg.ts';
import { updateRoom } from './src/ws_server/update_room.ts';
import { wss } from './src/ws_server/ws.ts';

const HTTP_PORT = 8181;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function handleMessage(data: string) {
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
