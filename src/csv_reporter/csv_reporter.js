import currency from 'currency.js'

/**
 * A module that parses invoice data into a report
 * @module csv_reporter
 */

/**
 * Create a report from invoice data
 */

export default class csv_reporter {

	/** create a csv_reporter instance.
	 * @param {object}  params - The default values for the csv_reporter.
	 * @param {string}  params.id - The key to be used for collating
	 * @param {string}  params.start - The key denoting the start of the period
	 * @param {string}  params.end - The key denoting the start of the period
	 * @param {string}  params.value - The key denoting the value of the period
	 * @param {array}  params.data - The invoice data
	 */
	constructor (params = {}) {
		
		this.id = (typeof params.id !== 'undefined') ? params.id : 'description';
		this.start = (typeof params.start !== 'undefined') ? params.start : 'start';
		this.end = (typeof params.end !== 'undefined') ? params.end : 'end';
		this.value = (typeof params.value !== 'undefined') ? params.value : 'USD';
		this.data = (typeof params.data !== 'undefined') ? params.data : [];
		this.result = {};

	}

	/**
	 * create a default report item
	 * @param  {String} item_id the description of the report item
	 * @return {boolean} indicates if the item was generated or not
	 */
	generate_item (item_id = '') {
		
		if(item_id != ''){
			this.result[item_id] = {};
			this.result[item_id][this.start] = null;
			this.result[item_id][this.end] = null;
			this.result[item_id][this.value] = 0;
		}
		return item_id != '';

	}

	/**
	 * add two dollar values
	 * @param  {number} current_value - the current dollar value
	 * @param  {number} new_amount - the amount to add to the current value
	 * @return {number} the calculated sum
	 */
	generate_value (current_value, new_amount) {

		new_amount = currency(new_amount).value;
		current_value = currency(current_value).value;
		return currency(new_amount).add(current_value).value;

	}

	/**
	 * get the older of two dates
	 * @param  {Date} current_value - the existing date
	 * @param  {Date} new_value - the new date
	 * @return {Date} the older of two date
	 */
	generate_start (current_value = null, new_value) {

		if(current_value == null){
			return new Date(new_value);
		} else if (new Date(new_value) < current_value)  {
			return new Date(new_value);
		} else  {
			return current_value;
		}

	}

	/**
	 * get the newer of two dates
	 * @param  {Date} current_value - the existing date
	 * @param  {Date} new_value - the new date
	 * @return {Date} the newer of two date
	 */
	generate_end (current_value = null, new_value) {

		if(current_value == null){
			return new Date(new_value);
		} else if (new Date(new_value) > current_value)  {
			return new Date(new_value);
		} else  {
			return current_value;
		}

	}

	build () {

		this.data.forEach((item) => {

			const item_generated = (typeof this.result[item[this.id]] === 'undefined') ? this.generate_item(item[this.id]) : true;

			if(item_generated){

				this.result[item[this.id]][this.value] = this.generate_value(this.result[item[this.id]][this.value], item[this.value]);
				this.result[item[this.id]][this.start] = this.generate_start(this.result[item[this.id]][this.start], item[this.start]);
				this.result[item[this.id]][this.end] = this.generate_end(this.result[item[this.id]][this.end], item[this.end]);

			}

		});
		
		return this.result;
		
	}

}