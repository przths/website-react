import { useLocation } from "react-router-dom";
import { MiniRoundCard } from "../../Components/Common/Common";
import { getThemeColor, isMobileDevice } from "../../Common/Utils";
import { Button } from "react-bootstrap";
import { Image } from "../../Components/Common/Common";
import Thinking from "../../Images/thinking.png";
import "../Blog/Blog.css";
import { sanitizeText } from "../../Common/Utils";

const UnsubscribePage = () => {
  const urlParams = new URLSearchParams(useLocation().search);
  const category = sanitizeText(urlParams.get('category'));
  const emailAddress = sanitizeText(urlParams.get('email'));
  const signature = sanitizeText(urlParams.get('signature'));
  
  // http://localhost:3000/website-react/#/unsubscribe?category=project&email=random@gmail.com&signature=d2ad4da985189dea315c3ae0d99ed0a101e5ec7e59d4abbe5fda6356dbcbe4c7

  return (
    <div class="d-flex flex-column justify-content-center" style={{ height: '80vh' }}>
      <MiniRoundCard 
        style={{ 'maxWidth': `${isMobileDevice() ? '90vw' : '26vw'}`}}
        className="mx-auto my-auto"
        backgroundColor={getThemeColor()}
        onClick={() => {}}
      >
        <Image
          src={Thinking} 
          className="blog-card-img-small"
        />
        <div className="mt-4">
          <h4 className="mb-2">
            Are you sure you want to unsubscribe?
          </h4>
          <p>
            Click on the button below to confirm your unsubscription. 
            This will remove you from my mailing list and you will no 
            longer receive updates for my <strong>{category}s</strong>.
          </p>
          <div class="d-flex card-text">
            <Button 
              variant="danger" 
              className="mt-1 mx-auto flex-fill"
            >
              Unsubscribe
            </Button>
          </div>
        </div>
      </MiniRoundCard>
    </div>
  );
}

export default UnsubscribePage;
