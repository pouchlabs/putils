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