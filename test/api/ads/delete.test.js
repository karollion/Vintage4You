const server = require('../../../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const Ads = require('../../../models/ads.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('Ads route test: DELETE /api/ads', () => {
  
  before(async () => {
		const testAdsOne = new Ads({ 
      _id: '5d9f1140f10a81216cfd4408', 
      title: 'Rolki używane ale dobre',
      content: 'Sprzedaje rolki bo mam je na sprzedaż', 
      date: '2020-05-12T23:50:21.817Z', 
      picture: 'rolki.jpg',
      price: 200, 
      location: 'Gdynia', 
      seller: 'Michał'
    });
		await testAdsOne.save();
	});
  
  it('/:id should delete chosen document and return success', async () => {
    const res = await request(server).delete('/api/ads/5d9f1140f10a81216cfd4408');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.not.be.null;

    after(async () => {
      await Ads.deleteMany();
    });
  });
});