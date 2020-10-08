import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "./axios";

export default function Search() {
    const [userInput, setUserInput] = useState("");
    const [people, setPeople] = useState([]);
    console.log("console people: ", people);
    useEffect(() => {
        let abort;
        (async () => {
            try {
                const { data } = await axios.get(
                    userInput ? "/get-users/" + userInput : "/get-users"
                );
                if (!abort) {
                    setPeople(data);
                }
                console.log("console data", data);
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
    if (people) {
        return (
            <div className="find-block">
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
                                <img
                                    className="profile-pic"
                                    src={user.img_url}
                                />
                                <h3>
                                    {user.first} {user.last}
                                </h3>
                            </div>
                        );
                    })}
                </>
            </div>
        );
    } else {
        return <h2>not today</h2>;
    }
}
