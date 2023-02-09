import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api";

function PostList() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [userId, setUserId] = useState(0)

  useEffect(() => {
    API.get("posts").then((response) => {
      setPosts(response.data);
      setFilteredPosts(response.data);
    });
  }, []);

  useEffect(() => {
    let filltered = posts.filter(p => {
      if (p.title.toLowerCase().includes(searchTerm.toLocaleLowerCase()) || p.body.includes(searchTerm)) return true
      else return false
    })

    let fill = userId > 0 ? filltered.filter(p => (p.userId === userId)) : filltered
    setFilteredPosts(fill)
  }, [searchTerm, userId]);

  return (
    <>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Введите заголовок"
      />
      <input type="text"
             value={userId}
             onChange={(e) => setUserId(e.target.value)}
      />
      <ul>
        {filteredPosts.map((post) => (
          <Link to={`post/${post.id}`} key={post.id}>
            <h3>Author: {post.userId},</h3>
            <h3>Title: {post.title}</h3>
            <h3>Body:  {post.body}</h3>
          </Link>
        ))}
      </ul>
    </>
  );
}

export default PostList;
