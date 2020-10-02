const mail = require('../utils/mail');
const server = require('../server');
describe('Mails ', () => {

    beforeAll(() => {
        server.start();
    });

    beforeEach(() => {

    });

    afterAll(() => {

    })

    it.skip('stripquotes returning clean string with no quotes', () => {
        let str = "test me jest";
        expect(mail.stripquotes(str)).toMatch('test me jest');
    });

    it('Test health endpoint ', async () => {

        server.route({
            method: 'GET',
            path: '/',
            handler: () => {
                return {
                    status: 'ok'
                }
            }
        })

        // these must match the route you want to test
        const injectOptions = {
            method: 'GET',
            url: '/health'
        }

        // wait for the response and the request to finish
        const response = await server.inject(injectOptions)

        // alright, set your expectations :)
        expect(response.statusCode).to.equal(200)

        // shortcut to payload
        const payload = JSON.parse(response.payload);
        expect(payload.status).to.equal('ok');

    });


    it('Mail endpoint ', () => {


    });

})

