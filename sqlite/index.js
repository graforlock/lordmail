const db = require('./sqlite'),
      fs = require('fs');

const Rows = require('../schema/rows')(db),
      DefaultCss = require('../schema/defaultcss')(db),
      Layout = require('../schema/base-layout')(db),
      Options = require('../schema/options')(db),
      Templates = require('../schema/templates')(db);
      

module.exports = {
    db,
    model: {
        Rows,
        DefaultCss,
        Layout,
        Options,
        Templates
    }
};