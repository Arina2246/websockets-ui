import { users } from '../db/db.ts';
import { WSdata } from '../types/types.ts';

const updateDB = (
  ws,
  data: WSdata,
  errorObj: { error: boolean; text: string }
) => {
  let userIndex = users.length;
  const user = {
    ws: ws,
    name: JSON.parse(data.data).name,
    index: userIndex,
    password: JSON.parse(data.data).password,
  };
  if (!errorObj.error) users.push(user);
  return userIndex;
};

const validateUser = (data: WSdata) => {
  let searchTerm: string = JSON.parse(data.data).name;
  let userName = users.find((user) => user.name === searchTerm);
  if (userName) {
    return { error: true, text: 'User with this name is already exists' };
  } else {
    return { error: false, text: '' };
  }
};

export const registration = (ws, dataWS: WSdata) => {
  const error = validateUser(dataWS);
  const userIndex = updateDB(ws, dataWS, error);
  const data = {
    type: 'reg',
    data: JSON.stringify({
      name: JSON.parse(dataWS.data).name,
      index: userIndex,
      error: error.error,
      errorText: error.text,
    }),
    id: 0,
  };
  ws.send(JSON.stringify(data));
};
