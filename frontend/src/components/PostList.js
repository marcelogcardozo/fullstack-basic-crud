import React from 'react';
import PostItem from './PostItem';
import './PostList.css';

const PostList = ({ posts, currentUser, onDelete, onEdit, onLike, onAddComment, onDeleteComment, allUsers = [] }) => {
  return (
    <div className="post-list">
      {posts.map(post => (
        <PostItem
          key={post.id}
          post={post}
          currentUser={currentUser}
          onDelete={onDelete}
          onEdit={onEdit}
          onLike={onLike}
          onAddComment={onAddComment}
          onDeleteComment={onDeleteComment}
          allUsers={allUsers}
        />
      ))}
    </div>
  );
};

export default PostList;