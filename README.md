# Getting Started with Mini Page builder

Mini Page builder to build the mini pages.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

# Mini-Page-Builder Component Documentation

# Overview

The 'MiniPageBuilder' component is a React component designed for building pages with draggable and customizable components. It allows users to drag and drop components onto a blank container, configure their properties, and save the page configuration.

# Dependencies

React: The component is built using React, a JavaScript library for building user interfaces.

# File Structure

MiniPageBuilder.js: The main React component file.
'../Css/PageBuilder.css': CSS file for styling the page builder.
'../assets/grip-vertical.svg': SVG image for the vertical grip.
'../Components/Modal.js': Component for displaying a modal to edit component properties.
'../Css/Modal.css': CSS file for styling the modal.

# Component Structure

The 'MiniPageBuilder' component consists of the following major sections:

1. # State Variables:

   'components': An array of objects representing the dropped components on the page.
   'selectedComponentIndex': Index of the currently selected component.
   'coordinates': Object containing clientX, clientY, mode, and type information for dragging and dropping.
   'isOpen': Boolean to control the visibility of the modal.

2. # Event Handlers:

   'handleDragStart': Initiates the drag operation and sets data for the dragged component.
   'handleDragEnd': Handles the end of the drag operation by removing the "dragging" class.
   'handleDrop': Handles the drop event, updating component positions or opening a modal for a new component.
   'handleSelect': Selects a dropped component for editing.
   'handleSaveChanges': Saves changes made in the modal to the component state.
   'handleCloseModal': Closes the modal.
   'handleKeyPress': Handles key presses for editing or deleting components.
   'saveToLocalStorage': Saves the component data to local storage.
   'handleChange': Handles changes in input fields for the selected component.

3. # Effect Hooks:

   'useEffect': Clears the selected component when a new element is added.
   'useEffect': Retrieves component data from local storage on mount.

4. # Rendering:

   Renders the blank container for dropping components.
   Renders the sidebar with draggable blocks (Label, Input, Button).
   Maps over the components array to render the dropped components with drag and edit functionality.
   Renders the Modal component for editing component properties.

5. # Export Configuration:
   Provides a button to export the current page configurations as a JSON file.

## Styling

The styling for the page builder is defined in the PageBuilder.css and Modal.css file. You can customize the styles to fit your application's design.

## Notes

Components and their configurations are stored in local storage for persistence.
The Modal component is used for editing component properties.
Components can be dragged, dropped, edited, and deleted using keyboard shortcuts.

# Mini-Page-Builder
