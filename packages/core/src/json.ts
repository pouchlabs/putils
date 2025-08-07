
interface Jsonobj{
    stringify:Function,
    parse:Function,
    clone:Function

}

let Json:Jsonobj = {
    /**
     * 
     * @param obj - object to stringify
     * @returns string
     */
   stringify: function (obj:{}) {
    
        return JSON.stringify(obj,(key, value)=> {
          var fnBody;
          if (value instanceof Function || typeof value == 'function') {
          fnBody = value.toString();
            if (fnBody.length < 8 || fnBody.substring(0, 8) !== 'function') { //this is ES6 Arrow Function
              return '_NuFrRa_' + fnBody;
            }
            return fnBody;
          }
          if (value instanceof RegExp) {
            return '_PxEgEr_' + value;
          }
          return value;
        });
      },
      /**
       * 
       * @param str - json string to parse.
       * @param date2obj - date to parse
       * @returns - object
       */
      parse: function (str:string, date2obj:Date) {
    
        var iso8061 = date2obj ? /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/ : false;
    
        return JSON.parse(str, function (key, value) {
          var prefix;
    
          if (typeof value != 'string') {
            return value;
          }
          if (value.length < 8) {
            return value;
          }
    
          prefix = value.substring(0, 8);
    
          if (iso8061 && value.match(iso8061)) {
            return new Date(value);
          }
          if (prefix === 'function') {
            return eval('(' + value + ')');
          }
          if (prefix === '_PxEgEr_') {
            return eval(value.slice(8));
          }
          if (prefix === '_NuFrRa_') {
            return eval(value.slice(8));
          }
    
          return value;
        });
      },
     /**
      * 
      * @param obj - object to clone.
      * @param date2obj  - date to clone.
      * @returns object
      */
      clone: function (obj:object, date2obj:Date) {
        return Json.parse(Json.stringify(obj), date2obj);
      }
    
    
} 

export {Json}
export default Json
    
    