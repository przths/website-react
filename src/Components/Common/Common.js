import "./Common.css";
import { formatTimestamp, getThemeColor } from "../../Common/Utils";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { isMobileDevice } from "../../Common/Utils";

export const Image = ({ src, className, width, height, maxWidth = '100%' }) => {
  return (
    <img 
      src={src} 
      class={className}
      width={width}
      height={height}
      style={{ 'width': maxWidth, 'height': 'auto' }}
      rel="preload"
      loading="lazy"
      decoding="async"
      fetchPriority="high"
      alt="presentation-image" 
    />
  ); 
}

export const BlogCard = ({ key, postData }) => {
    const navigate = useNavigate();
    return (
      <MiniRoundCard 
        key={key}
        class="mb-5" 
        style={{ 'max-width': `${isMobileDevice() ? '95vw' : '38vw'}`, }} 
        backgroundColor={getThemeColor()}
        onClick={() => postData.slug && navigate(`/blog/${postData.slug}`)}
      >
          <Image 
            src={postData.coverPhoto.url} 
            className="card-img-top blog-card-img-small loading" 
            width={postData.coverPhoto.width}
            height={postData.coverPhoto.height}
          />
          <div class="mt-4 card-body">
            <h5 class="card-title mb-3">{postData.title}</h5>
            <p class="card-text">{postData.summary}</p> 
            <p class="card-text">
              <small class="text-muted">
                Published: {formatTimestamp(postData.publishDate)}
              </small>
            </p>
          </div>
      </MiniRoundCard>
    );
}


export const MiniRoundCard = styled.div`
  display: flex;
  flex-direction: column;
  margin: 18px;
  padding: 20px;
  border-radius: 30px;
  box-shadow: 4px 4px 12px 4px rgba(0,0,0,0.2);
  color: black;
  background: ${props => props.backgroundColor};
  text-shadow: 0.5px 0.5px 0.5px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: translateY(-4px) scale(1.01);
    box-shadow: 6px 6px 12px 6px rgba(0, 0, 0, 0.25);
  }
  @media (max-width: 450px) {
    padding: 20px;
    border-radius: 30px;
  }
`;

export const RoundCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px;
  border-radius: 50px;
  color: black;
  background: ${props => props.backgroundColor};
  box-shadow: 4px 4px 12px 4px rgba(0,0,0,0.2);
  transition: 0.3s;
  @media (max-width: 450px) {
    padding: 20px;
    border-radius: 30px;
  }
  &:hover {
    transform: translateY(-4px) scale(1.01);
    box-shadow: 6px 6px 12px 6px rgba(0, 0, 0, 0.25);
  }
`;
