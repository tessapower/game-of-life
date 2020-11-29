// Meadowfield Roads
const roads = [
  "Alice's House-Bob's House",   "Alice's House-Cabin",
  "Alice's House-Post Office",   "Bob's House-Town Hall",
  "Daria's House-Ernie's House", "Daria's House-Town Hall",
  "Ernie's House-Grete's House", "Grete's House-Farm",
  "Grete's House-Shop",          "Marketplace-Farm",
  "Marketplace-Post Office",     "Marketplace-Shop",
  "Marketplace-Town Hall",       "Shop-Town Hall"
];

// Creates a graph of the different destinations from each starting point 
function buildGraph(edges) {
    let graph = Object.create(null);
    function addEdge(from, to) {
        if (graph[from] == null) {
            graph[from] = [to];
        } else {
        graph[from].push(to);
        }
    }
    for (let [from, to] of edges.map(r => r.split("-"))) {
        addEdge(from, to);
        addEdge(to, from);
    }
    return graph;
}

const roadGraph = buildGraph(roads);
/*
 * Alice's House:	["Bob's House", "Cabin", "Post Office"]
 * Bob's House:	    ["Alice's House", "Town Hall"]
 * Cabin:	        ["Alice's House"]
 * Post Office:	    ["Alice's House", "Marketplace"]
 * Town Hall:	    ["Bob's House", "Daria's House", "Marketplace", "Shop"]
 * Daria's House:	["Ernie's House", "Town Hall"]
 * Ernie's House:	["Daria's House", "Grete's House"]
 * Grete's House:	["Ernie's House", "Farm", "Shop"]
 * Farm:	        ["Grete's House", "Marketplace"]
 * Shop:	        ["Grete's House", "Marketplace", "Town Hall"]
 * Marketplace:	    ["Farm", "Post Office", "Shop", "Town Hall"]
*/


// State of Meadowfield and its parcels
const VillageState = class VillageState {
    constructor(place, parcels) {
        this.place = place;
        this.parcels = parcels;
    }

    move(destination) {
        if (!roadGraph[this.place].includes(destination)) {
            return this;
        } else {
            let parcels = this.parcels.map(p => {
                if (p.place != this.place) return p;
                return {place: destination, address: p.address};
            }).filter(p => p.place != p.address);
            return new VillageState(destination, parcels);
        }
    }
}

function runRobot(state, robot, memory) {
    for (let turn = 0 ; ; turn++) {
        if (state.parcels.length == 0) {
        console.log(`Done in ${turn} turns`);
        break;
        }
        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
        console.log(`Moved to ${action.direction}`);
    }
}

// Random-brute-force solution

function randomPick(array) {
    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
}

function randomRobot(state) {
    return {direction: randomPick(roadGraph[state.place])};
}

VillageState.random = function(parcelCount = 5) {
    let parcels = [];
    for (let i = 0; i < parcelCount; i++) {
        let address = randomPick(Object.keys(roadGraph));
        let place;
        do {
            place = randomPick(Object.keys(roadGraph));
        } while (place == address);
        parcels.push({place, address});
    }
    return new VillageState("Post Office", parcels);
};

// Mail route solution

const mailRoute = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House",
    "Town Hall", "Daria's House", "Ernie's House",
    "Grete's House", "Shop", "Grete's House", "Farm",
    "Marketplace", "Post Office"
];

function routeRobot(state, memory) {
    if (memory.length == 0) memory = mailRoute;
    return {direction: memory[0], memory: memory.slice(1)};
}

// Goal-oriented solution

function findRoute(graph, from, to) {
    let work = [{at: from, route: []}];
    console.log(work);
    for (let i = 0; i < work.length; i++) {
        let {at, route} = work[i];
        for (let place of graph[at]) {
            if (place == to) return route.concat(place);
            if (!work.some(w => w.at == place)) {
                work.push({at: place, route: route.concat(place)});
            }
        }
    }
}


function goalOrientedRobot({place, parcels}, route) {
    if (route.length == 0) {
        let parcel = parcels[0];
        if (parcel.place != place) {
            route = findRoute(roadGraph, place, parcel.place);
        } else {
            route = findRoute(roadGraph, place, parcel.address);
        }
    }
    return {direction: route[0], memory: route.slice(1)};
}

/* 
 * "Measuring a Robot" Exercise:
 * Write a function compareRobots that takes two robots (and their starting memory).
 * It should generate 100 tasks and let each of the robots solve each of these tasks.
 * When done, it should output the average number of steps each robot took per task.
 * For the sake of fairness, make sure you give each task to both robots, rather than
 * generating different tasks per robot.
*/

function countSteps(state, robot, memory) {
    for (let steps = 0 ; ; steps++) {
        if (state.parcels.length == 0) return steps;
        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
    }
}

function compareRobots(robot1, memory1, robot2, memory2) {
    let robot1Steps = 0, robot2Steps = 0;
    const numberOfTasks = 100;
    for (let i = 0; i < numberOfTasks; i++) {
        let newState = VillageState.random();
        robot1Steps += countSteps(newState, robot1, memory1);
        robot2Steps += countSteps(newState, robot2, memory2);
    }
    console.log(`Average Steps Per Task:\nRobot 1 = ${robot1Steps/numberOfTasks}\nRobot 2 = ${robot2Steps/numberOfTasks}`);
}

compareRobots(routeRobot, [], goalOrientedRobot, []);

/*
 * "Robot Efficiency" Exercise:
 * Can you write a robot that finishes the delivery task faster than goalOrientedRobot?
 * If you observe that robot's behaviour, what obviously stupid things does it do? How 
 * could those be improved?
 * 
 * If you solved the previous exercise, you might want to use your compareRobots function
 * to verify whether you improved the robot.
 */

// Always 5 parcels
// Always starts at Post Office

function fasterRobot({place, parcels}, route) {
  	if (route.length == 0) {
    	// collect all possible routes to parcels
  		let routes = parcels.map(parcel => {
             if (parcel.place != place) {
                return {route: findRoute(roadGraph, place, parcel.place),
                    toCollect: true};
            } else {
                return {route: findRoute(roadGraph, place, parcel.address),
                    toCollect: false};
            }
        });

        function order({route, pickUp: toCollect}) {
        return (toCollect ? 0.5 : 0) - route.length;
        }
    // use array.reduce to reduce routes array down to only the next destination
      route = routes.reduce((a, b) => order(a) > order(b) ? a : b).route;
    }
  
    return {direction: route[0], memory: route.slice(1)};
}