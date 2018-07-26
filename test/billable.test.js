import billable from './../src/billable.js'

import { assert, expect } from 'chai';

describe('get_invoice_list', function() {

	it('returns a promise with the csvs in the invoices directory', async () => {

		const bill = new billable({
			invoice_dir: './test/invoices'
		});

		const response = await bill.get_invoice_list();
		expect(response.invoices.length).to.equal(2);

	})

});

describe('parse_invoice', function() {

	it('should read a valid csv file', async () => {

		const bill = new billable({
			invoice_dir: './test/invoices'
		});

		const response = await bill.parse_invoice('./test/invoices/demo1.csv');
		expect(response.length).to.be.above(0);

	})

});

describe('get_billable', function() {

	it('should read a valid csv file', (done) => {

		const bill = new billable({
			invoice_dir: './test/invoices'
		});

		bill.get_billable().then(() => {
			assert.isAbove(bill.invoice_filenames.length, 0);
			assert.isAbove(bill.invoice_data.length, 0);
		}).finally(done);

	})

});

describe('build_report', function() {

	const bill = new billable({
		invoice_dir: './test/invoices'
	});

	const bad_csv = [
		{
			not_decription: 123
		}
	];

	it('should return an empty report from no params', (done) => {

		bill.get_billable().then(() => {
			const empty_report = bill.build_report();
			assert.isEmpty(empty_report);
		}).finally(done);

	})

	it('should return an empty report if description is not defined', (done) => {

		bill.get_billable().then(() => {
			const bad_report = bill.build_report(bad_csv);
			assert.isEmpty(bad_report);
		}).finally(done);

	})

});