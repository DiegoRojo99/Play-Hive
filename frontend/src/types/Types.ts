interface SteamUser {
  steamID: string;
  username: string;
  avatar: string;
}

interface UserContextType {
  user: SteamUser | null;
  setUser: React.Dispatch<React.SetStateAction<SteamUser | null>>;
}

export type {
  SteamUser,
  UserContextType
}