# Getting Started with Mini Page builder

Mini Page builder to build the mini pages.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

# Mini-Page-Builder Component Documentation

# Overview

- The 'MiniPageBuilder' component is a React component designed for building pages with draggable and customizable components. It allows users to drag and drop components onto a blank container, configure their properties, and save the page configuration.

# Working

- Upon opening the link, you will encounter a Mini Page Builder UI featuring a sidebar on one side containing blocks (Label, Input, Button), and a blank canvas on the other.
- You can seamlessly drag and drop Labels, Inputs, or Buttons from the sidebar onto the blank canvas. Once dropped, a modal will appear, pre-filled with X and Y configuration settings.
- Fill in the details in the modal, click 'Save Changes,' and the details will be saved. The modal will close, and the dragged element will be rendered on the blank canvas according to the provided details and it will placed accoring to X and Y configurations.
- To select an element, simply click on it. The selected element will display a red border for easy identification. If you wish to edit the details, select the element and press 'Enter' on your keyboard.
- Upon pressing 'Enter,' a modal will immediately open with pre-filled details from the initial creation. Modify the data as needed and click 'Save Changes' to update the selected component.
- For deleting an element, select it and press either 'Delete' or 'Backspace' on your keyboard. Note that for deleting an input field, ensure that the element is selected and not in focus (input should not focussed).
- By clicking 'Export Configuration,' the component data will be downloaded in a JSON file for easy storage and retrieval.

# Take a look

- Deploy: [Link](https://mini-page-builder-ten.vercel.app/)

# Dependencies

- React: The component is built using React, a JavaScript library for building user interfaces.

# File Structure

- MiniPageBuilder.js: The main React component file.
- '../Css/PageBuilder.css': CSS file for styling the page builder.
- '../assets/grip-vertical.svg': SVG image for the vertical grip.
- '../Components/Modal.js': Component for displaying a modal to edit component properties.
- '../Css/Modal.css': CSS file for styling the modal.

# Component Structure

The 'MiniPageBuilder' component consists of the following major sections:

# State Variables:

- 'components': An array of objects representing the dropped components on the page.
- 'selectedComponentIndex': Index of the currently selected component.
- 'coordinates': Object containing clientX, clientY, mode, and type information for dragging and dropping.
- 'isOpen': Boolean to control the visibility of the modal.
- 'focused': Boolean to know the input tag is focussed or not.

# Event Handlers:

- 'handleDragStart': Initiates the drag operation and sets data for the dragged component.
- 'handleDragEnd': Handles the end of the drag operation by removing the "dragging" class.
- 'handleDrop': Handles the drop event, updating component positions or opening a modal for a new component.
- 'handleSelect': Selects a dropped component for editing.
- 'handleSaveChanges': Saves changes made in the modal to the component state.
- 'handleCloseModal': Closes the modal.
- 'handleKeyPress': Handles key presses for editing or deleting components.
- 'saveToLocalStorage': Saves the component data to local storage.
- 'handleChange': Handles changes in input fields for the selected component.

# Effect Hooks:

- 'useEffect': Clears the selected component when a new element is added.
- 'useEffect': Retrieves component data from local storage on mount.

# Rendering:

- Renders the blank container for dropping components.
- Renders the sidebar with draggable blocks (Label, Input, Button).
- Maps over the components array to render the dropped components with drag and edit functionality.
- Renders the Modal component for editing component properties.

# Export Configuration:

- Provides a button to export the current page configurations as a JSON file.

## Styling

- The styling for the page builder is defined in the PageBuilder.css and Modal.css file. You can customize the styles to fit your application's design.

## Notes

- Components and their configurations are stored in local storage for persistence.
- The Modal component is used for editing component properties.
- Components can be dragged, dropped, edited, and deleted using keyboard shortcuts.

# Mini-Page-Builder
