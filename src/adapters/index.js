/**
 * Adapters 
 */

'use strict';

/* Requires ------------------------------------------------------------------*/

const Store = require('../Store');

// If running in the browser, do not load net adapters
const is_browser = (require('os').platform() === 'browser');

const ipc = (is_browser)?null:require('./ipc');
const tcp = (is_browser)?null:require('./tcp');
const udp = (is_browser)?null:require('./udp');

/* Methods -------------------------------------------------------------------*/

class Adapters extends Store {

	/**
	 * Adapters constructor
	 */
	constructor() {
		super('adapter', [
			'listen',
			'createSocket'
		]);

		this.list.ipc = ipc;
		this.list.tcp = tcp;
		this.list.udp = udp;
	}
}

/* Exports -------------------------------------------------------------------*/

module.exports = new Adapters;