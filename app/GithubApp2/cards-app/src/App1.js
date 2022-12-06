// shaikh.sadique@gmail.com
import { Profiler, useState } from 'react';
import './App.scss';
import axios from "axios"


const testData = [
  { name: "Dan Abramov", avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4", company: "@facebook" },
  { name: "Sophie Alpert", avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4", company: "Humu" },
  { name: "Sebastian Markbåge", avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4", company: "Facebook" },
];

const CardList = (props) => {

  return (

    <>
      {
        props.profiles.map((profile, index, arr) => {
          return (
            <Card profile={profile} />
          )
        })
      }

    </>
  )
}
const Card = (props) => {
  return (
    <div className='card'>
      <img className="profile_pic" src={props.profile.avatar_url} />
      <div className="info">
        <div className='name'>{props.profile.name}</div>
        <div className='Company'>{props.profile.company}</div>
      </div>
    </div>
  )
}

const Form = (props) => {
  const [userName, setUserName] = useState("");
  const handleOnChange = (event) => {
    setUserName(event.target.value);
  }
  const handleOnSubmit = async (event) => {
    event.preventDefault();
    console.log(userName);
    const res = await axios.get(`https://api.github.com/users/${userName}`);
    console.log(res.data);
    props.newProfileData(res.data);

  }
  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <input type={"text"}
          placeholder="Enter git hub user name"
          onChange={handleOnChange} />
        <button>Add Profile Card</button>

      </form>
    </>
  )
}

function App() {
  const [profiles, setProfiles] = useState([testData]);
  const newProfileData = (newProfile) => {
    console.log("the new profile:", newProfile);
    setProfiles([...profiles, newProfile])
  }
  return (
    <div>
      <h1 className="header">The Git Hub App</h1>

      <Form newProfileData={newProfileData} />
      <CardList profiles={profiles} />
    </div>
  );
}

export default App;
