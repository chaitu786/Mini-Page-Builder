import React, { useEffect, useState } from "react";
import "../Css/Modal.css";
import cancel from "../assets/cancel.svg"

const Modal = (props) => {
  const [inputs, setInputs] = useState({});

  //setting the state according to input changes in modal
  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  //a function to save changes
  const handleSaveChanges = () => {
    props.handleSaveChanges(
      inputs,
      props.coordinates.mode,
      props?.selectedComponentIndex
    );
    setInputs({
      text: "",
      clientX: "",
      clientY: "",
      fontSize: "",
      fontWeight: "",
    });
  };

  useEffect(() => {
    setInputs({
      ...inputs,
      ...props.coordinates,
      text: "",
      fontSize: "",
      fontWeight: "",
    });

    if (
      props?.selectedComponentIndex != null &&
      props.coordinates.mode == "edit"
    ) {
      setInputs(props.components[props.selectedComponentIndex]);
    }
  }, [props?.coordinates, props?.isOpen]);
  return (
    <div className={`modal ${props?.isOpen ? "open" : "closed"}`}>
      <div className="modal-content">
        <div>
          <div className="modal-heading">
            <h2>
              Edit {props?.components[props.selectedComponentIndex]?.type}
            </h2>
            <img src={cancel} alt="cancel" className="cancel" onClick={props?.handleCloseModal}/>
          </div>
        </div>
        <div className="input-group">
          <label>Text</label>
          <input
            name="text"
            type="text"
            value={inputs.text}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="input-group">
          <label>X</label>
          <input
            name="clientX"
            type="text"
            value={inputs.clientX}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="input-group">
          <label>Y</label>
          <input
            name="clientY"
            type="text"
            value={inputs.clientY}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="input-group">
          <label>Font Size</label>
          <input
            name="fontSize"
            type="text"
            value={inputs.fontSize}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="input-group">
          <label>Font Weight</label>
          <input
            name="fontWeight"
            type="text"
            value={inputs.fontWeight}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="button-group">
          <button onClick={handleSaveChanges}>Save Changes</button>
          {/* <button onClick={props?.handleCloseModal}>Cancel</button> */}
        </div>
      </div>
    </div>
  );
};

export default Modal;
