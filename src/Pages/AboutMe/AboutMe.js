import "./AboutMe.css";
import { useState, useEffect } from "react";
import PageHeader from "../../Components/PageHeader";
import { trackPageView } from "../../Common/Analytics";
import { isMobileDevice } from "../../Common/Utils";
import { getBlogData } from "../../Common/Api";
import sanitize from "sanitize-html";
import { MiniRoundCard, Image } from "../../Components/Common/Common";
import { SOCIAL_MEDIA_DATA_GRAPHQL_QUERY } from "../../Common/GraphQL";

const AboutMePage = () => {
  const [mediaData, setMediaData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const PAGE_TITLE = "About Me";
    document.title = PAGE_TITLE;
    trackPageView(PAGE_TITLE);
    setLoading(true);
    getBlogData(SOCIAL_MEDIA_DATA_GRAPHQL_QUERY)
      .then((data) => {
        setLoading(false);
        setMediaData(data);
      })
      .catch((error) => {
        console.error("Error fetching portfolio data:", error);
      });
  }, []);

  return (
    <PageHeader>
      <div class={`d-flex flex-row social-media-container justify-content-center mt-4 mb-2`}>
        { loading && 
            <div class="mx-auto">
              <div class="spinner-border" role="status" />
            </div>
        }
        { mediaData?.contacts.map((contact, index) => {
            return (
              <MiniRoundCard 
                key={index} 
                style={{ 'max-width': `${isMobileDevice() ? '20vw' : '10vw'}`}}
                className="m-3"
              >
                <Image 
                  src={contact.mediaImage.url} 
                  className="card-img-top social-media-icon mx-auto"
                  width={contact.mediaImage.width}
                  height={contact.mediaImage.height}
                />
              </MiniRoundCard>
            );
          }) 
        }
      </div>
    </PageHeader>
  );
}

export default AboutMePage;
