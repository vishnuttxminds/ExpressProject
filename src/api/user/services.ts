
import bcrypt from 'bcrypt';
import {db} from '../../utils/db'

export const findUserByEmail =(email : any)=> {
  return db.tokenUser.findUnique({
    where: {
      email,
    },
  });
}

export const createUserByEmailAndPassword =(user : any) => {
  user.password = bcrypt.hashSync(user.password, 12);
  return db.tokenUser.create({
    data: user,
  });
}

export const findUserById = (id : any) =>{
  return db.tokenUser.findUnique({
    where: {
      id,
    },
  });
}
