// ================================================
// 
//	Project: Yuki
//
//	File: database.js
//	Desc: Handles database connection and data
//	manipulation.
// 
//	Modified: 2025/12/29 11:57 AM
//	Created: 2025/12/27 11:52 AM
//	Authors: The Kumor
// 
// ================================================

var mysql = require('mysql2/promise');
const { guildID, database } = require('./config.json');

var yukidb = {
	_Connection: null
};

yukidb.Connect = async function () {
	this._Connection = await mysql.createConnection({
		host: database.host,
		user: database.user,
		password: database.password,
		database: 'yukidb',
		multipleStatements: true,
	});

	console.log(`Connected to database ${database.host} as user ${database.user}`);
}

yukidb.Close = async function () {
	if (!this._Connection) return;
	await this._Connection.end();
}

yukidb.CreateDatabase = async function () {
	this._Connection = await mysql.createConnection({
		host: database.host,
		user: database.user,
		password: database.password,
		multipleStatements: true,
	});

	await this._Connection.query('CREATE DATABASE IF NOT EXISTS yukidb;');
	await this.Close();
}

yukidb.CreateTables = async function () {
	if (!this._Connection) return;

	for (const serverName in database.settings) {
		const server = database.settings[serverName];

		await this._Connection.query(`
			CREATE TABLE IF NOT EXISTS ${server.prefix}_person(
				id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
				userId VARCHAR(24) UNIQUE
			);

			CREATE TABLE IF NOT EXISTS ${server.prefix}_economy(
				id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
				personId INT,
				money INT DEFAULT 0,
				lastDaily INT DEFAULT 0,
				FOREIGN KEY(personId) REFERENCES ${server.prefix}_person(id)
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

	const [rows] = await this._Connection.query(`
		SELECT id FROM ${prefix}_person WHERE userId = ?;
	`, [user.id]);

	return rows.length > 0;
}

yukidb.RegisterUser = async function (serverID, user) {
	if (!this._Connection) return;

	const prefix = this.TablePrefix(serverID);

	const [result] = await this._Connection.query(`
		INSERT IGNORE INTO ${prefix}_person(userId) VALUES(?);
	`, [user.id]);

	const [value] = await this._Connection.query(`
		INSERT IGNORE INTO ${prefix}_economy(personId)
		SELECT id FROM ${prefix}_person WHERE userId = ?
	`, [user.id]);
}

yukidb.Set = async function (serverID, user, tab, key, value) {
	if (!(await this.IsUserRegistered(serverID, user))) {
		await this.RegisterUser(serverID, user);
	}

	const prefix = this.TablePrefix(serverID);

	await this._Connection.query(`
		UPDATE ${prefix}_${tab}
		SET ${key} = ?
		WHERE personId = (SELECT id FROM ${prefix}_person WHERE userId = ?);
	`, [value, user.id]);
}

yukidb.Add = async function (serverID, user, tab, key, value) {
	if (!(await this.IsUserRegistered(serverID, user))) {
		await this.RegisterUser(serverID, user);
	}

	const prefix = this.TablePrefix(serverID);

	await this._Connection.query(`
		UPDATE ${prefix}_${tab}
		SET ${key} = ${key} + ?
		WHERE personId = (SELECT id FROM ${prefix}_person WHERE userId = ?);
	`, [value, user.id]);
}

yukidb.Get = async function (serverID, user, tab, key) {
	if (!(await this.IsUserRegistered(serverID, user))) {
		await this.RegisterUser(serverID, user);
	}

	const prefix = this.TablePrefix(serverID);

	const [rows] = await this._Connection.query(`
		SELECT ${key}
		FROM ${prefix}_${tab}
		WHERE personId = (SELECT id FROM ${prefix}_person WHERE userId = ?)	
	`, [user.id]);

	return rows.length ? rows[0][key] : null;
}

module.exports = yukidb;