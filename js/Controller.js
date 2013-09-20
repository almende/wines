function Controller($scope) {
  $scope.data = data;
  $scope.view = 'graph'; // 'table' or 'graph'

  // read oldest/newest year from data
  var year = {
    from: null,
    to: null
  };
  $scope.data.wines.forEach(function (wine) {
    if (year.from === null || wine.year < year.from) {
      year.from = wine.year;
    }
    if (year.to === null || wine.year > year.to) {
      year.to = wine.year;
    }
  });

  // put all wines in a dataset
  $scope.wines = new vis.DataSet($scope.data.wines);

  $scope.filter = {
    year: year,
    qualities: {
      1: true,
      2: true,
      3: true
    },
    ages: {
      1: true,
      2: true,
      3: true,
      4: true
    }
  };

  /**
   * Filter a wine by the search criteria
   * @param {{color:String, year:Number, quality:Number, character:String, age:Number}} wine
   * @returns {boolean|*|*}
   */
  $scope.wineFilter = function (wine) {
    var filter = $scope.filter;
    var search = filter.search && filter.search.toLowerCase();

    function match (text) {
      return (text && text.toLowerCase().indexOf(search) != -1);
    }

    var matching = (!filter.search
        || match(wine.color)
        || match(data.qualities[wine.quality].description)
        || match(data.colors[wine.color][wine.character]));

    return matching
        && (wine.year >= filter.year.from && wine.year <= filter.year.to)
        && (filter.qualities[wine.quality])
        && (filter.ages[wine.age]);
  };

  /**
   * Filter a wine by the search criteria
   */
  $scope.filterWines = function () {
    var filtered = [];

    for (var id in allNodes) {
      if (allNodes.hasOwnProperty(id)) {
        var node = allNodes[id];
        if ($scope.wineFilter(node.data)) {
          filtered.push(node);

          // add the wine to the dataset
          if (!filteredNodes[id]) {
            filteredNodes[id] = node;
            nodes.add(node);
          }
        }
        else {
          // remove the wine from the dataset
          if (filteredNodes[id]) {
            filteredNodes[id] = null;
            nodes.remove(id);
          }
        }
      }
    }

    return filtered;
  };

  /**
   * Count the number of filtered wines
   * @return {Number} count
   */
  $scope.countWines = function () {
    return $scope.filterWines().length;
  };

  /**
   * Update the year in the filter from the ui element
   * @param event
   * @param ui
   */
  var updateYearFilter = function (event, ui) {
    $scope.filter.year.from = ui.values[0];
    $scope.filter.year.to = ui.values[1];
    $scope.$apply();
  };

  // apply jquery
  $('#year').slider({
    range: true,
    min: $scope.filter.year.from,
    max: $scope.filter.year.to,
    step: 1,
    values: [
      $scope.filter.year.from,
      $scope.filter.year.to
    ],
    change: updateYearFilter,
    slide: updateYearFilter
  });
  $('#quality').buttonset();
  $('#age').buttonset();
  $('#view').buttonset();
  // TODO: dynamically recompile changed html by jquery
}
