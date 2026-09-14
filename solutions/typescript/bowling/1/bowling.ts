type Frame = {
  first: number;
  second?: number;
  strike: boolean;
  spare: boolean;
  score: number;
  bonuses?: number[];
};

export class Bowling {
  private frames: Frame[] = [];

  private lastPins: number | undefined = undefined;

  public roll(pins: number): void {
    if (this.isGameOver()) {
      throw new Error('Cannot roll after game is over');
    }

    if (pins < 0) {
      throw new Error('Negative roll is invalid');
    }

    if (pins > 10 || (this.lastPins !== undefined && this.lastPins + pins > 10)) {
      throw new Error('Pin count exceeds pins on the lane');
    }

    this.addBonuses(pins);

    if (this.lastPins === undefined) {
      if (pins == 10) {
        if (this.frames.length < 10) {
          this.addStrike();
        }
      } else {
        this.lastPins = pins;
      }

      return;
    }

    if (this.frames.length < 10) {
      this.addFrame(this.lastPins, pins);
    }
    
    this.lastPins = undefined;
  }

  public score(): number {
    if (! this.isGameOver()) {
      throw new Error('Score cannot be taken until the end of the game');
    }

    return this.frames.reduce((score, frame) => score + frame.score, 0);
  }

  private addStrike(): void {
    this.frames.push({ 
      first: 10, 
      strike: true, 
      spare: false, 
      score: 10 
    });
  }

  private addFrame(first: number, second: number): void {
    this.frames.push({ 
      first, 
      second, 
      strike: false, 
      spare: first + second == 10, 
      score: first + second 
    });
  }

  private addBonuses(pins: number) {
    this.addStrikeBonus(pins);
    
    if (this.lastPins === undefined) {
      this.addSpareBonus(pins);
    }
  }

  private addStrikeBonus(pins: number) {
    if (this.frames.length > 0 && this.frames[this.frames.length - 1].strike) {
      this.addFrameBonus(this.frames[this.frames.length - 1], pins);
      
      if (this.frames.length > 1 && this.frames[this.frames.length - 2].strike) {
        this.addFrameBonus(this.frames[this.frames.length - 2], pins);
      }
    }

  }

  private addSpareBonus(pins: number) {
    if (this.frames.length > 0 && this.frames[this.frames.length - 1].spare) {
      this.addFrameBonus(this.frames[this.frames.length - 1], pins);
    } 
  }

  private addFrameBonus(frame: Frame, bonus: number) {
    if (frame.bonuses?.length == 2) {
      return;
    }

    frame.score += bonus;

    if (frame.bonuses) {
      frame.bonuses.push(bonus);
    } else {
      frame.bonuses = [bonus];
    }
  }

  private isGameOver(): boolean {
    if (this.frames.length < 10) {
      return false;
    }

    if (this.frames[9].spare) {
      if ((this.frames[9].bonuses?.length || 0) < 1) {
        return false;
      }
    }

    if (this.frames[9].strike) {
      if ((this.frames[9].bonuses?.length || 0) < 2) {
        return false;
      }
    }

    return true;
  }
}