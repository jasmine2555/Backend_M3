import Joi from "joi";
import { EVENT_TYPES } from "../models/eventModel";

/**
 * Joi schema for creating a new event (POST /api/v1/events).
 *
 * @openapi
 * components:
 *   schemas:
 *     CreateEventInput:
 *       type: object
 *       required:
 *         - title
 *         - eventType
 *         - startDate
 *         - endDate
 *         - maxAttendees
 *         - organizerEmail
 *       properties:
 *         title:
 *           type: string
 *           minLength: 5
 *           maxLength: 100
 *           example: Tech Conference 2025
 *         description:
 *           type: string
 *           maxLength: 500
 *           example: Annual technology conference
 *         eventType:
 *           type: string
 *           enum: [workshop, conference, webinar, networking]
 *           example: conference
 *         startDate:
 *           type: string
 *           format: date-time
 *           example: 2026-12-20T09:00:00.000Z
 *         endDate:
 *           type: string
 *           format: date-time
 *           example: 2026-12-20T17:00:00.000Z
 *         location:
 *           type: string
 *           example: Convention Center Hall A
 *         isVirtual:
 *           type: boolean
 *           default: false
 *         maxAttendees:
 *           type: integer
 *           minimum: 1
 *           maximum: 10000
 *           example: 500
 *         ticketPrice:
 *           type: number
 *           example: 49.99
 *         isPaid:
 *           type: boolean
 *           default: false
 *         organizerEmail:
 *           type: string
 *           format: email
 *           example: organizer@example.com
 */
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

/**
 * Joi schema for updating an event (PUT /api/v1/events/{id}).
 * At least one field must be provided.
 *
 * @openapi
 * components:
 *   schemas:
 *     UpdateEventInput:
 *       type: object
 *       minProperties: 1
 *       properties:
 *         title:
 *           type: string
 *           minLength: 5
 *           maxLength: 100
 *           example: Updated Conference Title
 *         description:
 *           type: string
 *           maxLength: 500
 *           example: Updated event description
 *         eventType:
 *           type: string
 *           enum: [workshop, conference, webinar, networking]
 *           example: webinar
 *         startDate:
 *           type: string
 *           format: date-time
 *           example: 2026-12-21T09:00:00.000Z
 *         endDate:
 *           type: string
 *           format: date-time
 *           example: 2026-12-21T17:00:00.000Z
 *         location:
 *           type: string
 *           example: Online Zoom Room
 *         isVirtual:
 *           type: boolean
 *           example: true
 *         maxAttendees:
 *           type: integer
 *           minimum: 1
 *           maximum: 10000
 *           example: 300
 *         ticketPrice:
 *           type: number
 *           example: 29.99
 *         isPaid:
 *           type: boolean
 *           example: true
 *         organizerEmail:
 *           type: string
 *           format: email
 *           example: organizer@example.com
 */
export const updateEventSchema = Joi.object({
  title: Joi.string().min(5).max(100).messages({
    "string.min": "Title must be at least 5 characters long",
    "string.max": "Title must not exceed 100 characters",
  }),

  description: Joi.string().max(500).messages({
    "string.max": "Description must not exceed 500 characters",
  }),

  eventType: Joi.string()
    .valid(...EVENT_TYPES)
    .messages({
      "any.only": "Event type must be one of workshop, conference, webinar, networking",
    }),

  startDate: Joi.date().iso().messages({
    "date.format": "Start date must be a valid ISO date",
  }),

  endDate: Joi.date().iso().messages({
    "date.format": "End date must be a valid ISO date",
  }),

  isVirtual: Joi.boolean(),

  location: Joi.string().min(3).max(200).messages({
    "string.min": "Location must be at least 3 characters long",
  }),

  maxAttendees: Joi.number().integer().min(1).max(10000).messages({
    "number.integer": "Max attendees must be an integer",
    "number.min": "Max attendees must be at least 1",
    "number.max": "Max attendees must not exceed 10000",
  }),

  isPaid: Joi.boolean(),

  ticketPrice: Joi.number().min(0).precision(2).messages({
    "number.min": "Ticket price cannot be negative",
  }),

  organizerEmail: Joi.string().email().messages({
    "string.email": "Organizer email must be a valid email address",
  }),
})
  .min(1)
  .messages({
    "object.min": "At least one field must be provided for update",
  });

export const eventIdSchema = Joi.object({
  id: Joi.string().trim().min(1).required().messages({
    "string.empty": "Event ID is required",
    "any.required": "Event ID is required",
  }),
});
