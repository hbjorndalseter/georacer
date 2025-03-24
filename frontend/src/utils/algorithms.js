import L from 'leaflet';
import Heap from 'heap-js';

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

// Haversine formula to calculate the distance between two points on the Earth's surface
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371000; // Earth's radius in meters
    const toRad = deg => deg * Math.PI / 180;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) ** 2 +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in meters
}

async function dijkstraShortestPath(mapId, startNodeId, endNodeId) {
    const minHeap = new Heap((a, b) => a.distance - b.distance);

    // Maps for quick access to distances and nodes
    const distancesMap = new Map(); // Distance from start node
    const nodeMap = new Map();
    const visitedNodes = new Set();

    // Fetch all nodes and map by ID for quick access
    const nodes = await fetch(`http://localhost:3000/api/roadnet/${mapId}/nodes`)
        .then(res => res.json());

    for (const node of nodes) {
        nodeMap.set(node.id, node);
    }

    // Check if start and end nodes exist
    if (!nodeMap.has(startNodeId) || !nodeMap.has(endNodeId)) {
        throw new Error("Start or end node ID not found.");
    }

    // Initialize distances and heap
    for (const node of nodes) {
        const distance = node.id === startNodeId ? 0 : Infinity;
        minHeap.push({ id: node.id, distance });
        distancesMap.set(node.id, distance);
    }

    // Dijkstra's algorithm main loop
    while (!minHeap.isEmpty()) {
        console.log(distancesMap);
        const { id: currentId, distance: currentDistance } = minHeap.pop();
        // if (visitedNodes.has(currentId)) continue;
        visitedNodes.add(currentId);

        // Check if we reached the end node
        if (currentId === endNodeId) {
            return currentDistance;
        }

        // Fetch neighbours of the current node
        const neighbours = await fetch(`http://localhost:3000/api/roadnet/${mapId}/${currentId}/neighbours`)
            .then(res => res.json());


        for (const neighbour of neighbours) {
            const neighbourId = neighbour.id;
            if (visitedNodes.has(neighbourId)) continue;

            const currentNode = nodeMap.get(currentId);

            const distanceToNeighbour = currentDistance + calculateDistance(
                neighbour.lat, neighbour.lng,
                currentNode.lat, currentNode.lng
            );

            if (distanceToNeighbour < (distancesMap.get(neighbourId) ?? Infinity)) {
                distancesMap.set(neighbourId, distanceToNeighbour);
                minHeap.remove(el => el.id === neighbourId);
                minHeap.push({ id: neighbourId, distance: distanceToNeighbour });
            }
        }
    }

    return Infinity; // No path found
}


export { calculatePositionOfArrow, calculateDistance, dijkstraShortestPath };