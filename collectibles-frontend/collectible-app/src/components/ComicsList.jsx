import { Link } from "react-router-dom";

const ComicsList = ({comics}) => {
  return (
    <>
      {comics.map((comic) => (
        <Link
          key={comic._id + comic.collectibleName + comic.issue}
          className="article-list-item"
          to={`/comics/${comic.collectibleName}`}
        >
        <ul>
          <li>
          {comic.collectibleName}
          </li>
        </ul>
     
        </Link>
      ))}
    </>
  );
};

export default ComicsList;
