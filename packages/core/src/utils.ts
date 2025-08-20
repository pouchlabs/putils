import { start } from "repl";
import checktype from "./check-type";
/**
 * 
 * @param bytes - bytes to format
 * @param decimals - digits to round
 * @returns - string
 */
export function bytesForHuman(bytes:number, decimals = 2) {
    let units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB','EB', 'ZB', 'YB']
    let i = 0
    for (i; bytes > 1024; i++) {
        bytes /= 1024;
    }
    return parseFloat(bytes.toFixed(decimals)) + ' ' + units[i]
  }

    //unique method
    function uniqueDeepArr(arr){
        const arrUniq = [...new Map(arr.slice().map(v => [v.id, v])).values()]//.reverse()
           const map = new Map()
           let deeparr = [];
           for(let i in arrUniq){
           
             for(let d in arrUniq[i]){
              
                map.set(d,arrUniq[i][d])
                if(checktype(map.get(d))=== checktype([])){
                  let unique = [];
    
                  //objects
                  let obarr = [];
                  let sarr = [];
                  let narr = [];
                //loop props
                 for(let val of map.get(d)){
                   if(checktype(val) === checktype({})){
                    obarr.push(val)
                   }
                   if(checktype(val)=== "string"){
                    sarr.push(val)
                   }
                   if(checktype(val)=== "number"){
                    narr.push(val)
                   }
                 }
                      //objects
                    for(let f of uniqueDeepArr(obarr)){
                      unique.push(f)
                     }
                     //strings
                     for(let f of removeDuplicate(sarr)){
                       unique.push(f)
                     }
                      //numbers
                      for(let f of removeDuplicate(narr)){
                        unique.push(f)
                      } //the other way
                
                    //concurent
                  map.set(d,unique)
                   deeparr.push(Object.fromEntries(map))
                }else{
                  deeparr.push(Object.fromEntries(map))
                }
             }
           }
         
        
          return [...new Map(deeparr.slice().map(v => [v.id, v])).values()]
               
    }
    
    
export function removeDuplicate(array) {
    return [...new Set(array.map(s => JSON.stringify(s)))]
      .map(s => JSON.parse(s));
}

export function uniqueArr(arr){
      let unique = [];
    
      //objects
      let obarr = [];
      let sarr = [];
      let narr = [];
    //loop props
     for(let val of arr){
       if(checktype(val) === checktype({})){
        obarr.push(val)
       }
       if(checktype(val)=== "string"){
        sarr.push(val)
       }
       if(checktype(val)=== "number"){
        narr.push(val)
       }
     }
          //objects
        for(let f of uniqueDeepArr(obarr)){
          unique.push(f)
         }
         //strings
         for(let f of removeDuplicate(sarr)){
           unique.push(f)
         }
          //numbers
          for(let f of removeDuplicate(narr)){
            unique.push(f)
          }
       
         return unique
        }
       
        
    
     //loop merged
     
     
    export  function deepMergeUnique(merged:object){
       let map_to_save = new Map();
       //loop keys
       for(let i in merged){
          let full_key_value = merged[i];
          //check for array
          if(checktype(full_key_value) === checktype([])){
      
             map_to_save.set(i,uniqueArr(full_key_value))
          }
          else{
            map_to_save.set(i,merged[i])
          }
       }
     
       return Object.fromEntries(map_to_save)
     }
    
     export function removeListDuplicate(list:[]){
        return list.filter((val,idx)=>list.indexOf(val) === idx)
    }


export function genRangeByMax(min=0, max=null){
  if(max === null){
      max=min;
      min=0;
  }
  var rg=[...Array(max).keys()];
  return rg.slice(min,max);
} 

function* generateRange(start, end, step = 1) {
  let current = start;
  while (start < end ? current <= end : current >= end) {
      yield current;
      current = start < end ? current + step : current - step;
  }
}

export function genRange(start: number, end: number, step = 1): number[] {
  return [...generateRange(start, end, step)];
}

export function* genRangeByStream(...args) {
  let [min, step, max] = {
      0: [0, 1, 10],
      1: [0, args[0] >= 0 ? 1 : -1, args[0]],
      2: [args[0], args[1] >= args[0] ? 1 : -1, args[1]],
      3: args,
  }[args.length] || [];
  if (min === undefined) throw new SyntaxError("Too many arguments");
  let x = min;
  while (step >= 0 ? x < max : x > max) {
      yield x;
      x += step
  }
}

