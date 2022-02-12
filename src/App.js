import {useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Modal from "./components/Modal/Modal";
import ImagesAPI from "../src/pixabay";
// import { Pictures } from "./components/ImageGallery/ImageGallery.styled";
import Button from './components/Button/Button';
import Loader from './components/Loader/Loader';
// import { Pictures } from "./components/ImageGallery/ImageGallery.styled";


export default function App () {
  
  const [images, setImages]= useState(null);
  const [page, setPage]= useState(1);
  const [query, setQuery]=  useState('');
  const [error, setEarror]= useState('');
  const [status, setStatus]= useState('idle');
  const [activeImage, setActiveImage]= useState('');
 
  const [showModal, setShowModal]= useState(false);
  const [visible, setVisible]= useState(true);

  useEffect(() => {setImages([])},
  [query])

  useEffect(() => {
    if (query === "") {return}    
    setVisible(true)    
    setStatus('pending')
 
  ImagesAPI.fetchPictures(query, page)
        .then(({ hits }) => {
        if (!query) {setStatus('idle')
        return toast.error(`Can't find Pictures. Please enter another title` )
        }
        if (hits.length === 0) {
          setStatus('resolved')
          setVisible(false)                    
          return toast.error(`Can't find Pictures. Please enter another title` )}
        setImages(prevImages => [...prevImages, ...hits])
        setStatus('resolved')
      })
      .finally(() => {
        if (page > 1) {scrollTo()};
      })
      .catch(error => {
        setEarror(error)
        setStatus('rejected')
        return toast.error(`Can't find Pictures. Please enter another title`)
      })
    }, [query, page])
        
      
 const scrollTo = () => {
    const gallery = document.querySelector('.gallery');
    const cardHeight = gallery.getBoundingClientRect().height;
    window.scrollBy({
    left: 0,
    top: cardHeight * 4,
    behavior: 'smooth',
    });
  };

  const handlerSubmitUserQuery = query => {setQuery(query.trim())
    setPage(1)
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1 )};
  

  // notify = () =>
  //   toast.error(
  //     `There are no matching images for this request: ${this.state.query} !`,
  //   );

  const handleronClickImage = (activeImage) => {
    setActiveImage(activeImage);
   
    setShowModal(prevShowModal => !prevShowModal)
  };

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal)
  };
  

    if (status === 'idle') {
      return (
        <div>
        <ToastContainer position="top-center" autoClose={2000} />
        <Searchbar onSubmit={handlerSubmitUserQuery} />
        </div>
      );
    }

    if (status === 'rejected') {
      return (
        <div>
          <Searchbar onSubmit={handlerSubmitUserQuery} />
          <h2>{error.massage}</h2>
        </div>
      );
    }

    if (status === 'pending') {
      return (
        <div>
          <ToastContainer position="top-center" autoClose={2000} />
          <Searchbar onSubmit={handlerSubmitUserQuery} />
          <ImageGallery
            userImages={images}
            onClick={handleronClickImage}
          />
          <Loader />
        </div>
      );
    }

    if (status === 'resolved') {
      return (
        <div>
          <ToastContainer position="top-center" autoClose={2000} />
          <Searchbar onSubmit={handlerSubmitUserQuery} />
          <ImageGallery
            userImages={images}
            onClick={handleronClickImage}
          />
          {images.length && visible && (
            <Button onClick={handleLoadMore} />
          )}
          {showModal && (
            <Modal image={activeImage} onClose={toggleModal}/>
          )}
        </div>
      );
    }
  }