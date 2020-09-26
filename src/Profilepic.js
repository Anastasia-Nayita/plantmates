import React from "react";

export default function ({ first, last, imageUrl, ClickHandler }) {
    return (
        <div>
            <img src={imageUrl} alt={first} onClick={ClickHandler} />
            {first} {last}
        </div>
    );
}
