import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function Search() {
    const [userInput, setUserInput] = useState("");
    const [people, setPeople] = useState([]);
    console.log("people: ", people);
    useEffect(() => {
        let abort;
        (async () => {
            try {
                const { data } = await axios.get(
                    userInput ? `"/users/" + userInput` : "/users"
                );
                if (!abort) {
                    setPeople(data);
                }
                console.log("result in find people", data);
            } catch (err) {
                console.log("err: ", err);
            }
            return () => {
                abort = true;
            };
        })();
    }, [userInput]);

    function handleChange(e) {
        setUserInput(e.target.value);
    }

    return (
        <div>
            <>
                <h1>find people</h1>
                <input
                    onChange={(e) => handleChange(e)}
                    type="text"
                    name="userInput"
                    placeholder="enter a name"
                    defaultValue={userInput}
                />
            </>

            <>
                {people.map((user) => {
                    return (
                        <div key={user.id} className="search-result-block">
                            <img className="profile-pic" src={user.img_url} />
                            <h3>
                                {user.first} {user.last}
                            </h3>
                        </div>
                    );
                })}
            </>
        </div>
    );
}
