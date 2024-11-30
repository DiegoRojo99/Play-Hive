import { Request, Response } from 'express';

export const loginUser = (req: Request, res: Response): void => {
  res.send({ message: 'Login route' });
};

export const logoutUser = (req: Request, res: Response): void => {
  res.send({ message: 'Logout route' });
};
