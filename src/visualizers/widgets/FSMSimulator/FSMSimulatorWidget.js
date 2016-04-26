/*globals define, WebGMEGlobal, $, d3*/
/*jshint browser: true*/

/**
 * Generated by VisualizerGenerator 0.1.0 from webgme on Mon Apr 25 2016 15:09:59 GMT-0500 (Central Daylight Time).
 */

define(['jquery', 'd3', 'css!./styles/FSMSimulatorWidget.css'], function () {
    'use strict';

    var FSMSimulatorWidget,
        SIM_CLASS = 'EMBEDDED_FSM_SIMULATOR',
        WIDGET_CLASS = 'f-s-m-simulator';

    FSMSimulatorWidget = function (logger, container) {
        this._logger = logger.fork('Widget');

        this._el = container;

        this._simEl = null;

        this.nodes = {};
        this._initialize();

        this._logger.debug('ctor finished');
    };

    FSMSimulatorWidget.prototype._initialize = function () {
        var width = this._el.width(),
            height = this._el.height(),
            self = this;

        this._nodes = [];
        this._links = [];
        // set widget class
        this._el.addClass(WIDGET_CLASS);
    };

    FSMSimulatorWidget.prototype.buildSimulator = function (graphData) {
        console.log(graphData);
        var width = this._el.width(),
            height = this._el.height(),
            self = this;

        var links = [],
            id;

        if (this._simEl === null) {
            this._simEl = $( '<iframe id="' + SIM_CLASS + '" src="' + graphData.simulatorUrl +
                '" width="0" height="0"></iframe>' );
            this._el.append(this._simEl);
        }

        for (id in graphData.nodes) {
            if (graphData.nodes[id].isConnection === true) {
                this._links.push({
                    source: graphData.nodes[graphData.nodes[id].connects.src],
                    target: graphData.nodes[graphData.nodes[id].connects.dst]
                });
            } else {
                this._nodes.push(graphData.nodes[id]);
            }
        }

        this._layout = d3.layout.force()
            .nodes(this._nodes)
            .links(this._links)
            .charge(0)
            .linkDistance(120)
            .size([width, height])
            .on("tick", tick);

        this._svg = d3.select(this._el[0]).append("svg")
            .attr("width", width)
            .attr("height", height);

        this._node = this._svg.selectAll(".node");
        this._link = this._svg.selectAll(".link");

        function tick() {
            self._node.attr("cx", function(d) { return d.x; })
                .attr("cy", function(d) { return d.y; });

            self._link.attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });
        }

        //this._el.append(this._layout);
        this._link = this._link.data(this._layout.links(), function(d) { return d.source.id + "-" + d.target.id; });
        this._link.enter().insert("line", ".node").attr("class", "link");
        this._link.exit().remove();

        this._node = this._node.data(this._layout.nodes(), function(d) { return d.id;});
        this._node.enter().append("circle").attr("class", function(d) { return "node " + d.id; }).attr("r", 8);
        this._node.exit().remove();

        this._layout.start();
    };

    FSMSimulatorWidget.prototype.onWidgetContainerResize = function (width, height) {
        console.log('Widget is resizing...');
    };

    /* * * * * * * * Visualizer event handlers * * * * * * * */

    FSMSimulatorWidget.prototype.onNodeClick = function (id) {
        // This currently changes the active node to the given id and
        // this is overridden in the controller.
    };

    FSMSimulatorWidget.prototype.onBackgroundDblClick = function () {
        this._el.append('<div>Background was double-clicked!!</div>');
    };

    /* * * * * * * * Visualizer life cycle callbacks * * * * * * * */
    FSMSimulatorWidget.prototype.destroy = function () {
    };

    FSMSimulatorWidget.prototype.onActivate = function () {
        console.log('FSMSimulatorWidget has been activated');
    };

    FSMSimulatorWidget.prototype.onDeactivate = function () {
        console.log('FSMSimulatorWidget has been deactivated');
    };

    return FSMSimulatorWidget;
});