import Joi from "joi";
import { EVENT_TYPES } from "../models/eventModel";

export const createEventSchema = Joi.object({
  title: Joi.string().min(5).max(100).required().messages({
    "string.empty": "Title is required",
    "any.required": "Title is required",
    "string.min": "Title must be at least 5 characters long",
    "string.max": "Title must not exceed 100 characters",
  }),

  description: Joi.string().max(500).default("").messages({
    "string.max": "Description must not exceed 500 characters",
  }),

  eventType: Joi.string()
    .valid(...EVENT_TYPES)
    .required()
    .messages({
      "any.only": "Event type must be one of workshop, conference, webinar, networking",
      "any.required": "Event type is required",
      "string.empty": "Event type is required",
    }),

  startDate: Joi.date().iso().required().messages({
    "date.format": "Start date must be a valid ISO date",
    "any.required": "Start date is required",
  }),

  endDate: Joi.date()
    .iso()
    .greater(Joi.ref("startDate"))
    .required()
    .messages({
      "date.format": "End date must be a valid ISO date",
      "date.greater": "End date must be after start date",
      "any.required": "End date is required",
    }),

  isVirtual: Joi.boolean().default(false),

  location: Joi.when("isVirtual", {
    is: true,
    then: Joi.string().max(200).default("Online"),
    otherwise: Joi.string().min(3).max(200).required().messages({
      "string.empty": "Location is required for in-person events",
      "any.required": "Location is required for in-person events",
      "string.min": "Location must be at least 3 characters long",
    }),
  }),

  maxAttendees: Joi.number().integer().min(1).max(10000).required().messages({
    "number.base": "Max attendees must be a number",
    "number.integer": "Max attendees must be an integer",
    "number.min": "Max attendees must be at least 1",
    "number.max": "Max attendees must not exceed 10000",
    "any.required": "Max attendees is required",
  }),

  isPaid: Joi.boolean().default(false),

  ticketPrice: Joi.when("isPaid", {
    is: true,
    then: Joi.number().positive().precision(2).required().messages({
      "number.base": "Ticket price must be a number",
      "number.positive": "Ticket price must be greater than 0 for paid events",
      "any.required": "Ticket price is required for paid events",
    }),
    otherwise: Joi.number().min(0).default(0),
  }),

  organizerEmail: Joi.string().email().required().messages({
    "string.email": "Organizer email must be a valid email address",
    "any.required": "Organizer email is required",
    "string.empty": "Organizer email is required",
  }),
});
