import { rooms } from '../db/db.js';
import { users } from '../db/db.js';

const updateDB = (name, index) => {
  let roomIndex = rooms.length;
  const data = {
    roomId: roomIndex,
    roomUsers: [
      {
        name: name,
        index: index,
      },
    ],
  };
  rooms.push(data);
};

export const updateRoom = (ws) => {
  users.forEach((user) => {
    if (ws === user.ws) {
      updateDB(user.name, user.index);
    }
  });
  users.forEach((user) => {
    const data = {
      type: 'update_room',
      data: JSON.stringify(rooms),
      id: 0,
    };
    user.ws.send(JSON.stringify(data));
  });
};
