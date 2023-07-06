import { games, rooms, users } from '../db/db.js';

const updateDB = (user1, user2) => {
  let gameIndex = games.length;
  const game = { idGame: gameIndex, players: [user1, user2] };
  games.push(game);
  return gameIndex;
};

export const addPlayer = (ws, data) => {
  const activeRoom = rooms.find((room) => {
    return room.roomId === JSON.parse(data.data).indexRoom;
  });

  const activeUser = users.find((user) => {
    return user.ws === ws;
  });
  const waitingUser = users.find((user) => {
    return user.index === activeRoom.roomUsers[0].index;
  });
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
