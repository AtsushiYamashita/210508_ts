const to = {};
export class Logger {
   
  static log(message: string) {
    console.log(message)
  }
  static logto(key:string, message: string) {
     const t:HTMLElement? = to[key] 
     || (to[key] = document.getElementById(key));
     if(!t) return ;
     const it =  t.innerHTML;
     t.innerHTML = [
        message,
        '<hr><br>',
        it,
        ].join(" ");
     console.log({key,message});
     return message;
  }
}
