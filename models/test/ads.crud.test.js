const Ads = require('../ads.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Ads - crud', () => {
  before(async () => {
    try {
      await mongoose.connect('mongodb://0.0.0.0:27017/NoticeBoardDBtest', { useNewUrlParser: true, useUnifiedTopology: true });
    } catch(err) {
      console.error(err);
    }
  });

  describe('Reading data', () => {

    //Adding sample data to the test database
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

    it('should return all the data with "find" method', async () => {
      const ads = await Ads.find();
      const expectedLength = 2;
      expect(ads.length).to.be.equal(expectedLength);
    });

    it('should return a proper document by "tite" with "findOne" method', async () => {
      const ads = await Ads.findOne({ title: 'Spodnie niebieskie' });
      const expectedTitle = 'Spodnie niebieskie';
      expect(ads.title).to.be.equal(expectedTitle);
    });

    // Remove all sample data 
    after(async () => {
      await Ads.deleteMany();
    });
  });

  describe('Creating data', () => {

    it('should insert new document with "insertOne" method', async () => {
      const ads = new Ads({ 
        title: 'Spodnie niebieskie',
        content: 'Sprzedaje spodnie juz mi nie potrzebne', 
        date: '2023-12-24T23:50:21.817Z', 
        picture: 'spodnie.jpg',
        price: 50, 
        location: 'Warszawa', 
        seller: 'Syriusz' });
      await ads.save();
      expect(ads.isNew).to.be.false;
    });

    // Remove all sample data 
    after(async () => {
      await Ads.deleteMany();
    });
  });

  describe('Updating data', () => {

    //Adding sample data to the test database.
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

    it('should properly update one document with "updateOne" method', async () => {
      await Ads.updateOne({ title: 'Spodnie niebieskie' }, { $set: { title: 'Spodnie szare' }});
      const updatedAds = await Ads.findOne({ title: 'Spodnie szare' });
      expect(updatedAds).to.not.be.null;

      afterEach(async () => {
        await Ads.deleteMany();
      });
    });
  
    it('should properly update one document with "save" method', async () => {
      const ads = await Ads.findOne({ title: 'Spodnie niebieskie' });
      ads.title = 'Spodnie szare';
      await ads.save();

      const updatedAds = await Ads.findOne({ title: 'Spodnie szare' });
      expect(updatedAds).to.not.be.null;
  
      afterEach(async () => {
        await Ads.deleteMany();
      });
    });
  
    it('should properly update multiple documents with "updateMany" method', async () => {
      await Ads.updateMany({}, { $set: { title: 'Spodnie szare' }});
      const ads = await Ads.find({ title: 'Spodnie szare' });
      expect(ads.length).to.be.equal(2);
  
      afterEach(async () => {
        await Ads.deleteMany();
      });
    });
  });

  describe('Removing data', () => {
    //Adding sample data to the test database.
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

    it('should properly remove one document with "deleteOne" method', async () => {
      await Ads.deleteOne({ title: 'Spodnie niebieskie' });
      const removeAds = await Ads.findOne({ title: 'Spodnie niebieskie' });
      expect(removeAds).to.be.null;

      afterEach(async () => {
        await Ads.deleteMany();
      });
    });
  
    it('should properly remove multiple documents with "deleteMany" method', async () => {
      await Ads.deleteMany();
      const ads = await Ads.find();
      expect(ads.length).to.be.equal(0);
  
      afterEach(async () => {
        await Ads.deleteMany();
      });
    });
  });

});