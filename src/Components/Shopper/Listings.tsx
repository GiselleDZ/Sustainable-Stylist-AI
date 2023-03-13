import "./listings.css";

type ListingProps = {
  image: string;
  price: number;
  text: string;
  link: string;
  root: string;
};

const Listing = ({ image, price, text, link, root }: ListingProps) => {
  return (
    <a className="product-link" href={`${root}${link}`}>
      <div className="product">
        <img src={image} alt={text} className="product-image" />
        <div className="product-info">
          <h4>{text}</h4>
          <h3>{price}</h3>
        </div>
      </div>
    </a>
  );
};

export default Listing;
