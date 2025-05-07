import { useState } from 'react'
import Navbar from './Navbar'
import HeaderLeft from './HeaderLeft'
import HeaderRight from './HeaderRight'
import styled from 'styled-components'

const HeaderContainer = styled.header`
	background: linear-gradient(135deg, #667eea, #764ba2);
	backdrop-filter: blur(10px);
	box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
	padding: 15px 30px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: sticky;
	top: 0;
	z-index: 1000;
	border-radius: 0 0 20px 20px;

	@media (max-width: 768px) {
		padding: 15px 20px;
		border-radius: 0;
	}
`

const Header = () => {
	const [toggle, setToggle] = useState(false)

	return (
		<HeaderContainer>
			<HeaderLeft toggle={toggle} setToggle={setToggle} />
			<Navbar toggle={toggle} setToggle={setToggle} />
			<HeaderRight />
		</HeaderContainer>
	)
}

export default Header
