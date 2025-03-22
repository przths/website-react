import './Home.css';
import HomeHeader from "../Components/HomeHeader";
import { HomePageContainer } from "../Common/StyledAtoms";

const HomePage = () => {
	return (
		<HomePageContainer>
			<HomeHeader/>
			<div className='d-flex flex-row justify-content-around fill'>
				<div class="d-flex my-auto align-items-stretch">
					First Section
				</div>
				<div class="d-flex my-auto align-items-stretch">
					First Section
				</div>
			</div>
		</HomePageContainer>
	);
}

export default HomePage;
