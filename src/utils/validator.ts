import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

const validateUserInput = (req: Request, res: Response, next: NextFunction) => {
  const { id, name } = req.body;

  const userValidationRules = () => {
    return [
      body('name').isEmail(),
      body('id').isLength({ min: 5 }),
    ];
  };

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

export default validateUserInput;
