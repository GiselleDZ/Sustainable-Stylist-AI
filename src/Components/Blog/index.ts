import { capsuleWardrobe } from "./blog-posts/capsuleWardrobe";
import { secondHand } from "./blog-posts/secondhand";
import { upcycling } from "./blog-posts/upcycling";
import { upcomingUpdates } from "./blog-posts/upcomingUpdates";
import capsuleImage from "../../img/capsule-blog-cover.png";
import secondHandImage from "../../img/vintage-blog-cover.png";
import upcycleImage from "../../img/upcycled-blog-cover.png";
import productUpdatesImg from "../../img/product-updates.png";

export const blankPost = {
  image: "",
  post: "",
  alt: "",
  title: "",
  date: "",
};

const blogPosts = [
  {
    title: "Exciting New Features Coming to SustainableStylist.ai",
    image: productUpdatesImg,
    date: "Apr 01 2023",
    post: upcomingUpdates,
    alt: "a 3d render in the style of a 60s architectural digest editorial of beautiful vintage computers and synthesizers connected together, and lighting up; in an ethereal, smooth, landscape with a futurist, utopian city in the background and a biodome across the sky",
  },
  {
    title: "Upcycled Clothing: A Stylish and Sustainable Fashion Revolution",
    image: upcycleImage,
    date: "Mar 23 2023",
    post: upcycling,
    alt: "An hd fashion editorial landscape photograph featuring a beautiful dark skin, non binary human model from behind, far away, posing dramatically atop a rock near the ocean shore; wearing am avant garde designer ensemble upcycled from discarded fishing materials",
  },
  {
    title:
      "The Capsule Wardrobe: A Sustainable Fashion Solution for a Stylish and Eco-Conscious Lifestyle",
    image: capsuleImage,
    post: capsuleWardrobe,
    date: "Mar 10 2023",
    alt: "An hd fashion editorial photograph featuring a  non-binary model from behind, walking into the horizon in a reflective, refractive and shining hall of mirrors made of triangular shapes",
  },
  {
    title:
      "Embracing Secondhand Fashion: Style, Sustainability, and Stigma-Free Shopping",
    image: secondHandImage,
    post: secondHand,
    date: "Mar 01 2023",
    alt: "A 60s Vogue magazine fashion editorial, of a black female musician in an mod orange dress and vidal sassoon bob, playing a synthesizer.",
  },
];

export default blogPosts;
