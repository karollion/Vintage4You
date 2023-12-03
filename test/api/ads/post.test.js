const server = require('../../../server');
const Ads = require('../../../models/ads.model');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('Ads route test: POST /api/ads', () => {

  it('/ should insert new document to db and return success', async () => {
    const res = await request(server).post('/api/ads').send({ 
      title: 'Rolki używane ale dobre',
      content: 'Sprzedaje rolki bo mam je na sprzedaż', 
      date: '2020-05-12T23:50:21.817Z', 
      picture: 'rolki.jpg',
      price: 200, 
      location: 'Gdynia', 
      seller: 'Michał'
    });
    const newAds = await Ads.findOne({ title: 'Rolki używane ale dobre' });
    expect(res.status).to.be.equal(200);
    expect(newAds).to.not.be.null;
  });

  after(async () => {
    await Ads.deleteMany();
  });

});