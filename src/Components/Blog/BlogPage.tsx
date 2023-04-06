import { useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

import blogPosts, { blankPost } from ".";
import "./blog.css";
import { generateKey } from "../../utils";

const BlogPage = () => {
  const [viewingPost, setViewingPost] = useState(blankPost);

  return (
    <div id="blog">
      <section className="blog-post-thumbnails">
        {blogPosts.map((p, i) => (
          <div
            className="blog-thumb"
            key={generateKey(`blog-thumb-${i}`)}
            onClick={() =>
              viewingPost === p ? setViewingPost(blankPost) : setViewingPost(p)
            }
          >
            <img src={p.image} alt={p.alt} className="blog-thumb-image" />
            <h3 className="thumb-title">{p.title}</h3>
          </div>
        ))}
      </section>
      {!!viewingPost.post && (
        <section className="blog-post">
          <img
            src={viewingPost.image}
            alt={viewingPost.alt}
            className="post-cover"
          />
          <h4>Posted: {viewingPost.date}</h4>
          <ReactMarkdown children={viewingPost.post} className="post-content" />
        </section>
      )}
    </div>
  );
};

export default BlogPage;
