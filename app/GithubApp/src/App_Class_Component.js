
import React, { useState } from 'react';
import './App.scss';
import axios from 'axios'

// const CardList = (props) => {
//   return (
//     <div>

//       {
//         props.profiles.map((profile) => {
//           return <Card profile={profile} />
//         })
//       }
//     </div>
//   )
//  }

// class Form extends React.Component {
//   state = {
//     userName: "",

//   }
//   handleInputChange = (event) => {
//     this.setState({ userName: event.target.value });
//   }
//   handleOnSubmit = async (event) => {
//     event.preventDefault();
//     console.log("state", this.state.userName);
//     const config = {
//       method: 'get',
//       url: `https://api.github.com/users/${this.state.userName}`,
//       headers: {}
//     };
//     try {
//       const response = await axios(config)
//       console.log(JSON.stringify(response.data));
//       this.props.onDataReciveddFromAPI(response.data)
//     } catch (error) {
//       console.log(error);
//       // });
//     }

//     // .then(function (response) {
//     //   console.log(JSON.stringify(response.data));
//     // })
//     // .catch(function (error) {
//     //   console.log(error);
//     // });

//   }
//   render() {
//     return (
//       <div>
//         <form onSubmit={this.handleOnSubmit}>
//           <input
//             type={"text"}
//             placeholder="Enter github username"
//             value={this.state.userName}
//             onChange={this.handleInputChange}
//             required
//           />
//           <button > Add Profile Card</button>
//         </form>
//       </div>
//     )
//   }
// }

// class Card extends React.Component {
//   render() {
//     const profile = this.props.profile
//     return (
//       <div style={{ margin: "1rem" }}>
//         <img src={profile.avatar_url} style={{ width: "75px" }} />
//         <div style={{ display: "inline-block", marginLeft: "12px" }}>
//           <div style={{ fontSize: "125%" }}>{profile.name}</div>
//           <div>{profile.company}</div>
//         </div>
//       </div>
//     )
//   }
// }
// class App extends React.Component {
//   // constructor(props) {
//   //   super(props)
//   //   this.state = {
//   //     profiles: [],
//   //     searchText: ""
//   //   }
//   // }

//   state = {
//     profiles: []
//   }
//   addNewProfile = (profileData) => {
//     console.log("Profile::", profileData);
//     this.setState({ profiles: [...this.state.profiles, profileData] })
//   }
//   render() {
//     return (
//       <div>
//         <div className='header'>
//           The Git Hub App
//         </div>
//         <Form onDataReciveddFromAPI={this.addNewProfile} />
//         <CardList profiles={this.state.profiles} />
//       </div>
//     );
//   }
// }


// .................using function..............
// function name(params) {

// }

// const testData = [
//   { name: "Dan Abramov", avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4", company: "@facebook" },
//   { name: "Sophie Alpert", avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4", company: "Humu" },
//   { name: "Sebastian Markbåge", avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4", company: "Facebook" },
// ];

// props is an argument
const Card = (props) => {

  return (
    <div style={{ margin: "1rem" }}>
      <img src={props.profile.avatar_url} style={{ width: "75px" }} />
      <div style={{ display: "inline-block", marginLeft: "12px" }}>
        <div style={{ fontSize: "125%" }}>{props.profile.name}</div>
        <div>{props.profile.company}</div>
      </div>
    </div>
  )
}

const CardList = (props) => {

  return (
    <>
      {
      props.profiles.map((item, index, arr) => {
        return(
        <Card profile={item} />
      )
      })
      }

    </>
  )
}

const Form =(props)=>{
  const [userName,setUserName] = useState("");
  const handleInputChange = (event)=>{
    setUserName(event.target.value)
  }

  const handleOnSubmit = async(event)=>{
    event.preventDefault();
    const response = await axios.get(`https://api.github.com/users/${userName}`);
    props.addNewProfile(response.data)
  }
  return(
          <div>
        <form onSubmit={handleOnSubmit}>
          <input
            type={"text"}
            placeholder="Enter github username"
            value={userName}
            onChange={handleInputChange}
            required
          />
          <button > Add Profile Card</button>
        </form>
      </div>
  )
}

const App = () => {
  const [profiles, setProfiles] = useState([]);
  const addNewProfile =(newProfile)=>{
    console.log("New data from profile");
    setProfiles([...profiles,newProfile])
  }
  return (
    <div>
      <div className='header'>
        <h1>The Git Hub App</h1>
      </div>
      <Form addNewProfile={addNewProfile}/>
      <CardList profiles={profiles} />
    </div>
  )
}
export default App;
