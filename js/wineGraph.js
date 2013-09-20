/**
 * Redraw the graph
 */
function drawGraph(data) {
  // create a structured graph from the list with wines
  var nodes = new vis.DataSet();
  var edges = new vis.DataSet();
  var LINE1 = 5;
  var LINE2 = 3;
  var LINE3 = 1;

  // root node
  nodes.add({ id: 'wines', label: 'Wines', group: 'root' });

  // types
  nodes.add({ id: 'red',        label: 'Red',         group: 'red', title: 'Type: red' });
  nodes.add({ id: 'dryWhite',   label: 'Dry White',   group: 'dryWhite', title: 'Type: dry white'  });
  nodes.add({ id: 'sweetWhite', label: 'Sweet White', group: 'sweetWhite', title: 'Type: sweet white'  });
  edges.add({ from: 'wines', to: 'red', width: LINE1});
  edges.add({ from: 'wines', to: 'dryWhite', width: LINE1});
  edges.add({ from: 'wines', to: 'sweetWhite', width: LINE1});

  // characters
  nodes.add({ id: 'red.a', label: 'Balanced', group: 'red', title: 'Character: ' + data.types['red']['a'] });
  nodes.add({ id: 'red.b', label: 'Robust', group: 'red', title: 'Character: ' + data.types['red']['b'] });
  nodes.add({ id: 'red.c', label: 'Fine', group: 'red', title: 'Character: ' + data.types['red']['c'] });
  edges.add({ from: 'red', to: 'red.a', width: LINE2 });
  edges.add({ from: 'red', to: 'red.b', width: LINE2 });
  edges.add({ from: 'red', to: 'red.c', width: LINE2 });

  nodes.add({ id: 'dryWhite.a', label: 'Balanced', group: 'dryWhite', title: 'Character: ' + data.types['dry white']['a'] });
  nodes.add({ id: 'dryWhite.b', label: 'Robust', group: 'dryWhite', title: 'Character: ' + data.types['dry white']['b'] });
  nodes.add({ id: 'dryWhite.c', label: 'Fine', group: 'dryWhite', title: 'Character: ' + data.types['dry white']['c'] });
  edges.add({ from: 'dryWhite', to: 'dryWhite.a', width: LINE2 });
  edges.add({ from: 'dryWhite', to: 'dryWhite.b', width: LINE2 });
  edges.add({ from: 'dryWhite', to: 'dryWhite.c', width: LINE2 });

  nodes.add({ id: 'sweetWhite.a', label: 'Balanced', group: 'sweetWhite', title: 'Character: ' + data.types['sweet white']['a'] });
  nodes.add({ id: 'sweetWhite.b', label: 'Robust', group: 'sweetWhite', title: 'Character: ' + data.types['sweet white']['b'] });
  nodes.add({ id: 'sweetWhite.c', label: 'Fine', group: 'sweetWhite', title: 'Character: ' + data.types['sweet white']['c'] });
  edges.add({ from: 'sweetWhite', to: 'sweetWhite.a', width: LINE2 });
  edges.add({ from: 'sweetWhite', to: 'sweetWhite.b', width: LINE2 });
  edges.add({ from: 'sweetWhite', to: 'sweetWhite.c', width: LINE2 });

  /**
   * Get group name from a wine color
   * @param {String} color  wine color
   * @return {String} group
   */
  function getGroup(color) {
    if (color == 'red') return 'red';
    if (color == 'dry white') return 'dryWhite';
    if (color == 'sweet white') return 'sweetWhite';
    return null;
  }

  /**
   * Get group name from a wine color
   * @param {String} color  wine color
   * @return {String} group
   */
  function getColor(color) {
    if (color == 'red') return '#cc0000';
    if (color == 'dry white') return '#fff798';
    if (color == 'sweet white') return '#fdb928';
    return null;
  }

  data.wines.forEach(function (wine) {
    var id = wine.type + '.' + wine.year;
    var group = getGroup(wine.type);
    var from = group + '.' + wine.character;
    var title = '<div class="tooltip">' +
        '<table>' +
        '<tr><th>Type</th><td>' + wine.type + '</td></tr>' +
        '<tr><th>Year</th><td>' + wine.year + '</td></tr>' +
        '<tr><th>Quality</th><td>' + data.qualities[wine.quality].description + '</td></tr>' +
        '<tr><th>Character</th><td>' + data.types[wine.type][wine.character] + '</td></tr>' +
        '<tr><th>Age</th><td>' + data.ages[wine.age].description + '</td></tr>' +
        '</table>' +
        '</div>';

    nodes.add({
      id: id,
      label: String(wine.year),
      title: title,
      value: wine.quality,
      shape: 'image',
      image: 'img/glass_' + group + '.svg',
      group: group,
      fontColor: getColor(wine.type)
    });
    edges.add({ from: from, to: id, width: LINE3 });
  });

  var container = document.getElementById('graph');
  var graphData = {
    nodes: nodes,
    edges: edges
  };
  var options = {
    groups: {
      root: {
        color: '#5d722d',
        fontColor: 'white'
      },
      red: {
        color: '#cc0000',
        fontColor: 'white'
      },
      dryWhite: {
        color: '#fff798',
        fontColor: '#4d4d4d'
      },
      sweetWhite: {
        color: '#fdb928',
        fontColor: '#4d4d4d'
      }
    },
    edges: {
      color: '#5d722d'
    },
    stabilize: false
  };
  var graph = new vis.Graph(container, graphData, options);
}
