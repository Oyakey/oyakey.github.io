import { createElement, useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {

  const [posts, setPosts] = useState([]);
  
  const array = [];

  for (var i = 0; i < 3; i++) array.push(
    <div className='rounded-2xl shadow-lg py-5'>
      <div className="rounded-full w-12 h-12 bg-neutral-300 animate-pulse mx-5 mb-5"></div>
      <div className="w-full aspect-video bg-neutral-300 animate-pulse mb-5"></div>
      <div className='mx-auto mb-7 rounded-full w-3/5 h-7 bg-neutral-300 animate-pulse'></div>
      <div className='mx-5 space-y-4'>
        <div className='rounded-full w-full h-5 bg-neutral-300 animate-pulse'></div>
        <div className='rounded-full w-4/5 h-5 bg-neutral-300 animate-pulse'></div>
        {/* <div className='rounded-xl mx-auto w-4/5 aspect-video bg-neutral-300 animate-pulse'></div> */}
        <div className='rounded-full w-full h-5 bg-neutral-300 animate-pulse'></div>
        <div className='rounded-full w-4/5 h-5 bg-neutral-300 animate-pulse'></div>
        <div className='rounded-full w-full h-5 bg-neutral-300 animate-pulse'></div>
      </div>
    </div>
  );
  const [postsNodes, setPostsNodes] = useState(array);

  const fetchData = () => {
    fetch('https://public-api.wordpress.com/rest/v1.1/sites/oyakey2.wordpress.com/posts')
    .then(response => { return response.json() })
    .then(data => { 
      setPosts(data.posts)
      loadPost(data.posts);
    })
  }

  const loadPost = async (posts) => {
    const asyncPosts = [];
    posts.forEach(post =>
      asyncPosts.push(
        <div className='rounded-2xl md:shadow-lg py-5 md:dark:bg-neutral-800'>
          <div className='flex items-center gap-4 mb-5 px-5'>
            <div className='relative'>
              <img src={post.author.avatar_URL} className="rounded-full w-12 h-12"/>
              <div className='bg-green-400 h-5 w-5 rounded-full border-[4px]
              border-white md:dark:border-neutral-800 dark:border-neutral-900 absolute -right-1 -bottom-1'></div>
            </div>
            <p className='text-lg font-bold'>{post.author.name}</p>
          </div>
          <img src={post.featured_image || 'https://via.placeholder.com/200x300'} className="w-full aspect-video object-cover mb-5"></img>
          <h2 className='font-bold text-xl mb-5'>{post.title}</h2>
          <p className='px-5' dangerouslySetInnerHTML={ {__html: post.content} }></p>
        </div>
      )
    );
    setPostsNodes(asyncPosts);
}

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className="App dark:bg-neutral-900 dark:text-white">
      <div className='mx-5'>
        <div className="container mx-auto text-center pt-40">
          <h1 className='text-5xl mb-12'>Headless</h1>
          <div className="mb-12">
            <p>
              There is { posts.length || 0 } found posts.
            </p>
          </div>
        </div>
      </div>
      <div className='md:mx-5'>
        <div className='md:container mx-auto text-center'>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:!posts-layout gap-5'>
            {postsNodes}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
