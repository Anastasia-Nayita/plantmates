import React from "react";
import Profilepic from "./Profilepic";
import BioEditor from "./BioEditor";

export default function ({ first, last, imageUrl, clickHandler, bio, setBio }) {
    return (
        <div>
            <Profilepic
                first={first}
                last={last}
                imageUrl={imageUrl}
                clickHandler={clickHandler}
            />
            <img src={imageUrl} alt={`${first}  ${last}`} />
            <p>
                {first}
                {last}
            </p>
            <BioEditor bio={bio} editBio={setBio} />
        </div>
    );
}
