export interface UserCredentials {
  username: string;
  password: string;
}

export interface OutValidUser {
  id: string;
  username: string;
  email: string;
  refresh_token: string;
}
