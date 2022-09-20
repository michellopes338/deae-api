import { Role } from '../enums/role.enum';

export interface Payload {
  sub: string;
  username: string;
  role: Role;
}

export interface RefreshTokenInsertion {
  userId: string;
  newRefreshToken: string;
}

export interface RefreshTokenWithPayload {
  isRefreshTokenValid: boolean;
  user: Payload;
}

export interface RefreshToken {
  refresh_token: string;
}

export interface AccessToken {
  access_token: string;
}

export interface CheckRefreshToken {
  userId: string;
  requestRefreshToken: string;
}
