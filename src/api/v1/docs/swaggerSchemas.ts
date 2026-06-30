/**
 * @openapi
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: x6OGrXJ9mZ429vJrrE0
 *         title:
 *           type: string
 *           example: Tech Conference 2025
 *         description:
 *           type: string
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
 *           example: false
 *         maxAttendees:
 *           type: integer
 *           example: 500
 *         ticketPrice:
 *           type: number
 *           example: 49.99
 *         isPaid:
 *           type: boolean
 *           example: true
 *         organizerEmail:
 *           type: string
 *           format: email
 *           example: organizer@example.com
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
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
 *
 *     UpdateEventInput:
 *       type: object
 *       minProperties: 1
 *       properties:
 *         title:
 *           type: string
 *           minLength: 5
 *           maxLength: 100
 *         description:
 *           type: string
 *           maxLength: 500
 *         eventType:
 *           type: string
 *           enum: [workshop, conference, webinar, networking]
 *         startDate:
 *           type: string
 *           format: date-time
 *         endDate:
 *           type: string
 *           format: date-time
 *         location:
 *           type: string
 *         isVirtual:
 *           type: boolean
 *         maxAttendees:
 *           type: integer
 *           minimum: 1
 *           maximum: 10000
 *         ticketPrice:
 *           type: number
 *         isPaid:
 *           type: boolean
 *         organizerEmail:
 *           type: string
 *           format: email
 *
 *     ValidationError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Validation error: Title is required"
 *
 *     NotFoundError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Event not found
 */

export {};
