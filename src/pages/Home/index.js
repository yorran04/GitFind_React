import React from "react";
import { useState } from "react";

import "../Home/styles.css"

import { Header } from "../../components/Header";
import background from "../../assets/logo.png"
import { ItemList } from "../../components/itemList"; 

function App() {

  const [user, SetUser] = useState('')
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRespos] = useState(null)

  const heandleGetData = async () =>{
    const userData = await fetch(`https://api.github.com/users/${user}`)
    const newUser = await userData.json();

    if(newUser.name){
      const {avatar_url, name, bio, login} = newUser;
      setCurrentUser({avatar_url, name, bio, login})
    }

    const reposData = await fetch(`https://api.github.com/users/${user}/repos`)
    const newRepos = await reposData.json();

    if(newRepos.length){
      setRespos(newRepos)
    }
  }

 


  return (
  <>
  <Header/>
  <img src={background} className="img" alt="background app"/>
  <div className="container">
  <div className="info">
    <div>
      <input 
      value={user}
      onChange={(e) => SetUser(e.target.value)}
      name="usuario" placeholder="@username"/>
      <button onClick={heandleGetData}>Buscar</button>
    </div>
    {currentUser?.name ? (<>
    <div className="profile">
      <div className="img_profile" >
        <img src={currentUser.avatar_url} alt="foto peril github"></img>
      </div>
      <div className="description">
        <h3>{currentUser.name}</h3>
        <span>{currentUser.login}</span>
        <br/>
        <p>{currentUser.bio}</p>
      </div>
    </div>
    </>):null}
    <hr/>
    {repos?.length ? (
    <div>
      <h4 className="repositoiro">Repositórios</h4>
      {repos.map(repo => (
        <ItemList title={repo.name} description={repo.description}/>
      ))}
            
    </div>
    ):null}
  </div>
  </div>
  </>
  );
}

export default App;
