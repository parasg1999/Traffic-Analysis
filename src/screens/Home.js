import React, { useEffect, useState } from 'react';
import HomeBlogItemList from '../components/HomeBlogItemList';

export default function Home() {
  
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get('/blog')
    .then(res => setBlogs(res.data))
    .catch(err => console.log(err.response.data))
  }, [])

  return (
    <React.Fragment>
      {/* <Imgs /> */}
      <HomeBlogItemList blogs={blogs} />
    </React.Fragment>
  );
}