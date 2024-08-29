import React from 'react'
import Signin from './Signin'

const Home = () => {
  return (
    <div>
     <p className='p-3'>Hi, I'm Rahul Kumar Parida. I recently completed my Master’s in Computer Applications (MCA). With two years of hands-on experience in full-stack development, I excel in the MERN stack (MongoDB, Express.js, React.js, Node.js) and have a strong background in Java and Data Structures & Algorithms (DSA). My experience with Git further complements my technical skills.

Based in Bhubaneswar, I am actively seeking full-time opportunities to leverage my expertise in building scalable and efficient web applications. I am eager to contribute to innovative projects and tackle complex challenges in the tech industry.

Connect with me on LinkedIn and explore my work on GitHub.</p>


<h1 className='p-3 text-xl font-semibold'>Default--admin@gmail.com</h1>
<h2 className='p-3 text-xl font-semibold'>Password -- 12345678</h2>
    <Signin/>

  
    </div>
  )
}

export default Home
