export type WSdata = {
  type: string;
  data: string;
  id: number;
};

export type User = {
  ws: WebSocket;
  name: string;
  index: number;
  password: string;
};

export type Room = {
  roomId: number;
  roomUsers: [
    {
      name: string;
      index: number;
    }
  ];
};

export type Game = {
  idGame: number;
  players: User[];
};
