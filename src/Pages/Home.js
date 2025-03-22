import './Home.css';
import { useEffect, useState } from 'react';
import HomeHeader from "../Components/HomeHeader";
import { HomePageContainer } from "../Common/StyledAtoms";
import LaptopMe from "../Images/laptop.png";

const TypewriterEffect = ({ text, textClass, displayedText, setDisplayedText, speed = 100 }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    }
  }, [index, text, speed]);

  return <div class={textClass}>{displayedText}</div>;
};

const HomePage = () => {
	const TYPING_SPEED = 50;
	const title = "Hi there! I'm";
	const name = "Prathamesh";
	const lastName = "Jagtap";
	const jobTitle = "Full-Stack Developer @ Suncorp Group";
	const [displayedTitle, setDisplatedTitle] = useState("");
	const [displayedName, setDisplatedName] = useState("");
	const [displayedLastName, setDisplatedLastName] = useState("");
	const [displayedJobTitle, setDisplatedJobTitle] = useState("");

	return (
		<HomePageContainer>
			<HomeHeader/>
			<div class='d-flex flex-row justify-content-around fill'>
				<div class="d-flex my-auto align-items-stretch">
					<div class='d-flex flex-column'>
						<p>
							<TypewriterEffect 
								text={title} 
								displayedText={displayedTitle} 
								setDisplayedText={setDisplatedTitle} 
								speed={TYPING_SPEED} 
							/>
						</p>
						<h1>
							<strong class='large-heading'>
								{ (title === displayedTitle) &&
									<TypewriterEffect 
										text={name} 
										displayedText={displayedName} 
										setDisplayedText={setDisplatedName} 
										speed={TYPING_SPEED} 
									/>
								}
							</strong>
						</h1>
						<h1>
							<strong class='large-heading'>
								{ (name === displayedName) &&
									<TypewriterEffect 
										text={lastName} 
										displayedText={displayedLastName} 
										setDisplayedText={setDisplatedLastName} 
										speed={TYPING_SPEED} 
									/>
								}
							</strong>
						</h1>
						<h3 class="mt-4">
							{ (lastName === displayedLastName) &&
								<TypewriterEffect 
									text={jobTitle} 
									textClass="green-text"
									displayedText={displayedJobTitle} 
									setDisplayedText={setDisplatedJobTitle} 
									speed={TYPING_SPEED} 
								/>
							}
						</h3>
					</div>
				</div>
				<div class="d-flex my-auto align-items-stretch">
					<img
						src={LaptopMe}
						width="450"
						height="450"
						className="d-inline-block align-top"
						alt="React Bootstrap logo"
					/>
				</div>
			</div>
		</HomePageContainer>
	);
}

export default HomePage;
