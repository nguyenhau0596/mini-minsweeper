if (process.env.NODE_ENV === 'production') {
  module.exports = require('./prodStore');
} else {
  module.exports = require('./devStore');
}
