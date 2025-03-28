// Initialize the map
var map = L.map('map', {
    crs: L.CRS.Simple, // Simple coordinate system (no GPS required)
    minZoom: -2,
    maxZoom: 2
});

// Load the layout image
var bounds = [[0, 0], [1000, 2000]]; // Adjust to fit your image dimensions
L.imageOverlay('image.jpg', bounds).addTo(map);
map.fitBounds(bounds);

// Example Plot Data
var plots = [
    { id: 1, coords: [[300, 500]], area: "830 Sqft", price: "$10,000", status: "Available" },
    { id: 2, coords: [[400, 600]], area: "995 Sqft", price: "$12,000", status: "Sold" },
];

// Add interactive markers for plots
plots.forEach(plot => {
    var marker = L.marker(plot.coords, {
        draggable: false
    }).addTo(map);

    // Show plot details on hover
    marker.bindTooltip(`Plot No: ${plot.id}`, { permanent: false });

    // Show info on click
    marker.on('click', function () {
        document.getElementById('info-box').classList.remove('hidden');
        document.getElementById('plot-no').textContent = plot.id;
        document.getElementById('plot-area').textContent = plot.area;
        document.getElementById('plot-price').textContent = plot.price;
        document.getElementById('plot-status').textContent = plot.status;
    });

    // Enable double-click edit
    marker.on('dblclick', function () {
        var newPrice = prompt("Enter new price for Plot " + plot.id, plot.price);
        if (newPrice) {
            plot.price = newPrice;
            alert("Updated price: " + newPrice);
        }
    });
});

