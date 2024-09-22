import React from "react";
import Post from "./Post";

const posts = [
  {
    id: 1,
    title: "Getting Started with React",
    content: "React is a powerful library for building user interfaces...",
  },
  {
    id: 2,
    title: "Understanding JavaScript Closures",
    content: "Closures are an important concept in JavaScript...",
  },
  {
    id: 3,
    title: "Introduction to Redux",
    content: "Redux is a state management library...",
  },
];

const PostList = () => {
  return (
    <div className="post-list">
      {posts.map((post) => (
        <Post key={post.id} title={post.title} content={post.content} />
      ))}
    </div>
  );
};

export default PostList;
