import React from 'react'
import Nav_bar from './Nav_bar'
import { useNavigate } from "react-router-dom";
import ViewTree from './ViewTree';
import Background from './Background'



function Home(props) {
  const navigate = useNavigate();
  return (
    <>
      <Nav_bar authToken={props.authToken} setAuthToken={props.setAuthToken} />
      <Background />

      <div className='home_body'>
        <h1>Your Personalized Link Hub!</h1>
        <h2>Are you tired of sharing multiple links on your social media profiles or business cards? Want a simple and elegant solution to consolidate all your important links in one place?</h2>

        <button className="cssbuttons-io-button" onClick={() => navigate(props.authToken === null ? "/sign_in" : "/edit")}>


          Create Your LinkTree
          <div className="icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"></path></svg>
          </div>
        </button>
        <h1>Link Tree Template</h1>
      </div>
      <ViewTree />

    </>
  )
}

export default Home