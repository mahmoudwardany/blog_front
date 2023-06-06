import "./category.css";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import PostList from "../../components/Post/PostList";
import { useDispatch, useSelector } from "react-redux";
import { getPostsByCategory } from "../../redux/apiCalls/postApi";

const Category = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const { postCat } = useSelector((state) => state.posts);
  useEffect(() => {
    dispatch(getPostsByCategory(category));
    window.scrollTo(0, 0);
  }, [dispatch, category]);
  return (
    <div className="category">
      {postCat.length === 0 ? (
        <>
          <h1 className="category-not-found">
            Posts with <span>{category}</span> category Not Found
          </h1>
          <div className="category-not-found-link">
            <Link to={"/posts"}>Back to Posts Page</Link>
          </div>
        </>
      ) : (
        <>
          <h1 className="category-title">Posts based on {category}</h1>
          <PostList posts={postCat} />
        </>
      )}
    </div>
  );
};

export default Category;
