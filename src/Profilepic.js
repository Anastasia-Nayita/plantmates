import React from "react";

export default function ({ first, last, imageUrl, clickHandler }) {
    return (
        <div>
            <img
                src={imageUrl}
                alt={{ first } & { last }}
                onClick={clickHandler}
            />
            <br />
            {first} {last}
        </div>
    );
}
