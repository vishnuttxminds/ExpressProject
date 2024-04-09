import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { logger } from './logger';

export const userValidationRules = () => {
  return [
    body('name').isEmail().withMessage('Invalid email address'),
    body('id').isLength({ min: 5 }).withMessage('ID must be at least 5 characters long'),
  ];
};

export const validateUserInput = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next()
  }

  if (!errors.isEmpty()) {
    logger.error("Erroe code : 400");
    return res.status(400).json({ errors: errors.array()});
  }
};