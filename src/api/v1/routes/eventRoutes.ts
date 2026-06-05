import { Router } from "express";
import * as eventController from "../controllers/eventController";
import { validateParams, validateRequest } from "../middleware/validateRequest";
import {
  createEventSchema,
  eventIdSchema,
  updateEventSchema,
} from "../validation/eventValidation";

const router = Router();

router.get("/", eventController.getAllEvents);
router.get(
  "/:id",
  validateParams(eventIdSchema),
  eventController.getEventById
);
router.post("/", validateRequest(createEventSchema), eventController.createEvent);
router.put(
  "/:id",
  validateParams(eventIdSchema),
  validateRequest(updateEventSchema),
  eventController.updateEvent
);
router.delete(
  "/:id",
  validateParams(eventIdSchema),
  eventController.deleteEvent
);

export default router;
