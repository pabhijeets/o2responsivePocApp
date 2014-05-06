function groupBy(list, groupByKey){
  if (!list || !groupByKey || list.length == 0) {
        return list;
      };

      //invalid group by key
      if (!list[0][groupByKey]) return list;

      var grouped = {};

      for(var i=0; i< list.length; i++) {
          if(!grouped[list[i][groupByKey]]) {
              grouped[list[i][groupByKey]] = [];
          }
          grouped[list[i][groupByKey]].push(list[i])
      }
      return grouped;
}