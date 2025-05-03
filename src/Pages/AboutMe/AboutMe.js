import "./AboutMe.css";
import { useState, useEffect } from "react";
import PageContainer from "../../Components/PageContainer";
import { trackPageView } from "../../Common/Analytics";
import { isMobileDevice } from "../../Common/Utils";
import { getBlogData } from "../../Common/Api";
import sanitize from "sanitize-html";
import { RoundCard, MiniRoundCard, Image } from "../../Components/Common/Common";
import { ABOUT_ME_DATA_GRAPHQL_QUERY } from "../../Common/GraphQL";

const AboutMePage = () => {
  const [mediaData, setMediaData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const PAGE_TITLE = "About Me";
    document.title = PAGE_TITLE;
    trackPageView(PAGE_TITLE);
    setLoading(true);
    getBlogData(ABOUT_ME_DATA_GRAPHQL_QUERY, { slug: "about-me" })
      .then((data) => {
        setLoading(false);
        setMediaData(data);
      })
      .catch((error) => {
        console.error("Error fetching portfolio data:", error);
      });
  }, []);

  return (
    <div className="d-flex flex-direction mt-3 mb-4">
      { loading && 
        <div class="mx-auto">
          <div class="spinner-border" role="status" />
        </div>
      }
      { mediaData &&
        <RoundCard 
          style={{ 'width': `${isMobileDevice() ? '90vw' : '50vw'}`, }} 
          className="mx-auto"
        >
          <Image
            src={mediaData.posts[0].coverPhoto.url} 
            className="card-img-top mx-auto" 
            width={mediaData.posts[0].coverPhoto.width}
            height={mediaData.posts[0].coverPhoto.height}
            maxWidth = '60%'
          />
          <div class="mt-4">
            <h3 className="mb-4">
              <strong>{mediaData.posts[0].title}</strong>
            </h3>
            <p dangerouslySetInnerHTML={{__html: sanitize(mediaData.posts[0].content.html)}} />
            <div class={`d-flex flex-row justify-content-start mt-4`}>
              { mediaData?.contacts.map((contact, index) => {
                  return (
                    <MiniRoundCard 
                      key={index} 
                      style={{ 
                        'width': `${isMobileDevice() ? '9%' : '4%'}`, 
                        'margin': '0px',
                        'box-shadow': '0px 0px 0px 0px rgba(0,0,0,0.2)',
                      }}
                      className="p-0 me-3"
                      onClick={() => window.open(contact.mediaLink, '_blank').focus()}
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
          </div>
        </RoundCard>
      }
    </div>
  );
}

export default AboutMePage;
