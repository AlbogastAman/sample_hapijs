'use strict';

const Boom = require('boom');
const {
    send
} = require("../utils/mails")

/**
 * Operations on /send
 */
module.exports = {
    /**
     * summary: Send mails
     * description: The HTTP request GET /transfers is used to return the list of all TIPS transfers with an option to fileter the transtactions using any combination of [&lt;transfer-status&gt;,&lt;transaction-type&gt;,&lt;from-date&gt;,&lt;to-date&gt;]  .
     * parameters: accept, content-type, transfer-status, transaction-type, from-date, to-date
     * produces: application/json
     * responses: 200, 400, 401, 403, 404, 405, 406, 501, 503
     */
    post: async function MailPost(request, h) {

        let body = request.payload;
        let info = await send(body);
        return h.response(info)

    }
};
