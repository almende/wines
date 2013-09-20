function Controller($scope) {
  $scope.data = data;
  $scope.view = 'table'; // 'table' or 'graph'

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
   * @param {{type:String, year:Number, quality:Number, character:String, age:Number}} wine
   * @returns {boolean|*|*}
   */
  $scope.wineFilter = function (wine) {
    var filter = $scope.filter;
    var search = filter.search && filter.search.toLowerCase();

    function match (text) {
      return (text && text.toLowerCase().indexOf(search) != -1);
    }

    var matching = (!filter.search
        || match(wine.type)
        || match(data.qualities[wine.quality].description)
        || match(data.types[wine.type][wine.character]));

    return matching
        && (wine.year >= filter.year.from && wine.year <= filter.year.to)
        && (filter.qualities[wine.quality])
        && (filter.ages[wine.age]);
  };

  $scope.drawGraph = function () {
    drawGraph($scope.data);
  };

  /**
   * Count the number of filtered wines
   * @return {Number} count
   */
  $scope.countWines = function () {
    var count = 0;

    $scope.data.wines.forEach(function (wine) {
      if ($scope.wineFilter(wine)) {
        count++;
      }
    });

    return count;
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
