import React, { useEffect, useState } from "react";
import "../Css/PageBuilder.css";
import gripVertical from "../assets/grip-vertical.svg";
import Modal from "../Components/Modal";

const MiniPageBuilder = () => {
  const [components, setComponents] = useState([]);
  const [selectedComponentIndex, setSelectedComponentIndex] = useState(null);
  const [coordinates, setCoordinates] = useState({
    clientX: "",
    clientY: "",
    mode: "",
    type: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [focused, setFocused] = useState(false);

  //a function will work when user start drag the element
  const handleDragStart = (event, type, index = "") => {
    event.target.classList.add("dragging"); //setting the class dragging to change the cursor type
    const boundingRect = event.target.getBoundingClientRect(); // to set the draggable element perfect positiion where as the cursor placed

    const offsetX = event.clientX - boundingRect.left;
    const offsetY = event.clientY - boundingRect.top;
    event.dataTransfer.setData(
      "text/plain",
      JSON.stringify({ type, index, offsetX, offsetY }) // by using this method setting the data whick ever we need to access on handle drop .
    );
  };

  const handleDragEnd = (event) => {
    event.target.classList.remove("dragging"); //removing the class dragging to change the cursor type
  };

  // a function will work after dropping the element blank page and we can acces the event
  const handleDrop = (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData("text/plain"); //getting the data which ever we set while drag start.
    const { type, index, offsetX, offsetY } = JSON.parse(data); //destructuring the data
    const { clientX, clientY } = event; //accessing the x and y coordinates from the event

    const updatedComponents = [...components];

    //this function is for changing the position of element after dropped.
    if (updatedComponents[index]) {
      updatedComponents[index] = {
        ...updatedComponents[index],
        type,
        clientX: clientX - offsetX,
        clientY: clientY - offsetY,
      };
      setComponents(updatedComponents); // setting components state
      saveToLocalStorage(updatedComponents); //calling saveToLocalStorage function to strore data local storage.
      return;
    }
    //setting the x , y coordinates from event
    setCoordinates({
      ...coordinates,
      clientX: clientX - offsetX,
      clientY: clientY - offsetY + 20, //20 adding for just positiuon adjustment
      mode: "",
      type,
    });
    setIsOpen(true); // setting state to open modal
  };

  // a function is to select the dropped component
  const handleSelect = (index) => {
    setSelectedComponentIndex(index);
  };

  //function to save the changes made in modal
  const handleSaveChanges = (inputValues, mode, index) => {
    const updatedComponents = [...components];
    if (mode == "edit") {
      //this is to update the dropped component
      if (updatedComponents[index]) {
        updatedComponents[index] = {
          ...updatedComponents[index],
          ...inputValues,
          clientX: inputValues.clientX,
          clientY: inputValues.clientY,
        };
        setComponents(updatedComponents); // setting components state
        saveToLocalStorage(updatedComponents); //calling saveToLocalStorage function to strore data local storage.
      }
    } else {
      // to create fresh dropped component
      updatedComponents.push({
        type: coordinates.type,
        clientX: inputValues.clientX,
        clientY: inputValues.clientY,
        text: inputValues.text,
        fontSize: inputValues.fontSize,
        fontWeight: inputValues.fontWeight,
      });
      setComponents(updatedComponents); // setting components state
      saveToLocalStorage(updatedComponents); //calling saveToLocalStorage function to strore data local storage.
    }
    setIsOpen(false);
  };

  // function will work on clicking cancel icon
  const handleCloseModal = () => {
    setIsOpen(false); //changing the modal state to close the modal
  };

  //a function is to access the pressed keys on key board like "Enter" "Delete"
  const handleKeyPress = (event) => {
    debugger;
    //condition to check enter pressed or not
    if (event.key === "Enter") {
      event.preventDefault();
      setCoordinates({ ...coordinates, mode: "edit" });
      setIsOpen(true);
    } //condition to check delete pressed or not
    else if (event.key === "Backspace" && !focused) {
      event.preventDefault();
      let x = components.filter((_, index) => index !== selectedComponentIndex);
      setComponents(x);
      saveToLocalStorage(x);
    }
  };

  //a function to save the data in local storage
  const saveToLocalStorage = (updatedComponents) => {
    localStorage.setItem("components", JSON.stringify(updatedComponents));
  };
  //removing the actve focus on sected component in each new element addded
  useEffect(() => {
    setSelectedComponentIndex(null);
  }, [components.length]);

  // on mount getting the data from localstorage and setting in state
  useEffect(() => {
    const storedComponents = JSON.parse(localStorage.getItem("components"));
    if (storedComponents) {
      setComponents(storedComponents);
    }
  }, []);

  // a function is to export json file to store coponents configuration data
  const handleExport = () => {
    const jsonData = JSON.stringify(components);
    const blob = new Blob([jsonData], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "pageBuilderConfiguration.json";
    link.click();
  };

  //changeing the input chnages in dropped element
  const handleChange = (event, index) => {
    const updatedComponents = [...components];
    if (updatedComponents[index]) {
      updatedComponents[index] = {
        ...updatedComponents[index],
        [event.target.name]: event.target.value,
      };
      setComponents(updatedComponents);
      saveToLocalStorage(updatedComponents);
    }
  };

  return (
    <div tabIndex={0} onKeyDown={(e) => handleKeyPress(e)}>
      <div className="pageBuilderContainer">
        {/* blank page */}
        <div
          className="blankContainer"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          {/* rendering the dropped components */}
          {components.map((component, index) => (
            <div
              draggable
              key={index}
              onDragStart={(e) => handleDragStart(e, component.type, index)}
              onDragEnd={handleDragEnd}
              onClick={() => handleSelect(index)}
              style={{
                left: component.clientX + "px",
                top: component.clientY + "px",
                fontSize: component.fontSize + "px" || "auto",
                fontWeight: component.fontWeight || "auto",
                position: "absolute",
                width: component?.type == "Input" ? "20%" : "auto",
              }}
              className={`draggableElem component_${
                selectedComponentIndex === index ? "selected" : ""
              }`}
            >
              {component?.type === "Label" ? (
                component?.text || component?.type
              ) : component?.type === "Input" ? (
                <input
                  type="text"
                  name="text"
                  value={component?.text}
                  onChange={(event) => handleChange(event, index)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                />
              ) : (
                <button>{component?.text || component?.type}</button>
              )}
            </div>
          ))}
        </div>
        {/* side bar with blocks */}
        <div className="sidebarContainer">
          <div>
            <h3>Blocks</h3>
            <div
              draggable
              onDragStart={(e) => handleDragStart(e, "Label")}
              onDragEnd={handleDragEnd}
            >
              <img
                src={gripVertical}
                alt="Grip Vertical Image"
                className="verticalGripImg"
              />
              <p>Label</p>
            </div>
            <div
              draggable
              onDragStart={(e) => handleDragStart(e, "Input")}
              onDragEnd={handleDragEnd}
            >
              <img
                src={gripVertical}
                alt="Grip Vertical Image"
                className="verticalGripImg"
              />
              <p>Input</p>
            </div>
            <div
              draggable
              onDragStart={(e) => handleDragStart(e, "Button")}
              onDragEnd={handleDragEnd}
            >
              <img
                src={gripVertical}
                alt="Grip Vertical Image"
                className="verticalGripImg"
              />
              <p>Button</p>
            </div>
          </div>
        </div>
      </div>
      {/* rendering modal */}
      <Modal
        handleSaveChanges={handleSaveChanges}
        handleCloseModal={handleCloseModal}
        isOpen={isOpen}
        coordinates={coordinates}
        setCoordinates={setCoordinates}
        components={components}
        selectedComponentIndex={selectedComponentIndex}
      />
      <div className="configBtn">
        <button onClick={handleExport}>Export Configurations</button>
      </div>
    </div>
  );
};

export default MiniPageBuilder;
