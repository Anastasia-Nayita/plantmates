import React from "react";

export default function ({ first, last, profilepic, bioEditor, wall }) {
    return (
        <div>
            {profilepic}
            <div className="profile-info">
                <div className="bigger">{profilepic}</div>

                <h3>
                    {first} {last}
                </h3>
                {bioEditor}
            </div>
            <div className="wall-block">{wall}</div>
        </div>
    );
}
