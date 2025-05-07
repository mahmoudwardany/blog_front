import { Link } from 'react-router-dom'
import styled from 'styled-components'

const HeaderLeftContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 20px;
`

const HeaderLogo = styled(Link)`
	color: #ffffff;
	font-size: 24px;
	text-decoration: none;
	font-weight: bold;
	display: flex;
	align-items: center;
	gap: 8px;
	transition: 0.3s ease;

	&:hover {
		opacity: 0.9;
		transform: scale(1.02);
	}

	@media (max-width: 520px) {
		font-size: 20px;
	}
`

const HeaderMenu = styled.div`
	color: #ffffff;
	font-size: 24px;
	cursor: pointer;
	display: none;
	transition: 0.3s ease;

	&:hover {
		transform: scale(1.1);
	}

	@media (max-width: 768px) {
		display: block;
	}
`

const HeaderLeft = ({ setToggle, toggle }) => {
	return (
		<HeaderLeftContainer>
			<HeaderLogo to="/">
				<strong>BLOG</strong> <i className="fa-solid fa-pencil"></i>
			</HeaderLogo>
			<HeaderMenu onClick={() => setToggle((prev) => !prev)}>
				{toggle ? (
					<i className="bi bi-x-lg"></i>
				) : (
					<i className="bi bi-list"></i>
				)}
			</HeaderMenu>
		</HeaderLeftContainer>
	)
}

export default HeaderLeft
