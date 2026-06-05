export const EVENTS_COLLECTION = "events";

export const EVENT_TYPES = [
  "workshop",
  "conference",
  "webinar",
  "networking",
] as const;

export type EventType = (typeof EVENT_TYPES)[number];

export interface Event {
  id: string;
  title: string;
  description: string;
  eventType: EventType;
  startDate: string;
  endDate: string;
  location: string;
  isVirtual: boolean;
  maxAttendees: number;
  ticketPrice: number;
  isPaid: boolean;
  organizerEmail: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEventInput {
  title: string;
  description?: string;
  eventType: EventType;
  startDate: string;
  endDate: string;
  location?: string;
  isVirtual?: boolean;
  maxAttendees: number;
  ticketPrice?: number;
  isPaid?: boolean;
  organizerEmail: string;
}

export interface UpdateEventInput {
  title?: string;
  description?: string;
  eventType?: EventType;
  startDate?: string;
  endDate?: string;
  location?: string;
  isVirtual?: boolean;
  maxAttendees?: number;
  ticketPrice?: number;
  isPaid?: boolean;
  organizerEmail?: string;
}
