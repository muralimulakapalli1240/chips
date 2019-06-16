import React from 'react';
const striptext = (bool, search, searchText) => {
    if (bool)
        return searchText
    else {
        let highlight_regex = new RegExp('(' + search + ')', 'gi');
        let main = searchText.replace(highlight_regex, '<>$1<>');
        main.split("<>").map(val => val)
        return main.split("<>").map((val, index) =>
            val.toLowerCase() == search ?
                <b key={index}>{val}</b> :
                <span key={index}>{val}</span>)
    }
}
const Chips = ({
    val, text, icon, handleClose, bool, search }) => (
        <div className="content">
            <div className="icon"><img alt={text} src={icon} /></div>
            <div className="text">{striptext(bool, search, text)} </div>
            {bool ? <div className="close" onClick={() => handleClose(val)}>x</div> : ""}
        </div>
    )



export default Chips;