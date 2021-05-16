import React, { useEffect, useState } from 'react';
import HomeBlogItemList from '../components/HomeBlogItemList';
import axios from 'axios';

export default function MyBlogs() {
  
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get('/blog/my')
    .then(res => setBlogs(res.data))
    .catch(err => console.log(err.response.data))
  }, [])

  return (
    <React.Fragment>
      <HomeBlogItemList blogs={blogs} myblog={true} />
    </React.Fragment>
  );
}