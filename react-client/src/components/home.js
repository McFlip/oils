import React from "react";
import Menu from "./menu";

const Home = () =>{
  return (
    <div>
      <Menu page='home' />
      <div className='iframe-container'>
        <iframe
          src='http://mcflip.github.io/oils/'
          name='gh-pages'
        />
      </div>
    </div>
  );
}

export default Home;
