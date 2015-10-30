module.exports = {
	port: process.env.OPS_PORT       || 8000, // used by server.js
	baseUrl: process.env.OPS_BASEURL || 'http://localhost:8111/app/rest', // used by sender.js
	auth: {
		user: process.env.OPS_USER   || 'admin',
		pass: process.env.OPS_PASS   || 'admin'
	}
}
