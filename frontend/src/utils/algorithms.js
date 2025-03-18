import L from 'leaflet';

// Algorithm to calculate the position and rotation of the arrow image relative to the car image
function calculatePositionOfArrow(latNeighbour, lonNeighbour, latCurrentNode, lonCurrentNode) {
    const car_width = 40;      // Width of the car image in px
    const car_height = 75.5;   // Height of the car image in px

    const arrow_width = 38.5;  // Width of the arrow image in px
    const arrow_height = 12.5; // Height of the arrow image in px

    // Find the radius of the circle that intersects the corners of the car image
    const radius = Math.sqrt((car_width / 2) ** 2 + (car_height / 2) ** 2);

    // Project the current node and neighbour coordinates using EPSG:3857 (Web Mercator)
    const currentPoint = L.CRS.EPSG3857.project(L.latLng(latCurrentNode, lonCurrentNode));
    const neighbourPoint = L.CRS.EPSG3857.project(L.latLng(latNeighbour, lonNeighbour));

    // Calculate differences in the projected (x, y) coordinates
    const delta_x = neighbourPoint.x - currentPoint.x;
    const delta_y = neighbourPoint.y - currentPoint.y;

    // Use atan2 to get the angle (in radians) between the two points
    let alpha = Math.atan2(delta_y, delta_x);
    if (alpha < 0) alpha += 2 * Math.PI;

    // Calculate the arrow's offset from the car center based on the angle
    const x_p = radius * Math.cos(alpha) - (arrow_height / 2) * Math.sin(alpha);
    const y_p = radius * Math.sin(alpha) + (arrow_height / 2) * Math.cos(alpha);

    // Convert the angle from radians to degrees for CSS rotation
    const rot_angle = -alpha * 180 / Math.PI;

    return { rot_angle, x_p, y_p };
}

function calculateDistance(latNeighbour, lonNeighbour, latCurrentNode, lonCurrentNode) {
    const currentPoint = L.CRS.EPSG3857.project(L.latLng(latCurrentNode, lonCurrentNode));
    const neighbourPoint = L.CRS.EPSG3857.project(L.latLng(latNeighbour, lonNeighbour));
    return Math.sqrt((neighbourPoint.x - currentPoint.x) ** 2 + (neighbourPoint.y - currentPoint.y) ** 2);
}

export { calculatePositionOfArrow, calculateDistance };