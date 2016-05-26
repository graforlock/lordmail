export default (type, index) => (
        `
        ${index === 0 
            ? 
            `{{header}}`
           : ``}
        <tr mc:hideable="" >
            {{${type}}}
        </tr>`   
    );