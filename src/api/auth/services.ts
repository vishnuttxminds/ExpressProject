
import {db} from '../../utils/db';
import  {hashToken} from '../../utils/hashToken';


interface RefreshTokenData {
    jti: any;
    refreshToken: string;
    userId: string;
  }

 export const addRefreshTokenToWhitelist = ({ jti, refreshToken, userId }: RefreshTokenData): Promise<any> => {
    return db.refreshToken.create({
      data: {
        id: jti,
        hashedToken: hashToken(refreshToken),
        userId
      },
    });
  }

  export const findRefreshTokenById =(id : any)=> {
  return db.refreshToken.findUnique({
    where: {
      id,
    },
  });
}


export const deleteRefreshToken = (id : any) => {
  return db.refreshToken.update({
    where: {
      id,
    },
    data: {
      revoked: true
    }
  });
}

export const revokeTokens =(userId : any)=> {
  return db.refreshToken.updateMany({
    where: {
      userId
    },
    data: {
      revoked: true
    }
  });
}