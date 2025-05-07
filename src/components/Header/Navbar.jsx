import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const NavbarContainer = styled.nav`
	background: linear-gradient(135deg, #667eea, #764ba2);
	backdrop-filter: blur(10px);
	transition: all 0.3s ease;

	@media (max-width: 768px) {
		position: fixed;
		top: 70px;
		left: 0;
		width: 100%;
		clip-path: ${({ toggle }) =>
			toggle
				? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
				: 'polygon(0 0, 100% 0, 100% 0, 0 0)'};
	}
`

const NavLinks = styled.ul`
	display: flex;
	align-items: center;
	gap: 20px;
	margin: 0;
	padding: 0;
	list-style: none;

	@media (max-width: 768px) {
		flex-direction: column;
		padding: 20px;
		gap: 15px;
		align-items: flex-start;
	}
`

const NavLink = styled(Link)`
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
		transform: scale(1.02);
	}

	i {
		font-size: 14px;
	}

	@media (max-width: 768px) {
		width: 100%;
		padding: 12px 15px;
	}
`

const Navbar = ({ toggle, setToggle }) => {
	const { user } = useSelector((state) => state.auth)

	return (
		<NavbarContainer toggle={toggle}>
			<NavLinks>
				<NavLink onClick={() => setToggle(false)} to="/">
					<i className="fa-solid fa-house"></i>
					Home
				</NavLink>
				<NavLink onClick={() => setToggle(false)} to="/posts">
					<i className="fa-solid fa-note-sticky"></i>
					Posts
				</NavLink>
				<NavLink onClick={() => setToggle(false)} to="/posts/create">
					<i className="fa-solid fa-book"></i>
					Create
				</NavLink>
				{user?.isAdmin && (
					<NavLink onClick={() => setToggle(false)} to="/admin">
						<i className="fa-solid fa-user-check"></i>
						Admin Dashboard
					</NavLink>
				)}
			</NavLinks>
		</NavbarContainer>
	)
}

export default Navbar
