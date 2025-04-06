import './Home.css';
import { useEffect, useState } from 'react';
import Me from "../../Images/me.png";
import Meditation from "../../Images/meditation.png";
import Laugh from "../../Images/laugh.png";
import Surprise from "../../Images/surprise.png";
import Thinking from "../../Images/thinking.png";
import PageHeader from '../../Components/PageHeader';
import { getSpecialTextColorClass, splitStringUsingRegex } from '../../Common/Utils';
import { trackPageView } from '../../Common/Analytics';
import { motion } from 'framer-motion';

const charVariants = {
  hidden: { opacity: 0 },
  reveal: { opacity: 1 },
}

const MotionShow = ({ text, textStyle, className }) => (
  <motion.div 
    className={className} 
    initial="hidden"
    whileInView="reveal"
    transition={{ staggerChildren: 0.02 }}
  >
    {text.map((char) => (
      <motion.span 
        key={char}
        style={textStyle}
        transition={{ duration: 0.5 }} 
        variants={charVariants}
      >
        {char}
      </motion.span>
    ))}
  </motion.div>
)

const HomePage = () => {
	const title = splitStringUsingRegex("Hi there! I'm");
	const name = splitStringUsingRegex("Prathamesh 👋");
	const jobTitle = splitStringUsingRegex("Full-Stack Developer @ Suncorp Group");
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
						<MotionShow text={title} className="title-size mb-0" />
            <MotionShow text={name} className="large-heading mb-0" />
            <MotionShow text={jobTitle} textStyle={getSpecialTextColorClass()} className="job-title-size mt-2" />
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
