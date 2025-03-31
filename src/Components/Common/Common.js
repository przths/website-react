import "./Common.css";
import { formatTimestamp } from "../../Common/Utils";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { isMobileDevice } from "../../Common/Utils";

export const Card = ({ imageSrc, title, body, href, publishDate }) => {
    return (
        <div class="card portfolio-card">
            <div class="d-flex justify-content-center">
                <img src={imageSrc} class="col-md-2 my-auto project-img" alt="..."/>
                <div class="col-md-6">
                    <div class="card-body">
                        <h5 class="card-title">{title}</h5>
                        <p class="card-text">{body}</p>
                        { href && 
                            <a href={href} target="_blank" rel="noreferrer" class="card-link">
                                GitHub Repository
                            </a> 
                        }
                        { publishDate && 
                            <p class="card-text">
                                <small class="text-muted">
                                    { publishDate }
                                </small>
                            </p> 
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export const BlogCard = ({ imageSrc, title, body, slug, publishDate }) => {
    const navigate = useNavigate();
    return (
        <MiniRoundCard class="mb-5" style={{ 'max-width': `${isMobileDevice() ? '95vw' : '38vw'}`, }} onClick={() => slug && navigate(`/blog/${slug}`)}>
            <img src={imageSrc} class="card-img-top blog-card-img-small loading" alt="..." />
            <div class="mt-4 card-body">
                <h5 class="card-title">{title}</h5>
                <p class="card-text">{body}</p> 
                <p class="card-text"><small class="text-muted">Published: {formatTimestamp(publishDate)}</small></p>
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
  background-color: white;
  box-shadow: 4px 4px 12px 4px rgba(0,0,0,0.2);
  transition: 0.3s;
  @media (max-width: 450px) {
    padding: 20px;
    border-radius: 30px;
  }
`;

export const RoundCard = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  padding: 40px;
  border-radius: 50px;
  background-color: white;
  box-shadow: 4px 4px 12px 4px rgba(0,0,0,0.2);
  transition: 0.3s;
  @media (max-width: 450px) {
    padding: 20px;
    border-radius: 30px;
  }
`;
