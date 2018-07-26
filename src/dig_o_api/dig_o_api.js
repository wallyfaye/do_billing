import https from 'https';

export default class dig_o_api {

	constructor(params = {}){

		this.DigO_TOKEN = (typeof params.DigO_TOKEN !== 'undefined') ? params.DigO_TOKEN : null;

	}

	async get_droplets(){

		const DigO_TOKEN = this.DigO_TOKEN;

		return new Promise((resolve, reject) => {

			if(DigO_TOKEN == null){

				reject('invalid DigO_TOKEN');

			} else {

				let chunk = '';

				const options = {
					hostname: 'api.digitalocean.com',
					port: 443,
					path: '/v2/droplets?page=1&per_page=200',
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': 'Bearer ' + DigO_TOKEN
					}
				};

				const req = https.request(options, (res) => {
					res.setEncoding('utf8');
					res.on('data', (d) => {
						chunk += d;
					});
					res.on('end', () => {
						resolve(chunk);
					})
				});

				req.on('error', (e) => {
					reject(e.message);
				});

				req.end();

			}

		});

	}


}