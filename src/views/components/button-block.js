import React from 'react';


const ButtonBlock = ({ renderTemplate, sendEmail, editStyles, saveStyles }) => (
    <section >
        <button onClick={renderTemplate} className="render-button">render/save</button>
        <button onClick={sendEmail} className="render-button">send email</button>
        <button onClick={editStyles} className="render-button">edit styles</button>
        <button onClick={saveStyles} className="render-button">save styles</button>
    </section>

);

export default ButtonBlock;
