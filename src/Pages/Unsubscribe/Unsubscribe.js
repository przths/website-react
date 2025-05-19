import { useState } from "react";
import { useLocation } from "react-router-dom";
import { MiniRoundCard } from "../../Components/Common/Common";
import { getThemeColor, isMobileDevice } from "../../Common/Utils";
import { Button } from "react-bootstrap";
import { Image } from "../../Components/Common/Common";
import Thinking from "../../Images/thinking.png";
import "../Blog/Blog.css";
import { sanitizeText } from "../../Common/Utils";
import { useEffect } from "react";
import { trackPageView } from "../../Common/Analytics";
import { postRequest } from "../../Common/Api";
import { HYDRA_API_UNSUBSCRIBE_URL } from "../../Common/Endpoints";

const UnsubscribePage = () => {
  const urlParams = new URLSearchParams(useLocation().search);
  const category = sanitizeText(urlParams.get('category'));
  const emailAddress = sanitizeText(urlParams.get('email'));
  const signature = sanitizeText(urlParams.get('signature'));
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const PAGE_TITLE = "Unsubscribe";
    document.title = PAGE_TITLE;
    trackPageView(PAGE_TITLE);
  }, []);

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
              variant={response && response.status === 200 ? "success" : "danger"}
              className="mt-1 mx-auto flex-fill"
              disabled={loading}
              onClick={async () => {
                setLoading(true);
                const requestBody = {
                  email: emailAddress,
                  category: category,
                  signature: signature,
                };
                const response = await postRequest(HYDRA_API_UNSUBSCRIBE_URL, requestBody);
                const data = await response.json();
                setResponse({
                  message: data.message.trim(),
                  status: response.status,
                });
              }}
            >
              { loading && !response ? 
                <div class="spinner-border spinner-border-sm" role="status" /> : 
                response ?
                  <span>
                    {response.message.slice(0, -1)} {response.status === 200 ? "✅" : "😵"}
                  </span> : "Unsubscribe"
              }
            </Button>
          </div>
        </div>
      </MiniRoundCard>
    </div>
  );
}

export default UnsubscribePage;
