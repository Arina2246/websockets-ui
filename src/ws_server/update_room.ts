import { rooms } from '../db/db.ts';
import { users } from '../db/db.ts';
import { Room } from '../types/types.ts';

const updateDB = (name: string, index: number) => {
  let roomIndex = rooms.length;
  const data: Room = {
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
