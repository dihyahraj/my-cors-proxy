const fetch = require('node-fetch');

module.exports = async (request, response) => {
    const targetUrl = request.query.url;

    if (!targetUrl) {
        return response.status(400).send('Error: URL parameter is missing.');
    }

    try {
        const fetchResponse = await fetch(targetUrl);
        const body = await fetchResponse.text();

        // Set CORS headers to allow requests from any origin
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

        response.status(200).send(body);

    } catch (error) {
        response.status(500).send(`Error fetching the URL: ${error.message}`);
    }
};
