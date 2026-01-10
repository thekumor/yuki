// ================================================
// 
//	Project: Yuki
//
//	File: database.js
//	Desc: Handles database connection and data
//	manipulation.
// 
//	Modified: 2026/01/10 11:49 AM
//	Created: 2025/12/27 11:52 AM
//	Authors: The Kumor
// 
// ================================================

var mysql = require('mysql2/promise');
const { guildID, database } = require('./config.json');

var yukidb = {
	_Pool: null
};

yukidb.Connect = function () {
	this._Pool = mysql.createPool({
		host: database.host,
		user: database.user,
		password: database.password,
		database: 'yukidb',
		multipleStatements: true,
		family: 4,
		waitForConnections: true,
		connectionLimit: 10,
		queueLimit: 0
	});

	console.log(`Connected to database ${database.host} as user ${database.user}`);
}

yukidb.Close = async function () {
	if (!this._Pool) return;
	await this._Pool.end();
}

yukidb.CreateDatabase = async function () {
	this._Pool = mysql.createPool({
		host: database.host,
		user: database.user,
		password: database.password,
		multipleStatements: true,
		family: 4,
		waitForConnections: true,
		connectionLimit: 10,
		queueLimit: 0
	});

	await this._Pool.query('CREATE DATABASE IF NOT EXISTS yukidb;');
	await this.Close();
}

yukidb.CreateTables = async function () {
	if (!this._Pool) return;

	for (const serverName in database.settings) {
		const server = database.settings[serverName];

		await this._Pool.query(`
			CREATE TABLE IF NOT EXISTS ${server.prefix}_person(
				id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
				user_id VARCHAR(24) UNIQUE
			);

			CREATE TABLE IF NOT EXISTS ${server.prefix}_economy(
				id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
				person_id INT,
				money INT DEFAULT 0,
				last_daily INT DEFAULT 0,
				FOREIGN KEY(person_id) REFERENCES ${server.prefix}_person(id)
			);

			CREATE TABLE IF NOT EXISTS ${server.prefix}_stats(
				id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
				person_id INT,
				messages_sent INT DEFAULT 0,
				reactions_added INT DEFAULT 0,
				FOREIGN KEY(person_id) REFERENCES ${server.prefix}_person(id)
			);

			CREATE TABLE IF NOT EXISTS ${server.prefix}_inventory(
				id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
				person_id INT,
				items TEXT DEFAULT '',
				size INT DEFAULT 10,
				FOREIGN KEY(person_id) REFERENCES ${server.prefix}_person(id)
			);

			CREATE TABLE IF NOT EXISTS ${server.prefix}_rpg(
				id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
				person_id INT,
				level INT DEFAULT 1,
				experience INT DEFAULT 0,
				health INT DEFAULT 100,
				attack INT DEFAULT 1,
				defense INT DEFAULT 1,
				magic INT DEFAULT 1,
				luck INT DEFAULT 1,
				FOREIGN KEY(person_id) REFERENCES ${server.prefix}_person(id)
			);
		`);
	}
}

yukidb.TablePrefix = function (serverID) {
	const serverName = guildID[serverID];
	return database.settings[serverName].prefix;
}

yukidb.IsUserRegistered = async function (serverID, user) {
	const prefix = this.TablePrefix(serverID);

	const [rows] = await this._Pool.query(`
		SELECT id FROM ${prefix}_person WHERE user_id = ?;
	`, [user.id]);

	return rows.length > 0;
}

yukidb.RegisterUser = async function (serverID, user) {
	if (!this._Pool) return false;

	const prefix = this.TablePrefix(serverID);

	const [result0] = await this._Pool.query(`
		INSERT IGNORE INTO ${prefix}_person(user_id) VALUES(?);
	`, [user.id]);

	const [result1] = await this._Pool.query(`
		INSERT IGNORE INTO ${prefix}_economy(person_id)
		SELECT id FROM ${prefix}_person WHERE user_id = ?
	`, [user.id]);

	const [result2] = await this._Pool.query(`
		INSERT IGNORE INTO ${prefix}_stats(person_id)
		SELECT id FROM ${prefix}_person WHERE user_id = ?
	`, [user.id]);

	const [result3] = await this._Pool.query(`
		INSERT IGNORE INTO ${prefix}_inventory(person_id)
		SELECT id FROM ${prefix}_person WHERE user_id = ?
	`, [user.id]);

	const [result4] = await this._Pool.query(`
		INSERT IGNORE INTO ${prefix}_rpg(person_id)
		SELECT id FROM ${prefix}_person WHERE user_id = ?
	`, [user.id]);

	return true;
}

yukidb.Set = async function (serverID, user, tab, key, value) {
	if (!(await this.IsUserRegistered(serverID, user))) {
		await this.RegisterUser(serverID, user);
	}

	const prefix = this.TablePrefix(serverID);

	await this._Pool.query(`
		UPDATE ${prefix}_${tab}
		SET ${key} = ?
		WHERE person_id = (SELECT id FROM ${prefix}_person WHERE user_id = ?);
	`, [value, user.id]);
}

yukidb.Add = async function (serverID, user, tab, key, value) {
	if (!(await this.IsUserRegistered(serverID, user))) {
		await this.RegisterUser(serverID, user);
	}

	const prefix = this.TablePrefix(serverID);

	await this._Pool.query(`
		UPDATE ${prefix}_${tab}
		SET ${key} = ${key} + ?
		WHERE person_id = (SELECT id FROM ${prefix}_person WHERE user_id = ?);
	`, [value, user.id]);
}

yukidb.Get = async function (serverID, user, tab, key) {
	if (!(await this.IsUserRegistered(serverID, user))) {
		await this.RegisterUser(serverID, user);
	}

	const prefix = this.TablePrefix(serverID);

	const [rows] = await this._Pool.query(`
		SELECT ${key}
		FROM ${prefix}_${tab}
		WHERE person_id = (SELECT id FROM ${prefix}_person WHERE user_id = ?)	
	`, [user.id]);

	return rows.length ? rows[0][key] : null;
}

module.exports = yukidb;