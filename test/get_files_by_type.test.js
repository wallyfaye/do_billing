import { save_file, load_file, get_files_by_type } from './../src/local_file_manager/local_file_manager'

import { assert } from 'chai';
import path from 'path';

describe('get_files_by_type', function() {

	it('should provide an array of csv files from a valid directory', function() {

		get_files_by_type({
			dir: './test/invoices',
			file_type: 'csv'
		}).then(function(response){

			assert.isAbove(response.invoices.length, 0);
			assert.isUndefined(response.error);

		});

	});

	it('should have no invoices and include an error when a bad directory is specified', function() {

		get_files_by_type({
			dir: 'some_bad_dir',
			file_type: 'csv'
		}).then(function(response){

			assert.equal(response.invoices.length, 0);
			assert.isDefined(response.error);

		});

	});

	it('should get any file format passed in', function() {

		get_files_by_type({
			dir: './test/invoices',
			file_type: 'txt'
		}).then(function(response){

			assert.equal(response.invoices.length, 1);

		});

	});

	it('should return empy for file formats not found', function() {

		get_files_by_type({
			dir: './test/invoices',
			file_type: 'png'
		}).then(function(response){

			assert.equal(response.invoices.length, 0);
			assert.isUndefined(response.error);

		});

	});

	it('should default to csv file format if no file type was specified', function() {

		get_files_by_type({
			dir: './test/invoices'
		}).then(function(response){

			assert.isAbove(response.invoices.length, 0);
			assert.isUndefined(response.error);

			var non_csv_found = false;
			response.invoices.forEach(invoice_path => {
				if(path.extname(invoice_path) != '.csv'){
					non_csv_found = true;
				}
			});

			assert.isFalse(non_csv_found);

		});

	});

	it('should default to the root if no path was specified', function() {

		get_files_by_type({
			file_type: 'json'
		}).then(function(response){

			assert.isAbove(response.invoices.length, 0);

		});

	});

});