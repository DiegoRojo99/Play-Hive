interface SteamUser {
  steamID: string;
  username: string;
  avatar: string;
}

interface UserContextType {
  user: SteamUser | null;
  setUser: React.Dispatch<React.SetStateAction<SteamUser | null>>;
}

interface Game {
  appid: number;
  has_community_visible_stats: boolean;
  img_icon_url: string;
  name: string;
  playtime_deck_forever: number;
  playtime_disconnected: number;
  playtime_forever: number;
  playtime_linux_forever: number;
  playtime_mac_forever: number;
  playtime_windows_forever: number;
  rtime_last_played: number;
}

export type {
  SteamUser,
  UserContextType,
  Game
}