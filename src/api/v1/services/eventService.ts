import {
  CreateEventInput,
  EVENTS_COLLECTION,
  Event,
  UpdateEventInput,
} from "../models/eventModel";
import * as firestoreRepository from "../repositories/firestoreRepository";

type StoredEvent = Omit<Event, "id">;

const toEvent = (doc: StoredEvent & { id: string }): Event => ({
  id: doc.id,
  title: doc.title,
  description: doc.description,
  eventType: doc.eventType,
  startDate: doc.startDate,
  endDate: doc.endDate,
  location: doc.location,
  isVirtual: doc.isVirtual,
  maxAttendees: doc.maxAttendees,
  ticketPrice: doc.ticketPrice,
  isPaid: doc.isPaid,
  organizerEmail: doc.organizerEmail,
  createdAt: doc.createdAt,
  updatedAt: doc.updatedAt,
});

const formatDate = (value: string | Date): string => {
  return value instanceof Date ? value.toISOString() : value;
};

export const createEvent = async (input: CreateEventInput): Promise<Event> => {
  try {
    const now = new Date().toISOString();
    const eventData: StoredEvent = {
      title: input.title,
      description: input.description ?? "",
      eventType: input.eventType,
      startDate: formatDate(input.startDate),
      endDate: formatDate(input.endDate),
      location: input.location ?? (input.isVirtual ? "Online" : ""),
      isVirtual: input.isVirtual ?? false,
      maxAttendees: input.maxAttendees,
      ticketPrice: input.ticketPrice ?? 0,
      isPaid: input.isPaid ?? false,
      organizerEmail: input.organizerEmail,
      createdAt: now,
      updatedAt: now,
    };

    const created = await firestoreRepository.createDocument(
      EVENTS_COLLECTION,
      eventData
    );
    return toEvent(created);
  } catch (error) {
    throw new Error(
      `Failed to create event: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
};

export const getAllEvents = async (): Promise<Event[]> => {
  try {
    const events = await firestoreRepository.getAllDocuments<StoredEvent>(
      EVENTS_COLLECTION
    );
    return events.map((doc) => toEvent(doc));
  } catch (error) {
    throw new Error(
      `Failed to get events: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
};

export const getEventById = async (id: string): Promise<Event | null> => {
  try {
    const event = await firestoreRepository.getDocumentById<StoredEvent>(
      EVENTS_COLLECTION,
      id
    );
    if (!event) {
      return null;
    }
    return toEvent(event);
  } catch (error) {
    throw new Error(
      `Failed to get event: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
};

export const updateEvent = async (
  id: string,
  input: UpdateEventInput
): Promise<Event | null> => {
  try {
    const existing = await firestoreRepository.getDocumentById<StoredEvent>(
      EVENTS_COLLECTION,
      id
    );
    if (!existing) {
      return null;
    }

    const updateData: Partial<StoredEvent> = {
      ...input,
      updatedAt: new Date().toISOString(),
    };

    if (input.startDate) {
      updateData.startDate = formatDate(input.startDate);
    }

    if (input.endDate) {
      updateData.endDate = formatDate(input.endDate);
    }

    await firestoreRepository.updateDocument(EVENTS_COLLECTION, id, updateData);

    const updated = await firestoreRepository.getDocumentById<StoredEvent>(
      EVENTS_COLLECTION,
      id
    );
    return updated ? toEvent(updated) : null;
  } catch (error) {
    throw new Error(
      `Failed to update event: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
};

export const deleteEvent = async (id: string): Promise<boolean> => {
  try {
    const existing = await firestoreRepository.getDocumentById<StoredEvent>(
      EVENTS_COLLECTION,
      id
    );
    if (!existing) {
      return false;
    }

    await firestoreRepository.deleteDocument(EVENTS_COLLECTION, id);
    return true;
  } catch (error) {
    throw new Error(
      `Failed to delete event: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
};
