# Interactive Light and Shadow

This project is a simple, interactive 3D web application that demonstrates the use of lights and shadows in a 3D scene. Users can select from a variety of objects, move a light source around the scene, and see the real-time effects of the lighting and shadows.

## Features

*   **Object Selection:** Users can choose from four different 3D objects: a cube, a sphere, a cone, and a torus.
*   **Interactive Lighting:** Users can move a spotlight around the scene by moving their mouse or dragging their finger on a touch screen.
*   **Real-time Shadows:** The selected object casts a real-time shadow that updates as the light source moves.
*   **Customizable Light:** Users can control the intensity and color of the spotlight using a slider and a set of color swatches.
*   **Responsive Design:** The application is designed to work on both desktop and mobile devices.

## Technologies Used

*   **Three.js:** A popular JavaScript library for creating and displaying 3D graphics in a web browser.
*   **HTML5:** The standard markup language for creating web pages.
*   **CSS3:** The standard stylesheet language for styling web pages.
*   **JavaScript (ES6+):** The programming language used to create the application logic.

## How it Works

The application is built around a single HTML file (`index.html`), a CSS file (`style.css`), and a JavaScript file (`main.js`).

### `main.js`

This file contains the core logic of the application. It uses the Three.js library to create and manage the 3D scene.

#### Key Functions

*   `createObject(type)`: This function is responsible for creating and displaying the selected 3D object. It takes the type of the object as a parameter (e.g., 'cube', 'sphere'), creates the corresponding Three.js geometry and material, and adds the object to the scene.

*   `updateLightPosition(x, y)`: This function is called whenever the user moves their mouse or drags their finger on the screen. It uses a raycaster to determine the position of the mouse/touch in the 3D scene and updates the position of the spotlight accordingly.

*   `animate()`: This is the main animation loop of the application. It is called on every frame and is responsible for re-rendering the scene. It also rotates the selected object to make the scene more dynamic.

#### Event Listeners

The application uses a number of event listeners to handle user input:

*   **Object Selector:** The buttons in the object selector have `click` event listeners that call the `createObject()` function to switch the displayed object.
*   **Intensity Slider:** The intensity slider has an `input` event listener that updates the `intensity` property of the spotlight in real-time.
*   **Color Swatches:** The color swatches have `click` event listeners that update the `color` property of the spotlight and the light gizmo.
*   **Mouse and Touch Events:** The `mousemove` and `touchmove` event listeners call the `updateLightPosition()` function to move the spotlight.
*   **Resize Event:** The `resize` event listener updates the camera aspect ratio and the renderer size to ensure that the scene is always displayed correctly.

## Setup and Usage

To run the project, simply open the `index.html` file in a web browser. No special setup is required.
