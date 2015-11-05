/**
 * Services package
 * @exports {component(services)}
 */

'use strict'

/* Requires ------------------------------------------------------------------*/

var Service = require('./service.package');

/* Methods -------------------------------------------------------------------*/

/**
 * Creates a service
 * @method create
 * @param {string} name The name for the service
 * @param {object} options The options for the service
 * @return {Service} The created service
 */
function create(name, options) {
	name || utils.crypto.generate();
	options = options || Object.create(null);

	var cl = K.getComponent('console');
	var utils = K.getComponent('utils');
	var connection = K.getComponent('connection');
	var circles = K.getComponent('circles');
	var adapter = connection.adapters[options.adapter || 'ipc'];
	var cl = K.getComponent('console');

	var f;
	var cList;

	if (options.circles === undefined) options.circles = [];
	if (options.poolSize === undefined) options.poolSize = adapter.poolSize;
	options.label = name;

	f = new Service(options);
	cList = options.circles.concat(['global']);
	cList.forEach(function(c) {
		circles.find(c).add(f);
	});
	return f;
}

/* Exports -------------------------------------------------------------------*/

module.exports = {
	pkgName: 'services',
	methods: {
		create: create
	}
};