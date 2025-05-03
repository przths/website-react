import './Home.css';
import { useEffect, useState } from 'react';
import Me from "../../Images/me.png";
import Meditation from "../../Images/meditation.png";
import Laugh from "../../Images/laugh.png";
import Surprise from "../../Images/surprise.png";
import Thinking from "../../Images/thinking.png";
import { getSpecialTextColorClass, splitStringUsingRegex } from '../../Common/Utils';
import { trackPageView } from '../../Common/Analytics';
import { motion } from 'framer-motion';

const charVariants = {
  hidden: { opacity: 0 },
  reveal: { opacity: 1 },
}

const MotionShow = ({ text }) => (
  <motion.div  
    initial="hidden"
    whileInView="reveal"
    transition={{ staggerChildren: 0.04 }}
  >
    {text.map(({ character, className, textStyle }, index) =>
      character === 'BREAK' ? (
        <br key={index} />
      ) : (
        <motion.span
          key={index}
          className={className}
          variants={charVariants}
          transition={{ duration: 0.5 }}
          style={textStyle}
        >
          {character}
        </motion.span>
      )
    )}
  </motion.div>
)

const HomePage = () => {
	let title = splitStringUsingRegex("Hi there! I'm", "title-size mb-0");
  title.push({ character: 'BREAK' });

	let name = splitStringUsingRegex("Prathamesh 👋", "large-heading mb-0");
  name.push({ character: 'BREAK' });
	
  let jobTitle = splitStringUsingRegex("Full-Stack Developer @ Suncorp Group", "job-title-size mt-2", getSpecialTextColorClass());
  const motionText = title.concat(name).concat(jobTitle);
	const [selectedImage, setSelectedImage] = useState(null);

	useEffect(() => {
    const PAGE_TITLE = "Home";
    document.title = PAGE_TITLE;
    trackPageView(PAGE_TITLE);
		const choices = [Me, Meditation, Laugh, Surprise, Thinking];
		const selection = choices[Math.floor(Math.random() * choices.length)];
		if (selection !== selectedImage) {
			setSelectedImage(selection);
		}
    // eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
    <div class='d-flex flex-direction justify-content-around fill'>
      <div class="mx-auto my-auto text-section">
        <div class='d-flex flex-column left-section text-alignment'>
          <MotionShow text={motionText} />
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
	);
}

export default HomePage;
