import csv_reporter from './../src/csv_reporter/csv_reporter'

import { assert } from 'chai';
import path from 'path';

describe('generate_item', function() {

	it('should not generate an item if the item_id is not defined', function(){
		let rep = new csv_reporter();
		assert.isFalse(rep.generate_item())
	});

	it('should generate an item if the item_id is defined', function(){
		let rep = new csv_reporter();
		let item = rep.generate_item('demo');
		assert.isTrue(item);
	});

});

describe('generate_value', function() {

	it('should add 0.1 to 0.2 properly', function(){
		let rep = new csv_reporter();
		let added_value = rep.generate_value('0.1', '0.2');
		assert.equal(added_value, '0.3');
	});

});

describe('generate_start', function() {

	it('should return the new date if there is no current date specified', function(){
		let undefined_variable;
		let rep = new csv_reporter();
		let date_string = '1/1/18';
		let start_date = rep.generate_start(undefined_variable, date_string);
		assert.equal(start_date.toTimeString(), new Date(date_string).toTimeString());
	});

	it('should return the new date if it is earlier than the current date', function(){
		let rep = new csv_reporter();
		let new_earlier_date = '1/1/17';
		let current_later_date = '1/1/18';
		let start_date = rep.generate_start(new Date(current_later_date), new_earlier_date);
		assert.equal(start_date.toTimeString(), new Date(new_earlier_date).toTimeString());
	});

	it('should return the current date if the new date it is later than the current date', function(){
		let rep = new csv_reporter();
		let new_later_date = '1/1/18';
		let current_earlier_date = '1/1/17';
		let start_date = rep.generate_start(new Date(current_earlier_date), new_later_date);
		assert.equal(start_date.toTimeString(), new Date(current_earlier_date).toTimeString());
	});

});

describe('generate_end', function() {

	it('should return the new date if there is no current date specified', function(){
		let undefined_variable;
		let rep = new csv_reporter();
		let date_string = '1/1/18';
		let end_date = rep.generate_end(undefined_variable, date_string);
		assert.equal(end_date.toTimeString(), new Date(date_string).toTimeString());
	});

	it('should return the new date if it is later than the current date', function(){
		let rep = new csv_reporter();
		let new_later_date = '1/1/18';
		let current_earlier_date = '1/1/17';
		let end_date = rep.generate_end(new Date(current_earlier_date), new_later_date);
		assert.equal(end_date.toTimeString(), new Date(new_later_date).toTimeString());
	});

	it('should return the current date if the new date it is earlier than the current date', function(){
		let rep = new csv_reporter();
		let new_earlier_date = '1/1/17';
		let current_later_date = '1/1/18';
		let end_date = rep.generate_end(new Date(current_later_date), new_earlier_date);
		assert.equal(end_date.toTimeString(), new Date(current_later_date).toTimeString());
	});

});

describe('build', function() {

	it('should not build results if no items are specified', function(){
		let rep = new csv_reporter();
		assert.isEmpty(rep.build());
	});

	it('should return a combine items into one report', function(){
		let report_params = {
			data: [
				{
					description: 'test1',
					start: '1/1/17',
					end: '1/1/18',
					USD: '1'
				},
				{
					description: 'test1',
					start: '1/1/16',
					end: '1/1/17',
					USD: '1'
				}
			]
		};
		let rep = new csv_reporter(report_params);
		assert.isNotEmpty(rep.build());
	});

});

