const sqlite = require('./sqlite'),
      Rows = sqlite.model.Rows,
      db = sqlite.db;

var data = [
    {name: 'col1', content: require('./src/layout/types/1col'), description: '',type: 'responsive'},
    {name: 'col2', content: require('./src/layout/types/2col'), description: '', type: 'responsive'},
    {name: 'col3', content: require('./src/layout/types/3col'), description: '', type: 'responsive'},
    {name: 'col6', content: require('./src/layout/types/6col'), description: '', type: 'responsive'},
    {name: 'lsidebar', content: require('./src/layout/types/lsidebar'), description: '', type: 'responsive'},
    {name: 'lzigzag', content: require('./src/layout/types/lzigzag'), description: '', type: 'responsive'},
    {name: 'rsidebar', content: require('./src/layout/types/rsidebar'), description: '', type: 'responsive'},
    {name: 'rzigzag', content: require('./src/layout/types/rzigzag'), description: '', type: 'responsive'},
    {name: 'spacer', content: require('./src/layout/types/spacer'), description: '', type: 'common'},
    {name: 'txtcol', content: require('./src/layout/types/txtcol'), description: '', type: 'common'}
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