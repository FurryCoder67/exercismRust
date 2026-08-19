export class SplitSecondStopwatch {
  private _state: 'ready' | 'running' | 'stopped'
  private _currentLap: number
  private _previousLaps: number[]

  constructor() {
    this._state = 'ready'
    this._currentLap = 0
    this._previousLaps = []
  }

  public get state(): string {
    return this._state
  }

  public get currentLap(): string {
    return this.formatTime(this._currentLap)
  }

  public get total(): string {
    const total =
      this._currentLap +
      this._previousLaps.reduce((sum, lap) => sum + lap, 0)

    return this.formatTime(total)
  }

  public get previousLaps(): string[] {
    return this._previousLaps.map(lap => this.formatTime(lap))
  }

 public start(): void {
  if (this._state === 'running') {
    throw new Error('cannot start an already running stopwatch')
  }

  this._state = 'running'
}

public stop(): void {
  if (this._state !== 'running') {
    throw new Error('cannot stop a stopwatch that is not running')
  }

  this._state = 'stopped'
}

public lap(): void {
  if (this._state !== 'running') {
    throw new Error('cannot lap a stopwatch that is not running')
  }

  this._previousLaps.push(this._currentLap)
  this._currentLap = 0
}

 public reset(): void {
  if (this._state !== 'stopped') {
    throw new Error('cannot reset a stopwatch that is not stopped')
  }

  this._state = 'ready'
  this._currentLap = 0
  this._previousLaps = []
}

  public advanceTime(duration: string): void {
    if (this._state !== 'running') {
      return
    }

    this._currentLap += this.parseTime(duration)
  }

  private parseTime(time: string): number {
    const [hours, minutes, seconds] = time.split(':').map(Number)

    return hours * 3600 + minutes * 60 + seconds
  }

  private formatTime(totalSeconds: number): string {
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }
}