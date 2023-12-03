const User = require('../Users.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('User - model', () => {

  it('should throw an error if no any arg', async () => {
    const user = new User({}); // create new User, but don't set any attr value

    user.validateSync(err => {
      expect(err.errors.name).to.exist;
    });
  });

  it('should throw an error if "login" is not a string', () => {
    const cases = [
      { 
        login: {},
        password: 'admin123', 
        avatar: 'twaz1.jpg', 
        phone: 600300200,
      },
      { 
        login: [],
        password: '123edswe', 
        avatar: 'twaz2.jpg', 
        phone: 555213458,
      },
      { 
        login: 345,
        password: 'qwertyuui', 
        avatar: 'twaz3.jpg', 
        phone: 900345111,
      },
    ];

    for(let cas of cases) {
      const user = new User({ cas });
      user.validateSync(err => {
        expect(err).to.exist;
      });
    }
  });

  it('should throw an error if "password" is not a string', () => {
    const cases = [
      { 
        login: 'Samuraj Jack',
        password: {}, 
        avatar: 'twaz1.jpg', 
        phone: 600300200,
      },
      { 
        login: 'Aku',
        password: [], 
        avatar: 'twaz2.jpg', 
        phone: 555213458,
      },
      { 
        login: 'Ashi',
        password: 345, 
        avatar: 'twaz3.jpg', 
        phone: 900345111,
      },
    ];

    for(let cas of cases) {
      const user = new User({ cas });
      user.validateSync(err => {
        expect(err).to.exist;
      });
    }
  });

  it('should throw an error if "avatar" is not a string', () => {
    const cases = [
      { 
        login: 'Samuraj Jack',
        password: 'admin123', 
        avatar: {}, 
        phone: 600300200,
      },
      { 
        login: 'Aku',
        password: '123edswe', 
        avatar: [], 
        phone: 555213458,
      },
      { 
        login: 'Ashi',
        password: 'qwertyuui', 
        avatar: 6789, 
        phone: 900345111,
      },
    ];

    for(let cas of cases) {
      const user = new User({ cas });
      user.validateSync(err => {
        expect(err).to.exist;
      });
    }
  });

  it('should throw an error if "phone number" is not a string', () => {
    const cases = [
      { 
        login: 'Samuraj Jack',
        password: 'admin123', 
        avatar: 'twaz1.jpg', 
        phone: '600300200',
      },
      { 
        login: 'Aku',
        password: '123edswe', 
        avatar: 'twaz2.jpg', 
        phone: {},
      },
      { 
        login: 'Ashi',
        password: 'qwertyuui', 
        avatar: 'twaz3.jpg', 
        phone: [],
      },
    ];

    for(let cas of cases) {
      const user = new User({ cas });
      user.validateSync(err => {
        expect(err).to.exist;
      });
    }
  });

  it('should not throw an error if all arg is okay', () => {
    const cases = [
      { 
        login: 'Samuraj Jack',
        password: 'admin123', 
        avatar: 'twaz1.jpg', 
        phone: 600300200,
      },
      { 
        login: 'Aku',
        password: '123edswe', 
        avatar: 'twaz2.jpg', 
        phone: 555213458,
      },
      { 
        login: 'Ashi',
        password: 'qwertyuui', 
        avatar: 'twaz3.jpg', 
        phone: 900345111,
      },
    ];

    for(let cas of cases) {
      const user = new User({ cas });
      user.validateSync(err => {
        expect(err).to.not.exist;
      });
    }
  });

});