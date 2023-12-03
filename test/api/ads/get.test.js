const server = require('../../../server');
const Ads = require('../../../models/ads.model');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('Ads route test: GET /api/ads', () => {
  
  beforeEach(async () => {
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

		const testAdsTwo = new Ads({ 
      _id: '5d9f1159f81ce8d1ef2bee48', 
      title: 'Spodnie niebieskie',
      content: 'Sprzedaje spodnie juz mi nie potrzebne', 
      date: '2023-12-24T23:50:21.817Z', 
      picture: 'spodnie.jpg',
      price: 50, 
      location: 'Warszawa', 
      seller: 'Syriusz'
    });
		await testAdsTwo.save();
	});
  
    it('/ should return all Ads', async () => {
      const res = await request(server).get('/api/ads');
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.be.equal(2);
  
      after(async () => {
        await Ads.deleteMany();
      });
    });
  
  it('/:id should return one department by :id ', async () => {
    const res = await request(server).get('/api/ads/5d9f1159f81ce8d1ef2bee48');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.not.be.null;

    after(async () => {
      await Ads.deleteMany();
    });
  });

});