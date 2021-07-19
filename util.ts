export interface IUtil {
  key(): string;
}


export class DebugUtil implements IUtil {
  constructor(public readonly mKey: string) {}
  key() { return this.mKey; }
  stringify() {}
}