import './Home.css';
import ReactGA from "react-ga4";
import { useEffect, useState } from 'react';
import Me from "../../Images/me.png";
import Meditation from "../../Images/meditation.png";
import Laugh from "../../Images/laugh.png";
import Surprise from "../../Images/surprise.png";
import Thinking from "../../Images/thinking.png";
import PageHeader from '../../Components/PageHeader';
import { isMobileDevice } from '../../Common/Utils';
import { trackPageView } from '../../Common/Analytics';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, text, speed]);

  return <div class={textClass}>{displayedText}</div>;
};

const HomePage = () => {
	const TYPING_SPEED = 50;
	const title = "Hi there! I'm";
	const name = "Prathamesh.";
	const jobTitle = "Full-Stack Developer @ Suncorp Group";
	const [displayedTitle, setDisplatedTitle] = useState("");
	const [displayedName, setDisplatedName] = useState("");
	const [displayedJobTitle, setDisplatedJobTitle] = useState("");
	const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const PAGE_TITLE = "Home";
    document.title = PAGE_TITLE;
    trackPageView(PAGE_TITLE);
  }, []);

	useEffect(() => {
		const choices = [Me, Meditation, Laugh, Surprise, Thinking];
		const selection = choices[Math.floor(Math.random() * choices.length)];
		if (selection !== selectedImage) {
			setSelectedImage(selection);
		}
    // eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<PageHeader>
			<div class='d-flex flex-direction justify-content-around fill'>
				<div class="mx-auto my-auto text-section">
					<div class='d-flex flex-column left-section text-alignment'>
						<div class="title-size mb-0">
							<TypewriterEffect 
								text={title}
								displayedText={displayedTitle} 
								setDisplayedText={setDisplatedTitle} 
								speed={TYPING_SPEED} 
							/>
						</div>
						<div class='large-heading mb-0'>
              { (title === displayedTitle) &&
                <TypewriterEffect 
                  text={name} 
                  displayedText={displayedName} 
                  setDisplayedText={setDisplatedName} 
                  speed={TYPING_SPEED} 
                />
              }
						</div>
						<strong class={`title-size ${isMobileDevice() ? "mt-2" : "mt-2"}`}>
              { (name === displayedName) &&
                <TypewriterEffect 
                  text={jobTitle} 
                  textClass="green-text"
                  displayedText={displayedJobTitle} 
                  setDisplayedText={setDisplatedJobTitle} 
                  speed={TYPING_SPEED} 
                />
              }
            </strong>
					</div>
				</div>
				<div class="mx-auto my-auto">
					{selectedImage && 
						<img
							src={selectedImage}
							className="image-size d-inline-block align-top"
							alt="React Bootstrap logo"
						/>
					}
				</div>
			</div>
		</PageHeader>
	);
}

export default HomePage;
