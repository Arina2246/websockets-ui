import { games, rooms, users } from '../db/db.ts';
import { Game, Room, User, WSdata } from '../types/types.ts';

const updateDB = (user1: User, user2: User) => {
  let gameIndex = games.length;
  const game: Game = { idGame: gameIndex, players: [user1, user2] };
  games.push(game);
  return gameIndex;
};

export const addPlayer = (ws, data: WSdata) => {
  const activeRoom: Room = rooms.find((room) => {
    return room.roomId === JSON.parse(data.data).indexRoom;
  }) as Room;

  const activeUser: User = users.find((user) => {
    return user.ws === ws;
  }) as User;
  const waitingUser: User = users.find((user) => {
    return user.index === activeRoom.roomUsers[0].index;
  }) as User;

  if (activeRoom.roomUsers[0].index !== activeUser.index) {
    const idGame = updateDB(activeUser, waitingUser);
    const data1 = {
      type: 'create_game',
      data: JSON.stringify({
        idGame: idGame,
        idPlayer: activeUser.index,
      }),
      id: 0,
    };
    activeUser.ws.send(JSON.stringify(data1));
    const data2 = {
      type: 'create_game',
      data: JSON.stringify({
        idGame: idGame,
        idPlayer: waitingUser.index,
      }),
      id: 0,
    };
    waitingUser.ws.send(JSON.stringify(data2));
  }
};
