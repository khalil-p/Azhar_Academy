import React, { useState } from 'react';
import './App.scss';
import axios from 'axios';


// const testData = [
//     { name: "Dan Abramov", avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4", company: "@facebook" },
//     { name: "Sophie Alpert", avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4", company: "Humu" },
//     { name: "Sebastian Markbåge", avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4", company: "Facebook" },
// ];

const Form = (props) => {
    const [userName, setUserName]= useState("");
    const handleInputChange =(event)=>{
        setUserName(event.target.value);
    }
    const handleOnSubmit = async (event)=>{
        event.preventDefault();
        const res = await axios.get(`https://api.github.com/users/${userName}`);
        console.log(res.data);
        props.addNewProfile(res.data)
    }
    return (
        <form onSubmit={handleOnSubmit}>
            <div className='searchSection'>
                <input className='inputId' type={"text"} placeholder="Enter User Name" value={userName} onChange={handleInputChange}/>
                <button className="addButton">Add Profile Card</button>
            </div>
        </form>
    )
}

const CardList = (props) => {
    console.log(props.profiles)
    return (
        <>

            {/* ye cards ko bar bar likhna padra hai, isliye App() k andar apun ek state() declare karte */}
            {props.profiles.map((item) => {
                return (
                    <Card profile={item} />
                )
            })}


        </>
    )
}
const Card = props => {
    return (
        <div className="cards">
            <img className="profile_pic" src={props.profile.avatar_url} alt="prifilepic" />
            <div>
                <h4 className="user">{props.profile.name}</h4>
                <p className="company">{props.profile.company}</p>
            </div>
        </div>
    );
};

const App = props => {
    // state kaise declare karte ? const likh kar aage destructuring ka getter aur setter feature use karte
    // use state ek hook hai
    // react me ager koi naya variable declare karna hai to useState() hook use karinge
    // react hook ko import karna padhta hai
    const [profiles, setProfiles] = useState([]);

    const addNewProfile=(newProfile)=>{
        console.log("The new data from profile:",newProfile);
        setProfiles([...profiles,newProfile])
    }
    return (
        <div>
            <h1 className="header">The Git-Hub App</h1>
            <Form addNewProfile={addNewProfile}/>
            <CardList profiles={profiles} />
        </div>
    );
};

export default App;
