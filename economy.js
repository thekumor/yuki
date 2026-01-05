// ================================================
// 
//	Project: Yuki
//
//	File: economy.js
//	Desc: Handles economy system functions.
// 
//	Modified: 2026/01/05 5:22 PM
//	Created: 2026/01/05 5:22 PM
//	Authors: The Kumor
// 
// ================================================

const yukidb = require('./database.js');
const economy = {};

economy.GetBalance = async function (server, user) {
	return yukidb.Get(server.id, user, 'economy', 'money');
}

economy.SetBalance = async function (server, user, amount) {
	return yukidb.Set(server.id, user, 'economy', 'money', amount);
}

economy.AddBalance = async function (server, user, amount) {
	return yukidb.Add(server.id, user, 'economy', 'money', amount);
}

economy.SubstractBalance = async function (server, user, amount) {
	return economy.AddBalance(server, user, -amount);
}

economy.GetLastDaily = async function (server, user) {
	return yukidb.Get(server.id, user, 'economy', 'last_daily');
}

economy.GiveDaily = async function (server, user) {

}

export { economy };