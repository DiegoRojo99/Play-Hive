interface SteamUser {
  steamID: string;
  username: string;
  avatar: string;
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

type GameWithHeader = Game & {
  header_image: string
}

type GameWithDetails = {
  type: string;
  name: string;
  steam_appid: number;
  required_age: number;
  is_free: boolean;
  detailed_description: string;
  about_the_game: string;
  short_description: string;
  supported_languages: string;
  header_image: string;
  capsule_image: string;
  capsule_imagev5: string;
  website: string;
  pc_requirements: {
      minimum: string;
      recommended?: string;
  };
  mac_requirements?: {
      minimum: string;
      recommended?: string;
  };
  linux_requirements?: {
      minimum: string;
      recommended?: string;
  };
  legal_notice: string;
  developers: string[];
  publishers: string[];
  package_groups: any[];
  platforms: {
      windows: boolean;
      mac: boolean;
      linux: boolean;
  };
  metacritic?: {
      score: number;
      url: string;
  };
  categories: Array<{
      id: number;
      description: string;
  }>;
  genres: Array<{
      id: string;
      description: string;
  }>;
  screenshots: Array<{
      id: number;
      path_thumbnail: string;
      path_full: string;
  }>;
  recommendations?: {
      total: number;
  };
  achievements?: {
      total: number;
      highlighted: Array<{
          name: string;
          path: string;
      }>;
  };
  release_date: {
      coming_soon: boolean;
      date: string;
  };
  support_info: {
      url: string;
      email: string;
  };
  background: string;
  background_raw: string;
  content_descriptors: {
      ids: number[];
      notes?: string;
  };
};

type GameDB = {
  appid: number,
  name: string,
  description: string | null,
  shortDescription: string | null,
  languages: string | null,
  headerImage: string | null,
  capsuleImage: string | null,
  releaseDate: Date,
  backgroundImage: string | null,
  genres: Genre[],
}

type Genre = {
  id: number,
  descriptions: string,
}

type SupabaseUser = {
  id: string;
  email: string | null;
  phone: string | null;
  created_at: string;
  last_sign_in_at: string | null;
  app_metadata: {
    provider: string;
    [key: string]: any;
  };
  user_metadata: {
    [key: string]: any;
  };
  role: string;
};

type SteamProfile = {
  userId: String,
  steamId: String | null,
  avatarUrl: String | null,
  username: String | null,
};

type CompleteUser = SupabaseUser & {
  steamProfile: SteamProfile | null;
};

type List = {
  id: String;
  name: String;
  description: String | null;
  userId: String;
  games: GameDB[];
  createdAt: Date;
  updatedAt: Date;
}

export type {
  SteamUser,
  Game,
  GameWithHeader,
  GameWithDetails,
  GameDB,
  SupabaseUser,
  SteamProfile,
  CompleteUser,
  List
}