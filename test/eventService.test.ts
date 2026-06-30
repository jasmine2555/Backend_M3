import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getEventById,
  updateEvent,
} from "../src/api/v1/services/eventService";
import * as firestoreRepository from "../src/api/v1/repositories/firestoreRepository";

jest.mock("../src/api/v1/repositories/firestoreRepository");

const storedEvent = {
  id: "event_abc123",
  title: "Tech Conference 2025",
  description: "Annual technology conference",
  eventType: "conference" as const,
  startDate: "2026-12-20T09:00:00.000Z",
  endDate: "2026-12-20T17:00:00.000Z",
  location: "Convention Center Hall A",
  isVirtual: false,
  maxAttendees: 500,
  ticketPrice: 49.99,
  isPaid: true,
  organizerEmail: "organizer@example.com",
  createdAt: "2026-06-05T06:00:00.000Z",
  updatedAt: "2026-06-05T06:00:00.000Z",
};

describe("Event Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createEvent", () => {
    it("should call repository createDocument with event data", async () => {
      // Arrange
      const input = {
        title: storedEvent.title,
        description: storedEvent.description,
        eventType: storedEvent.eventType,
        startDate: storedEvent.startDate,
        endDate: storedEvent.endDate,
        location: storedEvent.location,
        isVirtual: storedEvent.isVirtual,
        maxAttendees: storedEvent.maxAttendees,
        ticketPrice: storedEvent.ticketPrice,
        isPaid: storedEvent.isPaid,
        organizerEmail: storedEvent.organizerEmail,
      };
      (firestoreRepository.createDocument as jest.Mock).mockResolvedValue(storedEvent);

      // Act
      const result = await createEvent(input);

      // Assert
      expect(firestoreRepository.createDocument).toHaveBeenCalledWith(
        "events",
        expect.objectContaining({ title: input.title })
      );
      expect(result.id).toBe("event_abc123");
    });
  });

  describe("getAllEvents", () => {
    it("should return all events from the repository", async () => {
      // Arrange
      (firestoreRepository.getAllDocuments as jest.Mock).mockResolvedValue([storedEvent]);

      // Act
      const result = await getAllEvents();

      // Assert
      expect(firestoreRepository.getAllDocuments).toHaveBeenCalledWith("events");
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe("event_abc123");
    });
  });

  describe("getEventById", () => {
    it("should return null when event is not found", async () => {
      // Arrange
      (firestoreRepository.getDocumentById as jest.Mock).mockResolvedValue(null);

      // Act
      const result = await getEventById("missing_id");

      // Assert
      expect(result).toBeNull();
    });
  });

  describe("updateEvent", () => {
    it("should update an existing event", async () => {
      // Arrange
      const updatedEvent = {
        ...storedEvent,
        title: "Updated Tech Conference 2025",
        maxAttendees: 600,
      };
      (firestoreRepository.getDocumentById as jest.Mock)
        .mockResolvedValueOnce(storedEvent)
        .mockResolvedValueOnce(updatedEvent);
      (firestoreRepository.updateDocument as jest.Mock).mockResolvedValue(updatedEvent);

      // Act
      const result = await updateEvent("event_abc123", {
        title: "Updated Tech Conference 2025",
        maxAttendees: 600,
      });

      // Assert
      expect(result?.title).toBe("Updated Tech Conference 2025");
      expect(result?.maxAttendees).toBe(600);
    });
  });

  describe("deleteEvent", () => {
    it("should delete an existing event", async () => {
      // Arrange
      (firestoreRepository.getDocumentById as jest.Mock).mockResolvedValue(storedEvent);
      (firestoreRepository.deleteDocument as jest.Mock).mockResolvedValue(undefined);

      // Act
      const result = await deleteEvent("event_abc123");

      // Assert
      expect(firestoreRepository.deleteDocument).toHaveBeenCalledWith(
        "events",
        "event_abc123"
      );
      expect(result).toBe(true);
    });
  });
});
