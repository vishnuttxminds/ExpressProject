import jwt from 'jsonwebtoken';

interface User {
  id: string;
}

export const  generateAccessToken =  (user: User): string => {
  return jwt.sign({ userId: user.id }, process.env.JWT_ACCESS_SECRET!, {
    expiresIn: '5m',
  });
}

export const generateRefreshToken =(user: User, jti: string): string => {
  return jwt.sign({
    userId: user.id,
    jti
  }, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: '8h',
  });
}

export const generateTokens =(user : User, jti : any) => {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user, jti);
    return {
      accessToken,
      refreshToken,
    };
  }
