
function connectNodes(inputNodes, outputNodes, nodeRadius) {
    // if(document.querySelector("canvas"))
    // {
    //     return;
    // }
    // Create a canvas to draw connections
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    document.body.appendChild(canvas);

    // Function to update canvas dimensions
    function updateCanvasSize() {
        canvas.width = document.documentElement.scrollWidth;
        canvas.height = document.documentElement.scrollHeight;
    }
    updateCanvasSize();

    // Style canvas to overlay content
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none'; // Make it non-interactive

    // Function to draw connections
    function drawConnections() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

        inputNodes.forEach(inputNode => {
            const inputRect = inputNode.getBoundingClientRect();
            const inputCenter = {
                x: inputRect.left + inputRect.width / 2 + window.scrollX,
                y: inputRect.top + inputRect.height / 2 + window.scrollY,
            };

            outputNodes.forEach(outputNode => {
                const outputRect = outputNode.getBoundingClientRect();
                const outputCenter = {
                    x: outputRect.left + outputRect.width / 2 + window.scrollX,
                    y: outputRect.top + outputRect.height / 2 + window.scrollY,
                };

                // Calculate the line start points based on the radius (subtract radius from center)
                const inputEdge = {
                    x: inputCenter.x + (nodeRadius * Math.cos(0)),  // Adjust x-coordinate based on radius
                    y: inputCenter.y + (nodeRadius * Math.sin(0)),  // Adjust y-coordinate based on radius
                };

                const outputEdge = {
                    x: outputCenter.x + (nodeRadius * Math.cos(Math.PI)),  // Adjust x-coordinate for the opposite direction
                    y: outputCenter.y + (nodeRadius * Math.sin(Math.PI)),  // Adjust y-coordinate for the opposite direction
                };

                // Draw the line between the edges of the nodes (not their centers)
                ctx.beginPath();
                ctx.moveTo(inputEdge.x, inputEdge.y); 
                ctx.lineTo(outputEdge.x, outputEdge.y);
                ctx.strokeStyle = '#D3D3D3';
                ctx.lineWidth = 1;
                ctx.stroke();
            });
        }); 
    }

    drawConnections();

    // Redraw connections on resize or scroll
    window.addEventListener('resize', () => {
        updateCanvasSize();
        drawConnections();
    });

    window.addEventListener('scroll', drawConnections);
}

// Fetch nodes from the DOM
const inputNodes = document.querySelectorAll('.input-layer .node');
const hiddenNodes1 = document.querySelectorAll('.hidden-layer1 .node');
const hiddenNodes2 = document.querySelectorAll('.hidden-layer2 .node');
const hiddenNodes3 = document.querySelectorAll('.hidden-layer3 .node');
const outputNodes = document.querySelectorAll('.output-layer .node');

// Define the radius of your nodes (you can adjust this value as needed)
const nodeRadius = 10;

// Call the function to connect the nodes

connectNodes(inputNodes, hiddenNodes1, nodeRadius);
connectNodes(hiddenNodes1, hiddenNodes2, nodeRadius);
connectNodes(hiddenNodes2, hiddenNodes3, nodeRadius);
connectNodes(hiddenNodes3, outputNodes, nodeRadius);

// update time for all nodes aniamtion
var nodes = document.querySelectorAll('.node');
nodes.forEach(node => {
    var time = Math.random()*10;
    time = time < 1 ? 1 : time;
    node.style.setProperty('--animation-time', time + 's');
});