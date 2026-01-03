// ================================================
// 
//	Project: Yuki
//
//	File: items.js
//	Desc: Defines all items in the RPG.
// 
//	Modified: 2026/01/02 11:28 PM
//	Created: 2026/01/02 11:04 PM
//	Authors: The Kumor
// 
// ================================================

var items = {};

items["chair"] = {
	Name: {
		en: "Chair",
		pl: "Krzesło"
	},
	Cost: 4000
};

items["apple"] = {
	Name: {
		en: "Apple",
		pl: "Krzesło"
	},
	Cost: 200,
	Use: function(item, user) {
		// TODO: Put code here.
	}
};

items["bread"] = {
	Name: {
		en: "Bread",
		pl: "Chleb"
	},
	Cost: 300,
	Use: function(item, user) {

	}
};

items["rock"] = {
	Name: {
		en: "Rock",
		pl: "Kamień"
	},
	Cost: 70,
	Attack: 1
};

items["star"] = {
	Name: {
		en: "Star",
		pl: "Gwiazdka"
	},
	Cost: 800
};

items["knife"] = {
	Name: {
		en: "Knife",
		pl: "Nóż"
	},
	Cost: 1200,
	Attack: 2
};

items["shield"] = {
	Name: {
		en: "Shield",
		pl: "Tarcza"
	},
	Cost: 5000,
	Defence: 2
};

items["rod"] = {
	Name: {
		en: "Rod",
		pl: "Berło"
	},
	Cost: 9000,
	Magic: 3
};

items["sausage"] = {
	Name: {
		en: "Sausage",
		pl: "Kiełbaska"
	},
	Cost: 400,
	Use: function(item, user) {

	}
};

items["breadstick"] = {
	Name: {
		en: "Bread stick",
		pl: "Paluszek"
	},
	Cost: 20,
	Use: function(item, user) {

	}
};

items["bow"] = {
	Name: {
		en: "Bow",
		pl: "Łuk"
	},
	Cost: 600,
	Attack: 1.5
}

export { items };