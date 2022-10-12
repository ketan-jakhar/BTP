require("dotenv").config({ path: "../.env" });
const crypto = require("crypto");

const algorithm = "aes-256-cbc"; //Using AES encryption
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

//Encrypting data
exports.encrypt = (data) => {
	let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);

	let encrypted = cipher.update(data);

	encrypted = Buffer.concat([encrypted, cipher.final()]);

	global.iv = iv.toString("hex");
	return encrypted.toString("hex");
};

// Decrypting data
exports.decrypt = (data) => {
	// let iv = Buffer.from(data.iv, "hex");
	// let iv = inV;
	let encrypteddata = Buffer.from(data, "hex");
	let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
	let decrypted = decipher.update(encrypteddata);
	decrypted = Buffer.concat([decrypted, decipher.final()]);
	return decrypted.toString();
};

// Encrypt Id
exports.encryptId = (id) => {
	return exports.encrypt(id.toString());
};
