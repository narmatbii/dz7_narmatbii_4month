import { useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

export default function Post() {
  const { postId } = useParams();
  const [comment, setCommet] = useState([])
  const [load, setLoad] = useState(false)

  useEffect(() => {
    setLoad(true)
    axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        .then(res => setCommet(res.data))
        .finally(() => setLoad(false))
  }, [])

  return (
    <div>
      <h1>{postId}</h1>
      {
        load
          ?
            <h2>loading.....</h2>
            :
            comment.map(p => (
                <div>
                  <h4>name: {p.name}</h4>
                  <span>body: {p.body}</span>

                </div>

            ))
      }
    </div>
  );
}
