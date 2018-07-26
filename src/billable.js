import fs from 'fs';
import parse from 'csv-parse';
import csv_reporter from './csv_reporter/csv_reporter'
import dig_o_api from './dig_o_api/dig_o_api'
import { save_file, load_file, get_files_by_type } from './local_file_manager/local_file_manager'

/**
 * A module parsing bills
 * @module billable
 */

/**
 * Coallate a collection of bills
 */

export default class billable {

	/** create a billable instance.
	 * @param {object}  params - The default values for bills.
	 * @param {string}  params.invoice_dir - A directory of csv files.
	 */

	constructor(params){

		this.invoice_dir = params.invoice_dir;
		this.DigO_TOKEN = (typeof params.DigO_TOKEN !== 'undefined') ? params.DigO_TOKEN : null;
		this.use_do_cache = (typeof params.use_do_cache !== 'undefined') ? params.use_do_cache : false;
		this.invoice_filenames = [];
		this.invoice_data = [];

	}

	/**
	 * Get billable information
	 * @return {Promise}
	 */
	async get_billable() {

		return new Promise( (resolve) => {

			this.get_invoice_list().then(async response => {

				this.invoice_filenames = response.invoices;

				const parsed_promises = this.invoice_filenames.map(async file_name => {

					return await this.parse_invoice(this.invoice_dir + '/' + file_name);

				});

				for (const parsed_promise of parsed_promises){

					this.invoice_data = this.invoice_data.concat(await parsed_promise);

				}

				resolve();

			});

		});

	}

	/**
	 * @return {Promise} The list of csv files in the invoice directory
	 */
	get_invoice_list() {
		
		return get_files_by_type({
			dir: this.invoice_dir,
			file_type: 'csv'
		})

	}

	/**
	 * @param  {string} file_path - the path to the csv file
	 * @return {Promise} The csv data as an array
	 */
	parse_invoice(file_path) {

		return new Promise((resolve, reject) => {

			const parser = parse({
				delimiter: ',',
				columns: true
			}, (err, data) => {
				resolve(data);
			});

			fs.createReadStream(file_path).pipe(parser);

		});

	}

	/**
	 * @param  {array}
	 * @return {object}
	 */
	build_report(csv_data = []) {

		var report = new csv_reporter({
			id: 'description',
			start: 'start',
			end: 'end',
			value: 'USD',
			data: csv_data
		});
		
		return report.build();

	}

	async get_droplet_data(){

		const DigO_TOKEN = this.DigO_TOKEN;
		const use_do_cache = this.use_do_cache;

		return new Promise(async (resolve, reject) => {

			if(use_do_cache){
				
				const do_data = await load_file('droplets.json');
				resolve(JSON.parse(do_data.file_data));

			} else {

				const dig_o = new dig_o_api({
					DigO_TOKEN: DigO_TOKEN
				});

				const droplets = await dig_o.get_droplets();

				const file_saved = await save_file({
					data: droplets,
					filename: 'droplets.json'
				});

				if(file_saved.file_saved){

					const do_data = await load_file('droplets.json');
					resolve(JSON.parse(do_data.file_data));

				} else {
					resolve(false);
				}

			}
			

		});

	}

}