import "./Common.css";
import { formatTimestamp } from "../../Common/Utils";
import { useNavigate } from "react-router-dom";
import sanitize from "sanitize-html";

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
                            <a href={href} target="_blank" class="card-link">
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

export const BlogCard = ({ imageSrc, title, body, isBodyHTML = false, slug, publishDate }) => {
    const navigate = useNavigate();
    return (
        <button class="card blog-card-container mb-5" onClick={() => slug && navigate(`/blog/${slug}`)}>
            <img src={imageSrc} class="card-img-top loading" alt="..." />
            <div class="card-body">
                <h5 class="card-title">{title}</h5>
                { isBodyHTML ? 
                    <p class="card-text" dangerouslySetInnerHTML={{__html: sanitize(body)}} /> : 
                    <p class="card-text">{body}</p> 
                }
                <p class="card-text"><small class="text-muted">Published: {formatTimestamp(publishDate)}</small></p>
            </div>
        </button>
    );
}
