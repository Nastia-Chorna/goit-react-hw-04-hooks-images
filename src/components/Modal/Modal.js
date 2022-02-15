import { Component } from "react";
import PropTypes from "prop-types";
import { 
    Overlay, 
    ModalWrap } from "./Modal.styled";

 
export default class Modal extends Component {
  handleBackdropClick = (evt) => {
    if (evt.currentTarget === evt.target) {
      this.props.onClose();
    }
  };

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeydown);
  }

  handleKeydown = (evt) => {
    if (evt.code === "Escape") {
      this.props.onClose();
    }
  };

 

  render() {
    return (
      <Overlay onClick={this.handleBackdropClick}>
        <ModalWrap>
        <img src={this.props.image}/>
        </ModalWrap>
      </Overlay>
    );
  }
}


Modal.propTypes = {
  image: PropTypes.string.isRequired,
};