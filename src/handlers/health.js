'use strict';

const Boom = require('boom');

/**
 * Operations on /health
 */
module.exports = {
    /**
     * summary: Check API status
     * description: The HTTP request GET /health is used to return the current status of the Notifications API.
     * parameters: 
     * produces: application/json
     * responses: 200, 400, 401, 403, 404, 405, 406, 501, 503
     */
    get: function ReportsHealthGet(request, h) {
        return h.response({
            "status": "ok"
        })
    }
};
