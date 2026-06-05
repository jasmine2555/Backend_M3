import { createEventSchema } from "../src/api/v1/validation/eventValidation";

const validEvent = {
  title: "Tech Conference 2025",
  description: "Annual technology conference",
  eventType: "conference",
  startDate: "2026-12-20T09:00:00.000Z",
  endDate: "2026-12-20T17:00:00.000Z",
  location: "Convention Center Hall A",
  isVirtual: false,
  maxAttendees: 500,
  ticketPrice: 49.99,
  isPaid: true,
  organizerEmail: "organizer@example.com",
};

describe("Event Validation", () => {
  describe("createEventSchema", () => {
    it("should pass validation for valid event data", () => {
      // Arrange
      const input = { ...validEvent };

      // Act
      const { error } = createEventSchema.validate(input);

      // Assert
      expect(error).toBeUndefined();
    });

    it("should fail validation when title is missing", () => {
      // Arrange
      const { title: _title, ...inputWithoutTitle } = validEvent;

      // Act
      const { error } = createEventSchema.validate(inputWithoutTitle);

      // Assert
      expect(error).toBeDefined();
      expect(error?.details[0].message).toMatch(/title/i);
    });

    it("should fail validation for invalid maxAttendees type", () => {
      // Arrange
      const input = {
        ...validEvent,
        maxAttendees: "not-a-number" as unknown as number,
      };

      // Act
      const { error } = createEventSchema.validate(input);

      // Assert
      expect(error).toBeDefined();
      expect(error?.details[0].message).toMatch(/max attendees/i);
    });

    it("should fail validation when title is too short", () => {
      // Arrange
      const input = {
        ...validEvent,
        title: "Hi",
      };

      // Act
      const { error } = createEventSchema.validate(input);

      // Assert
      expect(error).toBeDefined();
      expect(error?.details[0].message).toMatch(/title must be at least 5 characters/i);
    });
  });
});
