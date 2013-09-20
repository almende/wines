/**
 * Redraw the graph
 */
function drawGraph(data) {
  // create a structured graph from the list with wines
  var nodes = new vis.DataSet();
  var edges = new vis.DataSet();
  var LINE1 = 3;
  var LINE2 = 2;
  var LINE3 = 1;

  // root node
  nodes.add({ id: 'wines', label: 'Wines', group: 'root' });

  // types
  nodes.add({ id: 'red',        label: 'Red',         group: 'red' });
  nodes.add({ id: 'dryWhite',   label: 'Dry White',   group: 'dryWhite' });
  nodes.add({ id: 'sweetWhite', label: 'Sweet White', group: 'sweetWhite' });
  edges.add({ from: 'wines', to: 'red', width: LINE1});
  edges.add({ from: 'wines', to: 'dryWhite', width: LINE1});
  edges.add({ from: 'wines', to: 'sweetWhite', width: LINE1});

  // characters
  nodes.add({ id: 'red.a', label: 'red.a', group: 'red' });
  nodes.add({ id: 'red.b', label: 'red.b', group: 'red' });
  nodes.add({ id: 'red.c', label: 'red.c', group: 'red' });
  edges.add({ from: 'red', to: 'red.a', width: LINE2 });
  edges.add({ from: 'red', to: 'red.b', width: LINE2 });
  edges.add({ from: 'red', to: 'red.c', width: LINE2 });

  nodes.add({ id: 'dryWhite.a', label: 'dryWhite.a', group: 'dryWhite' });
  nodes.add({ id: 'dryWhite.b', label: 'dryWhite.b', group: 'dryWhite' });
  nodes.add({ id: 'dryWhite.c', label: 'dryWhite.c', group: 'dryWhite' });
  edges.add({ from: 'dryWhite', to: 'dryWhite.a', width: LINE2 });
  edges.add({ from: 'dryWhite', to: 'dryWhite.b', width: LINE2 });
  edges.add({ from: 'dryWhite', to: 'dryWhite.c', width: LINE2 });

  nodes.add({ id: 'sweetWhite.a', label: 'sweetWhite.a', group: 'sweetWhite' });
  nodes.add({ id: 'sweetWhite.b', label: 'sweetWhite.b', group: 'sweetWhite' });
  nodes.add({ id: 'sweetWhite.c', label: 'sweetWhite.c', group: 'sweetWhite' });
  edges.add({ from: 'sweetWhite', to: 'sweetWhite.a', width: LINE2 });
  edges.add({ from: 'sweetWhite', to: 'sweetWhite.b', width: LINE2 });
  edges.add({ from: 'sweetWhite', to: 'sweetWhite.c', width: LINE2 });

  /**
   * Get group name from a wine type
   * @param {String} type  wine type
   * @return {String} group
   */
  function getGroup(type) {
    if (type == 'red') return 'red';
    if (type == 'dry white') return 'dryWhite';
    if (type == 'sweet white') return 'sweetWhite';
    return null;
  }

  data.wines.forEach(function (wine) {
    var id = wine.type + '.' + wine.year;
    var group = getGroup(wine.type);
    var from = group + '.' + wine.character;

    nodes.add({
      id: id,
      label: String(wine.year),
      value: wine.quality,
      shape: 'dot',
      // TODO: title
      group: group,
      fontColor: '#4d4d4d'
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
        color: '#4d4d4d',
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
      color: '#4d4d4d'
    },
    stabilize: false
  };
  var graph = new vis.Graph(container, graphData, options);
};
