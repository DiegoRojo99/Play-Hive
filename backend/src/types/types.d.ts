declare global {
  namespace Express {
    interface User {
      steamID: string;
      username: string;
      avatar?: string;
    }
  }
}

export {};