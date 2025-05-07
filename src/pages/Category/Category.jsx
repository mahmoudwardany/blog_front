import './category.css'
import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import PostList from '../../components/Post/PostList'
import { useDispatch, useSelector } from 'react-redux'
import { getPostsByCategory } from '../../redux/apiCalls/postApi'

const Category = () => {
	const { category } = useParams()
	const dispatch = useDispatch()
	const { postCat } = useSelector((state) => state.posts)

	useEffect(() => {
		dispatch(getPostsByCategory(category))
		window.scrollTo(0, 0)
	}, [dispatch, category])

	return (
		<div className="category">
			{postCat.length === 0 ? (
				<div className="category-empty">
					<h2 className="category-not-found">
						No posts found in <span>{category}</span> category
					</h2>
					<Link to="/posts" className="back-to-posts-btn">
						← Go Back to All Posts
					</Link>
				</div>
			) : (
				<>
					<h1 className="category-title">
						Showing posts in: <span>{category}</span>
					</h1>
					<PostList posts={postCat} />
				</>
			)}
		</div>
	)
}

export default Category
