const sqlite = require('./sqlite'),
      Rows = sqlite.model.Rows,
      db = sqlite.db;

var data = [
    {name: 'col1', content: require('./src/layout/types/1col'), type: 'responsive'},
    {name: 'col2', content: require('./src/layout/types/2col'), type: 'responsive'},
    {name: 'col3', content: require('./src/layout/types/3col'), type: 'responsive'},
    {name: 'col6', content: require('./src/layout/types/6col'), type: 'responsive'},
    {name: 'lsidebar', content: require('./src/layout/types/lsidebar'), type: 'responsive'},
    {name: 'lzigzag', content: require('./src/layout/types/lzigzag'), type: 'responsive'},
    {name: 'rsidebar', content: require('./src/layout/types/rsidebar'), type: 'responsive'},
    {name: 'rzigzag', content: require('./src/layout/types/rzigzag'), type: 'responsive'},
    {name: 'spacer', content: require('./src/layout/types/spacer'), type: 'common'},
    {name: 'txtcol', content: require('./src/layout/types/txtcol'), type: 'common'}
];

db.sync({
    logging: console.log
}).then(function() {
        Rows.bulkCreate(data)
            .then(function() {
                Rows.findAll()
            })
            .then(function(users) {
                console.log(users);
            });
});