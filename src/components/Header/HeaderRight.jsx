import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logoutUser } from '../../redux/apiCalls/authApiCall'
import styled from 'styled-components'

const HeaderRightContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 15px;

	@media (max-width: 768px) {
		gap: 10px;
	}
`

const HeaderRightLink = styled(Link)`
	color: #e0e0e0;
	text-decoration: none;
	font-size: 16px;
	font-weight: 500;
	display: flex;
	align-items: center;
	gap: 8px;
	padding: 8px 12px;
	border-radius: 10px;
	transition: 0.3s ease;

	&:hover {
		background-color: rgba(255, 255, 255, 0.25);
		color: #ffffff;
	}

	i {
		font-size: 14px;
	}

	@media (max-width: 768px) {
		padding: 8px 10px;
	}

	@media (max-width: 520px) {
		span {
			display: none;
		}

		i {
			font-size: 18px;
		}
	}
`

const UserInfoContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
	position: relative;
	cursor: pointer;
`

const Username = styled.span`
	color: #e0e0e0;
	font-weight: 500;

	@media (max-width: 520px) {
		display: none;
	}
`

const UserPhoto = styled.img`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	object-fit: cover;
	border: 2px solid rgba(255, 255, 255, 0.2);
	transition: 0.3s ease;

	&:hover {
		transform: scale(1.05);
	}
`

const Dropdown = styled.div`
	position: absolute;
	top: 100%;
	right: 0;
	background: rgba(255, 255, 255, 0.15);
	backdrop-filter: blur(10px);
	border-radius: 10px;
	padding: 10px;
	min-width: 150px;
	box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
	z-index: 100;
`

const DropdownItem = styled(Link)`
	color: #e0e0e0;
	padding: 8px 12px;
	border-radius: 8px;
	display: flex;
	align-items: center;
	gap: 8px;
	text-decoration: none;
	transition: 0.3s ease;

	&:hover {
		background-color: rgba(255, 255, 255, 0.25);
		color: #ffffff;
	}

	i {
		font-size: 14px;
	}
`

const LogoutItem = styled.div`
	color: #e0e0e0;
	padding: 8px 12px;
	border-radius: 8px;
	display: flex;
	align-items: center;
	gap: 8px;
	text-decoration: none;
	transition: 0.3s ease;
	cursor: pointer;

	&:hover {
		background-color: rgba(255, 255, 255, 0.25);
		color: #ffffff;
	}

	i {
		font-size: 14px;
	}
`

const HeaderRight = () => {
	const nav = useNavigate()
	const { user } = useSelector((state) => state.auth)
	const [dropDown, setDown] = useState(false)
	const dispatch = useDispatch()

	const logoutHandler = () => {
		dispatch(logoutUser())
		nav('/login')
		setDown(false)
	}

	return (
		<HeaderRightContainer>
			{user ? (
				<UserInfoContainer>
					<Username onClick={() => setDown((prev) => !prev)}>
						{user?.username}
					</Username>
					<UserPhoto
						src={user?.profilePhoto.url}
						alt={user.username}
						onClick={() => setDown((prev) => !prev)}
					/>
					{dropDown && (
						<Dropdown>
							<DropdownItem
								to={`/profile/${user?._id}`}
								onClick={() => setDown(false)}>
								<i className="fa-solid fa-user"></i>
								<span>Profile</span>
							</DropdownItem>
							<LogoutItem onClick={logoutHandler}>
								<i className="fa-solid fa-circle-left"></i>
								<span>Logout</span>
							</LogoutItem>
						</Dropdown>
					)}
				</UserInfoContainer>
			) : (
				<>
					<HeaderRightLink to="/login">
						<i className="bi bi-box-arrow-in-right"></i>
						<span>Login</span>
					</HeaderRightLink>
					<HeaderRightLink to="/register">
						<i className="bi bi-person-plus"></i>
						<span>Register</span>
					</HeaderRightLink>
				</>
			)}
		</HeaderRightContainer>
	)
}

export default HeaderRight
