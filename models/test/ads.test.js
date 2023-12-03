const Ads = require('../ads.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Ads - model', () => {

  it('should throw an error if no any arg', async () => {
    const ads = new Ads({}); // create new Ads, but don't set any attr value

    ads.validateSync(err => {
      expect(err.errors.name).to.exist;
    });
  });

  it('should throw an error if "title" is not a string', () => {
    const cases = [
      { 
        title: [],
        content: 'Sprzedaje rolki bo mam je na sprzedaż', 
        date: '2020-05-12T23:50:21.817Z', 
        picture: 'rolki.jpg',
        price: 200, 
        location: 'Gdynia', 
        seller: 'Michał'
      },
      { 
        title: {},
        content: 'Sprzedaje spodnie juz mi nie potrzebne', 
        date: '2023-12-24T23:50:21.817Z', 
        picture: 'spodnie.jpg',
        price: 90, 
        location: 'Warszawa', 
        seller: 'Syriusz'
      },
      { 
        title: 99,
        content: 'Sprzedaje rolki bo mam je na sprzedaż', 
        date: '2020-05-12T23:50:21.817Z', 
        picture: 'rolki.jpg',
        price: 200, 
        location: 'Gdynia', 
        seller: 'Michał'
      },
    ];

    for(let cas of cases) {
      const ads = new Ads({ cas });
      ads.validateSync(err => {
        expect(err).to.exist;
      });
    }
  });

  it('should throw an error if "title" is to long or to short', () => {
    const cases = [
      { 
        title: 'Rolki używane ale dobre bo moze komus tam sie spodobaja a jak nie to sobie spali w piecyku',
        content: 'Sprzedaje rolki bo mam je na sprzedaż', 
        date: '2020-05-12T23:50:21.817Z', 
        picture: 'rolki.jpg',
        price: 200, 
        location: 'Gdynia', 
        seller: 'Michał'
      },
      { 
        title: 'Spodnie',
        content: 'Sprzedaje spodnie juz mi nie potrzebne', 
        date: '2023-12-24T23:50:21.817Z', 
        picture: 'spodnie.jpg',
        price: 90, 
        location: 'Warszawa', 
        seller: 'Syriusz'
      },
    ];

    for(let cas of cases) {
      const ads = new Ads({ cas });
      ads.validateSync(err => {
        expect(err).to.exist;
      });
    }
  });

  it('should throw an error if "title" is not a string', () => {
    const cases = [
      { 
        title: 'Rolki używane',
        content: {}, 
        date: '2020-05-12T23:50:21.817Z', 
        picture: 'rolki.jpg',
        price: 200, 
        location: 'Gdynia', 
        seller: 'Michał'
      },
      { 
        title: 'Spodnie używane',
        content: [], 
        date: '2023-12-24T23:50:21.817Z', 
        picture: 'spodnie.jpg',
        price: 90, 
        location: 'Warszawa', 
        seller: 'Syriusz'
      },
      { 
        title: 'Spodnie używane',
        content: 54, 
        date: '2020-05-12T23:50:21.817Z', 
        picture: 'rolki.jpg',
        price: 200, 
        location: 'Gdynia', 
        seller: 'Michał'
      },
    ];

    for(let cas of cases) {
      const ads = new Ads({ cas });
      ads.validateSync(err => {
        expect(err).to.exist;
      });
    }
  });

  it('should throw an error if "content" is to long or to short', () => {
    const cases = [
      { 
        title: 'Rolki używane',
        content: 'Sprzedaje rolki bo mam je na sprzedażSprzedaje rolki bo mam je na sprzedażSprzedaje rolki bo mam je na sprzedażSprzedaje rolki bo mam je na sprzedażSprzedaje rolki bo mam je na sprzedażSprzedaje rolki bo mam je na sprzedażSprzedaje rolki bo mam je na sprzedażSprzedaje rolki bo mam je na sprzedażSprzedaje rolki bo mam je na sprzedażSprzedaje rolki bo mam je na sprzedażSprzedaje rolki bo mam je na sprzedażSprzedaje rolki bo mam je na sprzedażSprzedaje rolki bo mam je na sprzedażSprzedaje rolki bo mam je na sprzedażSprzedaje rolki bo mam je na sprzedażSprzedaje rolki bo mam je na sprzedażSprzedaje rolki bo mam je na sprzedażSprzedaje rolki bo mam je na sprzedażSprzedaje rolki bo mam je na sprzedażSprzedaje rolki bo mam je na sprzedażSprzedaje rolki bo mam je na sprzedażSprzedaje rolki bo mam je na sprzedażSprzedaje rolki bo mam je na sprzedażSprzedaje rolki bo mam je na sprzedażSprzedaje rolki bo mam je na sprzedażSprzedaje rolki bo mam je na sprzedażSprzedaje rolki bo mam je na sprzedażSprzedaje rolki bo mam je na sprzedażSprzedaje rolki bo mam je na sprzedażSprzedaje rolki bo mam je na sprzedażSprzedaje rolki bo mam je na sprzedażSprzedaje rolki bo mam je na sprzedażSprzedaje rolki bo mam je na sprzedażSprzedaje rolki bo mam je na sprzedażSprzedaje rolki bo mam je na sprzedażSprzedaje rolki bo mam je na sprzedaż', 
        date: '2020-05-12T23:50:21.817Z', 
        picture: 'rolki.jpg',
        price: 200, 
        location: 'Gdynia', 
        seller: 'Michał'
      },
      { 
        title: 'Spodnie używane',
        content: 'Spodnie', 
        date: '2023-12-24T23:50:21.817Z', 
        picture: 'spodnie.jpg',
        price: 90, 
        location: 'Warszawa', 
        seller: 'Syriusz'
      },
    ];

    for(let cas of cases) {
      const ads = new Ads({ cas });
      ads.validateSync(err => {
        expect(err).to.exist;
      });
    }
  });

  it('should throw an error if "date" is not a string', () => {
    const cases = [
      { 
        title: 'Rolki używane ale dobre',
        content: 'Sprzedaje rolki bo mam je na sprzedaż', 
        date: {}, 
        picture: 'rolki.jpg',
        price: 200, 
        location: 'Gdynia', 
        seller: 'Michał'
      },
      { 
        title: 'Spodnie niebieskie',
        content: 'Sprzedaje spodnie juz mi nie potrzebne', 
        date: [], 
        picture: 'spodnie.jpg',
        price: 90, 
        location: 'Warszawa', 
        seller: 'Syriusz'
      },
      { 
        title: 'Rolki używane ale dobre',
        content: 'Sprzedaje rolki bo mam je na sprzedaż', 
        date: 666, 
        picture: 'rolki.jpg',
        price: 200, 
        location: 'Gdynia', 
        seller: 'Michał'
      },
    ];

    for(let cas of cases) {
      const ads = new Ads({ cas });
      ads.validateSync(err => {
        expect(err).to.exist;
      });
    }
  });

  it('should throw an error if "picture" is not a string', () => {
    const cases = [
      { 
        title: 'Rolki używane ale dobre',
        content: 'Sprzedaje rolki bo mam je na sprzedaż', 
        date: '2020-05-12T23:50:21.817Z', 
        picture: [],
        price: 200, 
        location: 'Gdynia', 
        seller: 'Michał'
      },
      { 
        title: 'Spodnie niebieskie',
        content: 'Sprzedaje spodnie juz mi nie potrzebne', 
        date: '2020-05-12T23:50:21.817Z', 
        picture: {},
        price: 90, 
        location: 'Warszawa', 
        seller: 'Syriusz'
      },
      { 
        title: 'Rolki używane ale dobre',
        content: 'Sprzedaje rolki bo mam je na sprzedaż', 
        date: '2020-05-12T23:50:21.817Z', 
        picture: 333,
        price: 200, 
        location: 'Gdynia', 
        seller: 'Michał'
      },
    ];

    for(let cas of cases) {
      const ads = new Ads({ cas });
      ads.validateSync(err => {
        expect(err).to.exist;
      });
    }
  });

  it('should throw an error if "price" is not a number', () => {
    const cases = [
      { 
        title: 'Rolki używane ale dobre',
        content: 'Sprzedaje rolki bo mam je na sprzedaż', 
        date: '2020-05-12T23:50:21.817Z', 
        picture: 'rolki.jpg',
        price: [], 
        location: 'Gdynia', 
        seller: 'Michał'
      },
      { 
        title: 'Spodnie niebieskie',
        content: 'Sprzedaje spodnie juz mi nie potrzebne', 
        date: '2023-12-24T23:50:21.817Z', 
        picture: 'spodnie.jpg',
        price: {}, 
        location: 'Warszawa', 
        seller: 'Syriusz'
      },
      { 
        title: 'Spodnie niebieskie',
        content: 'Sprzedaje spodnie juz mi nie potrzebne', 
        date: '2023-12-24T23:50:21.817Z', 
        picture: 'spodnie.jpg',
        price: '66', 
        location: 'Warszawa', 
        seller: 'Syriusz'
      },
    ];

    for(let cas of cases) {
      const ads = new Ads({ cas });
      ads.validateSync(err => {
        expect(err).to.exist;
      });
    }
  });

  it('should throw an error if "location" is not a string', () => {
    const cases = [
      { 
        title: 'Rolki używane ale dobre',
        content: 'Sprzedaje rolki bo mam je na sprzedaż', 
        date: '2020-05-12T23:50:21.817Z', 
        picture: 'rolki.jpg',
        price: 200, 
        location: {}, 
        seller: 'Michał'
      },
      { 
        title: 'Spodnie niebieskie',
        content: 'Sprzedaje spodnie juz mi nie potrzebne', 
        date: '2020-05-12T23:50:21.817Z', 
        picture: 'spodnie.jpg',
        price: 90, 
        location: [], 
        seller: 'Syriusz'
      },
      { 
        title: 'Rolki używane ale dobre',
        content: 'Sprzedaje rolki bo mam je na sprzedaż', 
        date: '2020-05-12T23:50:21.817Z', 
        picture: 'rolki.jpg',
        price: 200, 
        location: 345, 
        seller: 'Michał'
      },
    ];
    
    for(let cas of cases) {
      const ads = new Ads({ cas });
      ads.validateSync(err => {
        expect(err).to.exist;
      });
    }
  });

  it('should throw an error if "location" is not a string', () => {
    const cases = [
      { 
        title: 'Rolki używane ale dobre',
        content: 'Sprzedaje rolki bo mam je na sprzedaż', 
        date: '2020-05-12T23:50:21.817Z', 
        picture: 'rolki.jpg',
        price: 200, 
        location: 'Warszawa', 
        seller: [],
      },
      { 
        title: 'Spodnie niebieskie',
        content: 'Sprzedaje spodnie juz mi nie potrzebne', 
        date: '2020-05-12T23:50:21.817Z', 
        picture: 'spodnie.jpg',
        price: 90, 
        location: 'Warszawa', 
        seller: {},
      },
      { 
        title: 'Rolki używane ale dobre',
        content: 'Sprzedaje rolki bo mam je na sprzedaż', 
        date: '2020-05-12T23:50:21.817Z', 
        picture: 'rolki.jpg',
        price: 200, 
        location: 'Warszawa', 
        seller: 333,
      },
    ];
    
    for(let cas of cases) {
      const ads = new Ads({ cas });
      ads.validateSync(err => {
        expect(err).to.exist;
      });
    }
  });

  it('should not throw an error if all arg is okay', () => {
    const cases = [
      { 
        title: 'Rolki używane ale dobre',
        content: 'Sprzedaje rolki bo mam je na sprzedaż', 
        date: '2020-05-12T23:50:21.817Z', 
        picture: 'rolki.jpg',
        price: 200, 
        location: 'Gdynia', 
        seller: 'Michał'
      },
      { 
        title: 'Spodnie niebieskie',
        content: 'Sprzedaje spodnie juz mi nie potrzebne', 
        date: '2023-12-24T23:50:21.817Z', 
        picture: 'spodnie.jpg',
        price: 50, 
        location: 'Warszawa', 
        seller: 'Syriusz'
      },
      { 
        title: 'Dywanikidwa',
        content: 'Sprzedaje dwa dywany prawie czyste', 
        date: '2023-11-12T23:50:21.817Z', 
        picture: 'dywany.jpg',
        price: 150, 
        location: 'Toruń', 
        seller: 'Orion'
      },
    ];

    for(let cas of cases) {
      const ads = new Ads({ cas });
      ads.validateSync(err => {
        expect(err).to.not.exist;
      });
    }
  });

});