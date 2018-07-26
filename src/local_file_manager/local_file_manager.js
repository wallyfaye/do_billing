import fs from 'fs';
import path from 'path';

/**
 * A module to get a list of files from a directory
 * @module local_file_manager
 */

/**
 * Saves files to a local data folder
 */

const local_folder = './local_data/';

async function make_local_folder (local_folder = './local_data') {

	try {
		fs.mkdirSync(local_folder);
		return true;
	} catch (err) {
		return (err.code == 'EEXIST') ? true : err.message;
	}

}

/**
 * A module to get a list of files from a directory
 * @module get_files_by_type
 * @param {object}  params - The default values for bills.
 * @param {string}  params.dir - A directory
 * @param {string}  params.file_type - File types to get
 */

/**
 * Scans a directory for a specific file type
 */

export async function get_files_by_type (params) {

	const { dir = './', file_type = 'csv' } = params;

	try{

		return await {
			invoices: fs.readdirSync(dir).filter(file => path.extname(file) == '.' + file_type)
		};

	} catch (err) {

		return {
			invoices: [],
			error: err
		};
		
	}

}

export async function load_file (filename = null) {

	const folder_created = await make_local_folder();

	if(folder_created){

		try{

			return {
				file_data: await fs.readFileSync(local_folder + filename, 'utf8')
			};

		} catch (err) {

			return {
				file_data: '',
				error: err
			};
			
		}

	} else {
		return {
			file_data: '',
			error: folder_created
		}
	}

}

export async function save_file (params) {

	const { data = '', filename = 'file.txt' } = params;

	const folder_created = await make_local_folder();

	if(folder_created){

		try{

			await fs.writeFileSync(local_folder + filename, data);

			return {
				file_saved: true,
			}

		} catch (err) {

			return {
				file_saved: false,
				error: err
			};
			
		}


	} else {

		return {
			file_saved: false,
			error: folder_created
		};

	}

}