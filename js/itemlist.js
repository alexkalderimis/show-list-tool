define(['react', './listitem'], function (React, ListItem) {
  'use strict';

  var ItemList = React.createClass({
    displayName: 'ItemList',
    render: function () {
      var items = this.props.items.slice(this.props.offset, this.props.offset + this.props.size).map(function (item) {
        return ListItem({
          className: 'list-item col-xs-4 col-sm-3 col-md-2',
          key: item[0],
          view: this.props.query.select,
          item: item
        });
      }.bind(this));
      return React.DOM.div(
        {className: 'container-fluid item-list'},
        React.DOM.div({className: 'row'}, items)
      );
    },
    componentDidMount: function () {
      this._equaliseHeights();
    },
    componentDidUpdate: function () {
      this._equaliseHeights();
    },
    _equaliseHeights: function () {
      // Make sure all items have the same height. For appearances, mostly.
      var i, l, h, lastHeight, itemNode, node = this.getDOMNode();
      var itemNodes = node.querySelectorAll('.thumbnail');
      var maxHeight = 0;
      var different = false;
      for (i = 0, l = itemNodes.length; i < l; i++) {
        itemNode = itemNodes[i];
        h = itemNode.getBoundingClientRect().height;
        maxHeight = Math.max(maxHeight, h);
        if (lastHeight) {
          different = (different || (h !== lastHeight));
        }
        lastHeight = h;
      }
      if (different) { // only normalise if different.
        console.log('normalising heights to ' + maxHeight + 'px');
        for (i = 0, l = itemNodes.length; i < l; i++) {
          itemNode = itemNodes[i];
          itemNode.style.height = maxHeight + "px";
        }
      }

    }
  });

  return ItemList;
});