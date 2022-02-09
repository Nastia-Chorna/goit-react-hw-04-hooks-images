import {useState} from "react";
// import PropTypes from "prop-types";
import { 
  Searchbar,
  Form, 
  Button, 
  Icon, 
  Input } from "./Searchbar.styled";

  export default function SearchBar({onSubmit}) {
  
   const [imageName, setImageName]= useState("")
   const handleNameChange = event => {setImageName (event.target.value)};
   const handleSubmit = (event) => {
    event.preventDefault();
    if (imageName.trim() === "") {
      return;}
   onSubmit(imageName);
   setImageName('')
  };

    return (
      <Searchbar>
        <header>
      <Form onSubmit={handleSubmit}>
        <Button type="submit">
          <Icon />
        </Button>


      <Input
      className="input"
      type="text"
      autoComplete="off"
      autoFocus
     onChange={handleNameChange}
     value={imageName}
     placeholder="Search images and photos"
        />

      </Form>
      </header>
      </Searchbar>
    );
  };

