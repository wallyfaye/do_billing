(async () => {

	const billable = await import('./src/billable.js');

	(async (bill) => {

		await bill.get_billable();
		let report = bill.build_report(bill.invoice_data);
		let droplets = await bill.get_droplet_data();

		console.log(report);
		console.log(droplets.droplets.length);

	})(new billable.default({
		invoice_dir: './invoices',
		DigO_TOKEN: process.env.DigO_TOKEN,
		use_do_cache: true
	}));

})();