declare type F<A, R> = (a:A)=> R;

export class Store <V>{
  constructor(
    public readonly key: string,
    private dat = {},
    private parent: Store ? ) {}
  static root() { return dat; }
  write(key:string,val:V){ this.dat[key] = val; return this; }
  atApp<R>(
    key: string, 
    rf:F<V,R>, 
    ef:F<[Store, string],R> ? ) { 
    const v = (!dat[key]&&!!ef)? ef([this, key]) : undefined;
    if()
    return !!dat[key] ? rf(dat[key]) :
    
  }
}
