import React from "react";
import "./App_style.scss"
import { useState } from "react";
import axios from "axios";

const testData = [
    { name: "Dan Abramov", avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4", company: "@facebook" },
    { name: "Sophie Alpert", avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4", company: "Humu" },
    { name: "Sebastian Markbåge", avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4", company: "Facebook" },
];

// Api ko lene k waste mereko ek form lagega
// apneko onSubmit function, inputChange function, userName lene k liye state banana hai
const Form = (props) => {
    const [userName, setUserName] = useState("")
    const handleOnChange = (event) => {
        setUserName(event.target.value)
    }
    const handleOnSubmit = async (event) => {
        event.preventDefault();
        const res = await axios(`https://api.github.com/users/${userName}`);
        console.log("The response is", res.data);
        props.addNewProfile(res.data)
    }
    return (
        <>
            <form onSubmit={handleOnSubmit} >
                <input type={"text"} placeholder="Enter Git Hub user name" value={userName} onChange={handleOnChange} />
                <button>Add Profile</button>
            </form>
        </>
    )
}

const CardList = (props) => {
    console.log("The profile in CardList:", props.profile)
    return (
        <>
            {props.profile.map((item, index, arr) => {
                return (
                    <Card profile={item} />
                )
            })}

            {/* <Card profile={props.profile[1]} />
            <Card profile={props.profile[2]} /> */}
        </>
    )
}
const Card = (props) => {
    console.log(props)
    return (
        <div className="card">
            <img src={props.profile.avatar_url} />
            <div className="info">
                <h4 className="name">{props.profile.name}</h4>
                <p className="company">{props.profile.company}</p>
            </div>
        </div>
    )
}

function App(props) {
    const [profile, setProfile] = useState([])
    const addNewProfile = (newProfile) => {
        console.log("New data from api", newProfile);
        setProfile([...profile, newProfile])
    }
    return (
        <div>
            <h1 className="header">The Git Hub App</h1>
            <Form addNewProfile={addNewProfile} />
            <CardList profile={profile} />

        </div>
    )
}

export default App;