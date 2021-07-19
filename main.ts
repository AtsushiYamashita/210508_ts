import { Logger } from './log';

Logger.logto('app', 'TypeScript works!');

const dat = [
   '17n nnn n5n',
   '3n5 6n1 nn4',
   '9n6 2nn n18',

   'nnn 9n4 6nn',
   'n5n 3nn 92n',
   '6nn nnn 4n5',

   '41n nnn 5nn',
   '8nn n9n nnn',
   'n23 nnn 86n',
   ];

const d2 = [
   'nnn n1n n3n',
   '89n 4n6 7nn',
   'nn5 nnn nnn',

   'nnn nnn nn8',
   'nnn 1n5 9nn',
   '6nn 2n4 nnn',

   'nnn 8nn n4n',
   'nn9 6nn nn5',
   'n13 nnn n8n',
   ];


class Ut {
  static indexArr(len, s = 0) {
    return Array(len).fill(-1).map((_, i) => i + s);
  }
}



const delta = str => Ut.indexArr(str.length)
  .map(i => str[i])
  .filter(s => s !== "n").length;

const iarr = Ut.indexArr(9);
const ia3 = Ut.indexArr(3);

class NamedMat {
  constructor(dat) {
    Logger.log(JSON.stringify(dat));
    const sss: string = dat.join('').replace(/ /g, "");
    const ch = 'abcdefghijk';
    const look = (x, y) => sss[y * 9 + x];
    this.dat = [];
    iarr.forEach(y => iarr.forEach(x =>
      this.dat
      .push({
        p: '_' + y * 10 + x,
        d: '_' + Math.floor(y / 3) * 10 + Math.floor(x / 3),
        r: look(x, y),
        a: Number(look(x, y)) ? [look(x, y)] : Ut.indexArr(9)
      })
    ));
    this.takex = this.takex.bind(this);
    Logger.log(JSON.stringify(this));
  }

  takex(x, y) {
    const ret = iarr
      .filter(n => x !== n)
      .map(ix => this.dat.filter(e => e.p === "_" + y * 10 + ix)[0])

    Logger.log(iarr)
    Logger.log(ret)
  }
}

function ddd(dat: string[], r = 0) {
  if (r > 100) return dat;
  const sss: string = dat.join('').replace(/ /g, "");
  // Logger.logto("app", dat.join('<br>'));
  if (sss.indexOf("n") < 0) return dat;
  const d1 = delta(sss);

  const sect = n => iarr.filter(i =>
    Math.floor(n / 3) === Math.floor(i / 3));

  const look = (x, y) => sss[y * 9 + x];


  function getUsed(x, y) {
    const xarr = Ut.indexArr(9)
      .map(i => dat[y].replace(/ /g, "")[i])
      //.filter(e=>e!=="n")
      .filter(Number);
    const yarr = Ut.indexArr(9)
      .map(i => dat[i].replace(/ /g, "")[x])
      //.filter(e=>e!=="n")
      .filter(Number);

    const sx = Math.floor(x / 3),
      sy = Math.floor(y / 3);
    const sarr = [].concat(...ia3.map(ix =>
      ia3.map(iy => look(3 * sx + ix, 3 * sy + iy))
    )).filter(Number);

    const used = [].concat(xarr, yarr, sarr).sort();
    return used;
  }

  function kickAt(x, y) {
    const target = look(x, y);
    if (target !== "n") return [Number(target)];

    const used = getUsed(x, y);
    const usable = Ut.indexArr(9, 1)
      .filter(e => !used.some(u => u == e));
    return usable; //"n";
  }

  function takeAt(arr, x, y) {

    const usable = arr[y][x];
    if (usable.length === 1) return usable;
    if (usable.length === 0) throw new Error('ERR 094' + x);
    Logger.log('takeAt' + x + "," + y + "/n" +
      JSON.stringify(arr, null, '  '));
    const sectCros = [].concat(...sect(y).map(yi => sect(x)));

    const a0 = usable
      .filter(n => Ut
        .indexArr(9)
        .filter(i => arr[y][i].some(t => t === n))
        .length < 1
      );
    const a1 = a0
      .filter(n => Ut
        .indexArr(9)
        .filter(i => arr[i][x].some(t => t === n))
        .length < 1
      );
    const a2 = a1
      .filter(n => sectCros
        .map(i => i.some(cn => n === cn))
        .length < 1
      );
    Logger.log('a2', a2);
    return a2;

  }
  const tarr = iarr.map(nx =>
    iarr.map(ny => (kickAt(ny, nx)))
  );
  const toSet = iarr.map(nx =>
    iarr.map(ny => takeAt(tarr, nx, ny))
  );

  const toPs = non => non.length === 1 ? non[0] : "n"; //"abcdefghijk"[non.length-1];

  const toNy = nx => ny => toPs() +
    (ny % 3 == 2 ? " " : "");

  const ret = iarr.map(nx =>
    iarr.map(toNy(nx)).join("")
  );

  if (delta(ret.join('').replace(/ /g, "")) !== d1)
    return ddd(ret, r + 1);
  return ["-1"].concat(ret);
}

new NamedMat(d2).takex(1, 1);


Logger.logto("app", d2.join('<br>'));
// Logger.logto("app", ddd(d2).join('<br>'));


// Logger.logto("app", kickAt(0, n));

declare type FR < R > = () => R;
declare type FAR < A, R > = (a: A) => R;
declare type CodeError = [number, Error];


class Wrap < V > {
  private readonly _onCall: FAR < V,
  any > [] = [];
  constructor(
    private readonly _v: V[],
    private readonly _msg: CodeError[] = []) {}

  app < V2 > (f: FAR < V, V2 > ): Wrap < V2 > {
    if (this._msg, length > 0) {
      return new Wrap([], this._msg);
    }
    try {
      const ret = this._v.map(f);
      ret.forEach(r => this._onCall(c => c(r)))
      return new Wrap(ret, this._msg);
    } catch (e: Error) {
      return new Wrap([e], [])
    }
  }

  tap(): Wrap < V > {
    return this;
  }

  addOnCall(f: FAR < V, any > ) {
    this._onCall.push(f);
  }
}

class OnTrigger < K, V > {
  constructor(key: K, cb: FAR < V, any > ) {}
}