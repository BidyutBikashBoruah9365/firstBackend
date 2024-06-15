import React, { useEffect, useState } from "react";

const Home = () => {
  //http://localhost:5000/api/blog
  const [postData, setPostData] = useState([]);
  console.log("postData", postData);
  useEffect(async () => {
    const response = await fetch("http://localhost:5000/api/blog")
    const data = await response.json()
    console.log({data})
  }, []);
  return <div>Home is the component</div>;
};

export default Home;
