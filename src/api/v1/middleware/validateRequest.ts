import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { HTTP_STATUS } from "../../../constants/httpConstants";

export const validateRequest = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: true,
      stripUnknown: true,
    });

    if (error) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: `Validation error: ${error.details[0].message}`,
      });
      return;
    }

    req.body = value;
    next();
  };
};

export const validateParams = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.params, { abortEarly: true });

    if (error) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: `Validation error: ${error.details[0].message}`,
      });
      return;
    }

    next();
  };
};
