export { Target, TargetTrack };

abstract class Target {
  private clues: string[] = [];
  protected abstract name: string;

  protected abstract pickFromTop(range: number): void;

  protected abstract initializeClues(): void;

  protected abstract assignName(): string;

  public get Clues(): string[] {
    return this.clues;
  }

  public checkName(guess: string): boolean {
    return this.name.toLowerCase() === guess.toLowerCase();
  }
}

class TargetTrack extends Target {
  name: string;
  trackId!: string;
  trackName!: string;
  artistName!: string;
  playCount!: number;
  durationSeconds!: number;

  constructor(range: number) {
    super();
    this.pickFromTop(range);
    this.initializeClues();
    this.name = this.assignName();
  }

  pickFromTop(range: number): void {
    //do http request
    this.trackId = "someId";
    this.trackName = "Some Track Name";
    this.artistName = "Some Artist";
    this.playCount = 42 + range; //just to make eslint happy for now
    this.durationSeconds = 215;
  }
  initializeClues(): void {
    this.Clues.push(
      "You have listened to this song " + this.playCount + " times.",
    );

    this.Clues.push("This song is by " + this.artistName + ".");

    this.Clues.push(
      "This song is " +
        this.convertSecondsToTimeString(this.durationSeconds) +
        " long.",
    );

    let hangman: string = this.trackName.substring(0, 2);
    hangman += this.trackName.substring(2).replace(RegExp("[^ ]"), " _");
    hangman = hangman.replace("  ", "   ");
    this.Clues.push(hangman);
  }

  assignName(): string {
    return this.trackName;
  }

  private convertSecondsToTimeString(durationSeconds: number): string {
    const hours = Math.floor(durationSeconds / 3600);
    const minutes = Math.floor((durationSeconds % 3600) / 60);
    const seconds = Math.floor(durationSeconds % 60);

    if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    } else {
      return `${seconds}s`;
    }
  }
}
//class TargetArtist extends Target {}
//class TargetAlbum extends Target {}
