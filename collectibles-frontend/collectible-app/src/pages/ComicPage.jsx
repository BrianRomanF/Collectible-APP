import { useState, useEffect } from "react";
import { useParams } from "react-router";
import useUser from "../hooks/useUser";
import axios from "axios";
import ComicCard from "../components/ComicCard";

const ComicPage = () => {
  const { collectibleType, name } = useParams();
  const [comicsInfo, setComicInfo] = useState([]);
  const { user } = useUser();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (user) {
      setUserId(user.email);
      loadComicsInfo();
    }
  }, [collectibleType, user]);

  const loadComicsInfo = async () => {
    
    const response = await axios.post(
      `http://localhost:3000/api/user/getCollectiblesByName/${collectibleType}/${name}`,
      { userId: user?.email }
    );
    const newComicsInfo = response.data;
    const sortedComic = newComicsInfo.sort((a, b) => a.issue - b.issue);
    setComicInfo(sortedComic);
  };

  return (
    <div>
      <h1>{name.toUpperCase()}</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {comicsInfo.map((comic, index) => (
          <div key={index} style={{ margin: "10px" }}>
            <ComicCard comic={comic} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComicPage;
