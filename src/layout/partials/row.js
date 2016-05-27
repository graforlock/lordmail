import partial from '../../utils/index';

export default ({type}, index) => (
        `
        <tr mc:hideable="" >
            {{${type}}}
        </tr>
        `   
);