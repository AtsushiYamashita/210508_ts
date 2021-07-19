export declare type F < A, R > = (arg: A) => R;

export namespace State {
  export function yet() {}

  export function init() {}

  export function refused() {}
  export declare type InitEnum = yet | init | refused;

  function doSleep() {}

  function doUpdate() {}

  function done() {}
  export declare type DoEnum = done | doSleep | doUpdate;

  function abort() {}

  function aborted() {}

  function closed() {}
  export declare type CloseEnum = abort | aborted | closed;

  export declare type Enum = InitEnum | DoEnum | CloseEnum;

  export const list = [
    yet, init, refused,
    doSleep, doUpdate, done,
    abort, aborted, closed];
}

export class LogParam < T > {
  constructor(
    public readonly mWho: string,
    public readonly mCount: number,
    public readonly mDat: T,
    public readonly mDump: string) {}
}

export class LogStack < T > {

  private mOwn: LogParam < T > [];

  constructor(
    public readonly mKey: string,
    private readonly mLimit: number) {
    this.mOwn = Array(mLimit);
    this.write = this.write.bind(this);
  }

  write(dat: T, fDump: F < T, string > ? ) {
    while (this.mOwn.length >= this.mLimit) {
      this.mOwn.shift();
    }
    const dump = !fDump ? '' : fDump(dat);
    const d = new LogParam(
      this.mKey, this.mOwn.length, dat, dump
    );
    this.mOwn.unshift(d);
    return this;
  }

  own() { return this.mOwn.concat(); }
}


export class Behaviour {
  private mCurrent: State.Enum = State.yet;
  private mPrev: State.Enum = State.yet;

  constructor(
    public readonly mKey: string
  ) {
    State.list
      .map(f => f.name)
      .forEach(n => this[n] = this[n].bind(this));
  }

  yet(): Behaviour { return this; };
  init(): Behaviour { return this; };
  refused(): Behaviour { return this; };

  doSleep(): Behaviour { return this; };
  doUpdate(): Behaviour { return this; };
  done(): Behaviour { return this; };

  abort(): Behaviour { return this; };
  aborted(): Behaviour { return this; };
  closed(): Behaviour { return this; };

  _next(state: State.Enum) {
    this.mPrev = this.mCurrent;
    this.mCurrent = state;
    return this;
  }

  _isChanged() {
    return this.mPrev !== this.mCurrent;
  }

  _next(state: State.Enum, f: F < void, Behaviour > ) {
    this[state.name] = f.bind(this);
    return this;
  }

  _copy() {
    const ret = new Behaviour(this.mKey + '+');
    ret.mPrev = this.mPrev;
    ret.mCurrent = this.mCurrent;
    State.list
      .map(f => f.name)
      .forEach(n => ret[n] = this[n].bind(ret));
  }
}


/*
export abstract class PhaseUnit {

  constructor(
    private readonly mInstance: PhaseUnit,
    
  ) {}

  abstract stringify(
    replacer: F < string, F < any, string >> ,
    tabw: number,
    dep: number = 0): string;

}
//*/