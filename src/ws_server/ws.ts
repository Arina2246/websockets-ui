import { WebSocketServer } from 'ws';

const WS_PORT = 3000;
console.log(`Start ws server on the ${WS_PORT} port!`);
export const wss = new WebSocketServer({ port: 3000 });
