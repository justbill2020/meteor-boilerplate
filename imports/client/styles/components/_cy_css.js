export default cy_css = [
  {
    selector: 'node',
    style: {
      'content': 'data(name)',
      'text-valign': 'center',
      'color': 'white',
      'text-outline-width': 2,
      'text-outline-color': '#888',
      'background-color': '#888'
    }
  },{
    selector: 'edge',
    style: {
      'curve-style': 'bezier',
      'target-arrow-shape': 'triangle'
    }
  },{
    selector: ':selected',
    style: {
      'background-color': 'black',
      'line-color': 'black',
      'target-arrow-color': 'black',
      'source-arrow-color': 'black',
      'text-outline-color': 'black'
    }
  },{
    selector: '.edgehandles-hover',
    style: {
      'background-color': 'blue'
    }
  },{
    selector: '.edgehandles-source',
    style: {
      'border-width': 2,
      'border-color': 'blue'
    }
  },{
    selector: '.edgehandles-target',
    style: {
      'border-width': 2,
      'border-color': 'blue'
    }
  },{
    selector: '.edgehandles-preview, .edgehandles-ghost-edge',
      style: {
        'line-color': 'blue',
        'target-arrow-color': 'blue',
        'source-arrow-color': 'blue',
        'target-arrow-shape': 'triangle',
        'target-arrow-fill': 'filled'
      }
  },{
    selector: ':locked',
      style:{
      'border-width': 2,
      'border-color': 'red'
      }
  }
]