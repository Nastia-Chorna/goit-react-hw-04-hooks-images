import { useEffect } from "react";
import PropTypes from "prop-types";
import { 
    Overlay, 
    ModalWrap } from "./Modal.styled";

 
export default function Modal ({onClose, image}){
  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  });

  const handleBackdropClick = (evt) => {
    console.log(evt)
    if (evt.currentTarget === evt.target) {
      onClose();
    }
  };

  

 const handleKeydown = (evt) => {
  console.log(evt)
    if (evt.code === "Escape") {
      onClose();
    }
  };

 

  
    return (
      <Overlay onClick={handleBackdropClick}>
        <ModalWrap>
        <img src={image} alt=""/>
        </ModalWrap>
      </Overlay>
    );
  }



Modal.propTypes = {
  image: PropTypes.string.isRequired,
};