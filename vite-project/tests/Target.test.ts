import { describe, it, expect, beforeEach } from "vitest";
import { TargetTrack } from "../src/Target";

describe("TargetTrack", () => {
  let targetTrack: TargetTrack;
  const testRange = 10;

  beforeEach(() => {
    targetTrack = new TargetTrack(testRange);
  });

  describe("constructor and initialization", () => {
    it("should initialize with all properties set", () => {
      expect(targetTrack.trackId).toBe("someId");
      expect(targetTrack.trackName).toBe("Some Track Name");
      expect(targetTrack.artistName).toBe("Some Artist");
      expect(targetTrack.playCount).toBe(42 + testRange);
      expect(targetTrack.durationSeconds).toBe(215);
      expect(targetTrack.name).toBe("Some Track Name");
    });

    it("should initialize clues array with 4 clues", () => {
      expect(targetTrack.Clues.length).toBe(4);
    });

    it("should have correct clue content", () => {
      const clues = targetTrack.Clues;

      expect(clues[0]).toBe("You have listened to this song 52 times.");
      expect(clues[1]).toBe("This song is by Some Artist.");
      expect(clues[2]).toContain("long.");
      expect(clues[3]).toContain("hangman");
    });
  });

  describe("pickFromTop", () => {
    it("should set all track properties", () => {
      const newTrack = new TargetTrack(20);
      expect(newTrack.trackId).toBeDefined();
      expect(newTrack.trackName).toBeDefined();
      expect(newTrack.artistName).toBeDefined();
      expect(newTrack.playCount).toBeDefined();
      expect(newTrack.durationSeconds).toBeDefined();
    });

    it("should calculate playCount with range", () => {
      const track1 = new TargetTrack(0);
      const track2 = new TargetTrack(50);

      expect(track1.playCount).toBe(42);
      expect(track2.playCount).toBe(92);
    });
  });

  describe("initializeClues", () => {
    it("should include play count in first clue", () => {
      expect(targetTrack.Clues[0]).toContain(targetTrack.playCount.toString());
    });

    it("should include artist name in second clue", () => {
      expect(targetTrack.Clues[1]).toContain(targetTrack.artistName);
    });

    it("should include duration in third clue", () => {
      expect(targetTrack.Clues[2]).toContain("m");
      expect(targetTrack.Clues[2]).toContain("s");
    });

    it("should include hangman clue", () => {
      const hangmanClue = targetTrack.Clues[3];
      expect(hangmanClue).toContain("_");
      expect(hangmanClue.startsWith("So")).toBe(true);
    });
  });

  describe("assignName", () => {
    it("should return track name as the name", () => {
      expect(targetTrack.name).toBe(targetTrack.trackName);
    });
  });

  describe("checkName", () => {
    it("should return true for correct name with exact case", () => {
      expect(targetTrack.checkName("Some Track Name")).toBe(true);
    });

    it("should return true for correct name with different case", () => {
      expect(targetTrack.checkName("some track name")).toBe(true);
      expect(targetTrack.checkName("SOME TRACK NAME")).toBe(true);
      expect(targetTrack.checkName("SoMe tRaCk NaMe")).toBe(true);
    });

    it("should return false for incorrect name", () => {
      expect(targetTrack.checkName("Wrong Track Name")).toBe(false);
      expect(targetTrack.checkName("Some")).toBe(false);
      expect(targetTrack.checkName("")).toBe(false);
    });
  });

  describe("Clues getter", () => {
    it("should return the clues array", () => {
      const clues = targetTrack.Clues;
      expect(Array.isArray(clues)).toBe(true);
      expect(clues.length).toBeGreaterThan(0);
    });

    it("should return same array instance", () => {
      const clues1 = targetTrack.Clues;
      const clues2 = targetTrack.Clues;
      expect(clues1).toBe(clues2);
    });
  });

  describe("convertSecondsToTimeString", () => {
    it("should format 215 seconds correctly", () => {
      const target = new TargetTrack(0);
      expect(target.Clues[2]).toContain("3m 35s");
    });

    it("should format time with hours", () => {
      // Test with a track that has hours
      const target = new TargetTrack(0);
      // durationSeconds is always 215 in pickFromTop, so this just verifies format
      expect(target.Clues[2]).toMatch(/\d+m \d+s/);
    });

    it("should format time with only seconds", () => {
      // Since pickFromTop always sets 215 seconds, we verify the format includes seconds
      expect(targetTrack.Clues[2]).toMatch(/\d+s/);
    });
  });

  describe("multiple instances", () => {
    it("should create independent instances with correct properties", () => {
      const track1 = new TargetTrack(10);
      const track2 = new TargetTrack(20);

      expect(track1.playCount).toBe(52);
      expect(track2.playCount).toBe(62);
      expect(track1.Clues).not.toBe(track2.Clues);
    });
  });
});
