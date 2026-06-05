import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as eventService from "../services/eventService";

export const createEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const event = await eventService.createEvent(req.body);
    res.status(HTTP_STATUS.CREATED).json({
      message: "Event created",
      data: event,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: error instanceof Error ? error.message : "Failed to create event",
    });
  }
};

export const getAllEvents = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const events = await eventService.getAllEvents();
    res.status(HTTP_STATUS.OK).json({
      message: "Events retrieved",
      count: events.length,
      data: events,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: error instanceof Error ? error.message : "Failed to get events",
    });
  }
};

export const getEventById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const event = await eventService.getEventById(req.params.id);
    if (!event) {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Event not found" });
      return;
    }

    res.status(HTTP_STATUS.OK).json({
      message: "Event retrieved",
      data: event,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: error instanceof Error ? error.message : "Failed to get event",
    });
  }
};

export const updateEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const event = await eventService.updateEvent(req.params.id, req.body);
    if (!event) {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Event not found" });
      return;
    }

    res.status(HTTP_STATUS.OK).json({
      message: "Event updated",
      data: event,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: error instanceof Error ? error.message : "Failed to update event",
    });
  }
};

export const deleteEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deleted = await eventService.deleteEvent(req.params.id);
    if (!deleted) {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Event not found" });
      return;
    }

    res.status(HTTP_STATUS.OK).json({
      message: "Event deleted",
      data: { id: req.params.id },
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: error instanceof Error ? error.message : "Failed to delete event",
    });
  }
};
