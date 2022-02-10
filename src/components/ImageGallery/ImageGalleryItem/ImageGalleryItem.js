import PropTypes from "prop-types";
import { 
  Item, 
  Image } from "./ImageGalleryItem.styled";

  const ImageGalleryItem = ({ webformatURL, largeImageURL, onClick }) => (
    <Item
      onClick={() => {
        onClick(largeImageURL);
      }}
    >
      <Image src={webformatURL} />
    </Item>
  );
  export default ImageGalleryItem;
  
  ImageGalleryItem.propTypes = {
    onClick: PropTypes.func.isRequired,
    webformatURL: PropTypes.string.isRequired,
  
    largeImageURL: PropTypes.string.isRequired,
  };
  