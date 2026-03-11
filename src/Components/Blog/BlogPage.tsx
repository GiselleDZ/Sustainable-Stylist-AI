import { useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Box, Text, Image } from "@chakra-ui/react";

import blogPosts, { blankPost } from ".";
import { generateKey } from "../../utils";

const BlogPage = () => {
  const [viewingPost, setViewingPost] = useState(blankPost);

  return (
    <Box id="blog">
      <Box
        display="flex"
        flexWrap="wrap"
        gap={4}
        justifyContent="center"
        p={4}
      >
        {blogPosts.map((p, i) => (
          <Box
            key={generateKey(`blog-thumb-${i}`)}
            onClick={() =>
              viewingPost === p ? setViewingPost(blankPost) : setViewingPost(p)
            }
            cursor="pointer"
            width="200px"
          >
            <Image
              src={p.image}
              alt={p.alt}
              width="200px"
              height="150px"
              objectFit="cover"
            />
            <Text fontWeight="600" mt={2}>
              {p.title}
            </Text>
          </Box>
        ))}
      </Box>
      {!!viewingPost.post && (
        <Box mt={6} maxW="800px" mx="auto" px={4}>
          <Image
            src={viewingPost.image}
            alt={viewingPost.alt}
            width="100%"
            objectFit="cover"
          />
          <Text mt={2}>Posted: {viewingPost.date}</Text>
          <ReactMarkdown children={viewingPost.post} className="post-content" />
        </Box>
      )}
    </Box>
  );
};

export default BlogPage;