/**
 * generate range of numbers and letters in forward mode
 * @param from 
 * @param to 
 * @param step 
 * @returns 
 */
export const range  = function (from: number | string, to : number | string, step : number) {
  if (typeof from !== 'number' && typeof from !== 'string') {
    throw new TypeError('The first parameter should be a number or a character')
  }

  if (typeof to !== 'number' && typeof to !== 'string') {
    throw new TypeError('The second parameter should be a number or a character')
  }

  var A = []
  if (typeof from === 'number') {
    A[0] = from
    step = step || 1
    while (from + step <= to) {
      A[A.length] = from += step
    }
  } else {
    var s = 'abcdefghijklmnopqrstuvwxyz'
    if (from === from.toUpperCase()) {
      to = to.toUpperCase()
      s = s.toUpperCase()
    }
    s = s.substring(s.indexOf(from), s.indexOf(to) + 1)
    A = s.split('')
  }
  return A
}


export function genRangeWithBound(
  startOrStop: number,
  stop?: number,
  step: number = 1,
): number[] {
  if (step === 0) {
    throw new RangeError('Parameter step must be different from 0');
  }
  const startBound = stop === undefined ? 0 : startOrStop;
  const stopBound = stop === undefined ? startOrStop : stop;
  return Array.from(
    { length: Math.ceil((stopBound - startBound) / step) },
    (_, index) => startBound + index * step,
  );
}

/**
 * generates range one way no reverse.
 * @param start 
 * @param end 
 * @param step 
 * @returns 
 */
export const genRangeOneWay = function(start:number, end:number, step:number) {
  var resar = [];
  for (var i=start;(step<0 ? i>=end:i<=end); i += (step == undefined ? 1:step)){
      resar.push(i);
    };
  return resar;
};

/**
 * generates ranges of numbers with step or of letters.
 * @param start 
 * @param end 
 * @param step 
 * @returns 
 */
export const genRangeWithStep = function(start:number | string, end: number | string, step: number = 1){
  if (start == undefined) { return [] } // "undefined" check

  if ( (step === 0) )  {  return [];
  }  // "step" == 0  check
  if (typeof start == 'number') { // number check
      if (typeof end == 'undefined') { // single argument input
          end = start;
          start = 0;
          step = 1;
      }
      if ((!step) || (typeof step != 'number')) {
        step = end < start ? -1 : 1;
      }
      var length = Math.max(Math.ceil((end - start) / step), 0);
      var out = Array(length);
      for (var idx = 0; idx < length; idx++, start += step) {
        out[idx] = start;
      }
      // Uncomment to check "end" in range() output,
      if ( (out[out.length-1] + step) == end ) { // "end" check
          out.push(end)
      }

  } else { 
      var st = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ&'; // axiom ordering

      if (typeof end == 'undefined') { // single argument input
          end = start;
          start = 'a';
      }

      var first = st.indexOf(start);
      var last = st.indexOf(end);

      if ((!step) || (typeof step != 'number')) {
        step = last < first ? -1 : 1;
      }

      if ((first == -1) || (last == -1 )) { // check 'first' & 'last'
          return []
      }

      var length = Math.max(Math.ceil((last - first) / step), 0);
      var out = Array(length);

      for (var idx = 0; idx < length; idx++, first += step) {
        out[idx] = st[first];
      } 
      // Uncomment to check "end" in range() output
      if ( (st.indexOf(out[out.length-1]) + step ) === last ) { // "end" check
          out.push(end)
      }
  }
  return out;
}

export const genRangeBothWays = (a: number,b: number):number[] => Array(Math.abs(a-b)+1).fill(a).map((v,i)=>v+i*(a>b?-1:1));

/**
 * generates a list by range
 * @param list 
 * @param start 
 * @param range - divide by number
 * @returns 
 */
export async function genListByRange(list:[],start=0,range=2){
  if(!list || checktype(list) !== checktype([]) || !range || typeof range !== "number" || typeof start !== "number"){
    throw new Error("provide required options")
  }
  if(start <= list.length - 1 || range <= list.length -1){
    let threed_list = [];
  for(let num of genRange(start,list.length -1,range) ){
    threed_list.push(list.slice(num , num + range ))
  }
  return threed_list || [];
  }
}
