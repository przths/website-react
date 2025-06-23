import "./AboutMe.css";
import { useEffect } from "react";
import { trackPageView } from "../../Common/Analytics";
import { getAboutMeThemeColor, isMobileDevice } from "../../Common/Utils";
import sanitize from "sanitize-html";
import { RoundCard, MiniRoundCard, Image } from "../../Components/Common/Common";

const AboutMePage = ({ aboutMeData }) => {
  useEffect(() => {
    const PAGE_TITLE = "About Me";
    document.title = PAGE_TITLE;
    trackPageView(PAGE_TITLE);
  }, []);

  return (
    <div className="d-flex flex-direction mt-3 pb-4 mb-2">
      { !aboutMeData && 
        <div class="mx-auto">
          <div class="spinner-border" role="status" />
        </div>
      }
      { aboutMeData &&
        <RoundCard 
          style={{ 'width': `${isMobileDevice() ? '90vw' : '50vw'}`, }} 
          className="mx-auto"
          backgroundColor={getAboutMeThemeColor()}
        >
          <Image
            src={aboutMeData.posts[0].coverPhoto.url} 
            className="card-img-top mx-auto" 
            width={aboutMeData.posts[0].coverPhoto.width}
            height={aboutMeData.posts[0].coverPhoto.height}
            maxWidth = '60%'
          />
          <div class="mt-4">
            <h3 className="mb-4">
              <strong>{aboutMeData.posts[0].title}</strong>
            </h3>
            <p dangerouslySetInnerHTML={{__html: sanitize(aboutMeData.posts[0].content.html)}} />
            <div class={`d-flex flex-row justify-content-start mt-4`}>
              { aboutMeData?.contacts.map((contact, index) => {
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
