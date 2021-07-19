export class SBuffer {
  public readonly payload: string;
  constructor() {
    this.payload = Array(...arguments)
    this.add = this.add.bind(this);
  }
  static c() { return new SBuffer(...arguments); }
  apend(s) { return SBuffer.c(...this.payload, s); }
  apendJson(val, sp: string = '  ') {
    const fn = (k, v) => typeof v !== 'function' ? v : ('#' + v.name);
    const s = JSON.stringify(val, fn, sp);
    return this.apend(s);
  }
}
