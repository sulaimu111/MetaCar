const pxSize = 20;
const timeStep = 10;
const start = 2, goal = 4, obstacle = 0, blank_1 = 1; blank_3 = 3; blank_5 = 5;
const pathCost = [null, 1, 0, 3, 0, 5];
var map =  [[0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];//park:(3, 3);
let row = map.length;
let col = map[0].length;
var getMapValue, addNeightBor;
var path;
// run()

function Node(parent, rowat, colat, totalCost) {
    this.parent = parent;
    this.rowAt = rowat;
    this.colAt = colat;
    this.totalCost = totalCost;
    this.getMapValue = function () {
        return map[this.rowAt][this.colAt];
    }

    this.setParent = function (p) {
        this.parent = p;
    }
    this.setTotalCost = function (cost) {
        this.totalCost = cost;
    }
    this.set

    //from left top and normal clock order
    this.addNeightBor = function () {
        rowAt = this.rowAt;
        colAt = this.colAt;
        // rightTop = [rowAt - 1, colAt + 1];
        // if (rightTop[1] < col && rightTop[0] >= 0 && map[rightTop[0]][rightTop[1]] != obstacle) {
        // 	if (getNodeFromClosed(rightTop) != null) {
        // 		node = getNodeFromClosed(rightTop);
        // 		costPos = map[rightTop[0]][rightTop[1]];
        // 		if (node.totalCost > this.totalCost + costPos) {
        // 			node.setTotalCost(this.totalCost + costPos);
        // 			node.setParent(this);
        // 		}
        // 	} else {
        // 		node = new Node(this, rightTop[0], rightTop[1], this.totalCost + pathCost[map[rightTop[0]][rightTop[1]]]);
        // 		openList.push(node);
        // 		createdList.push(node);
        // 	}

        // }

        right = [rowAt, colAt + 1];
        if (right[1] < col && map[right[0]][right[1]] != obstacle) {
            if (getNodeFromClosed(right) != null) {
                node = getNodeFromClosed(right);
                costPos = map[right[0]][right[1]];
                if (node.totalCost > this.totalCost + pathCost[costPos]) {
                    node.setTotalCost(this.totalCost + pathCost[costPos]);
                    node.setParent(this);
                }
            } else {
                node = new Node(this, right[0], right[1], this.totalCost + pathCost[map[right[0]][right[1]]]);
                openList.push(node);
                createdList.push(node);
            }

        }

        // rightBott = [rowAt + 1, colAt + 1];
        // if (rightBott[0] < row && rightBott[1] < col && map[rightBott[0]][rightBott[1]] != obstacle) {
        // 	if (getNodeFromClosed(rightBott) != null) {
        // 		node = getNodeFromClosed(rightBott);
        // 		costPos = map[rightBott[0]][rightBott[1]];
        // 		if (node.totalCost > this.totalCost + costPos) {
        // 			node.setTotalCost(this.totalCost + costPos);
        // 			node.setParent(this);
        // 		}
        // 	} else {
        // 		node = new Node(this, rightBott[0], rightBott[1], this.totalCost + pathCost[map[rightBott[0]][rightBott[1]]]);
        // 		openList.push(node);
        // 		createdList.push(node);
        // 	}

        // }

        bott = [rowAt + 1, colAt];
        if (bott[0] < row && map[bott[0]][bott[1]] != obstacle) {
            if (getNodeFromClosed(bott) != null) {
                node = getNodeFromClosed(bott);
                costPos = map[bott[0]][bott[1]];
                if (node.totalCost > this.totalCost + pathCost[costPos]) {
                    node.setTotalCost(this.totalCost + pathCost[costPos]);
                    node.setParent(this);
                }
            } else {
                node = new Node(this, bott[0], bott[1], this.totalCost + pathCost[map[bott[0]][bott[1]]]);
                openList.push(node);
                createdList.push(node);
            }

        }

        // leftBott = [rowAt + 1, colAt - 1];
        // if (leftBott[1] >= 0 && leftBott[0] < row && map[leftBott[0]][leftBott[1]] != obstacle) {
        // 	if (getNodeFromClosed(leftBott) != null) {
        // 		node = getNodeFromClosed(leftBott);
        // 		costPos = map[leftBott[0]][leftBott[1]];
        // 		if (node.totalCost > this.totalCost + costPos) {
        // 			node.setTotalCost(this.totalCost + costPos);
        // 			node.setParent(this);
        // 		}
        // 	} else {
        // 		node = new Node(this, leftBott[0], leftBott[1], this.totalCost + pathCost[map[leftBott[0]][leftBott[1]]]);
        // 		openList.push(node);
        // 		createdList.push(node);
        // 	}

        // }

        left = [rowAt, colAt - 1];
        if (left[1] >= 0 && map[left[0]][left[1]] != obstacle) {
            if (getNodeFromClosed(left) != null) {
                node = getNodeFromClosed(left);
                costPos = map[left[0]][left[1]];
                if (node.totalCost > this.totalCost + pathCost[costPos]) {
                    node.setTotalCost(this.totalCost + pathCost[costPos]);
                    node.setParent(this);
                }
            } else {
                node = new Node(this, left[0], left[1], this.totalCost + pathCost[map[left[0]][left[1]]]);
                openList.push(node);
                createdList.push(node);
            }

        }


        // leftTop = [rowAt - 1, colAt - 1];
        // if (leftTop[0] >= 0 && leftTop[1] >= 0 && map[leftTop[0]][leftTop[1]] != obstacle) {
        // 	if (getNodeFromClosed(leftTop) != null) {
        // 		node = getNodeFromClosed(leftTop);
        // 		costPos = map[leftTop[0]][leftTop[1]];
        // 		if (node.totalCost > this.totalCost + costPos) {
        // 			node.setTotalCost(this.totalCost + costPos);
        // 			node.setParent(this);
        // 		}
        // 	} else {
        // 		node = new Node(this, leftTop[0], leftTop[1], this.totalCost + pathCost[map[leftTop[0]][leftTop[1]]]);
        // 		openList.push(node);
        // 		createdList.push(node);
        // 	}

        // }

        //can not use top, top is already defined as window class in JS
        topNode = [rowAt - 1, colAt];
        if (topNode[0] >= 0 && map[topNode[0]][topNode[1]] != obstacle) {
            if (getNodeFromClosed(topNode) != null) {
                node = getNodeFromClosed(topNode);
                costPos = map[topNode[0]][topNode[1]];
                if (node.totalCost > this.totalCost + pathCost[costPos]) {
                    node.setTotalCost(this.totalCost + pathCost[costPos]);
                    node.setParent(this);
                }
            } else {
                node = new Node(this, topNode[0], topNode[1], this.totalCost + pathCost[map[topNode[0]][topNode[1]]]);
                openList.push(node);
                createdList.push(node);
            }

        }
    }
}

function getNodeFromClosed(testNode) {
    for (i = 0; i < createdList.length; i++) {
        if (createdList[i].rowAt == testNode[0] && createdList[i].colAt == testNode[1]) return createdList[i];
    }
    return null;
}

var openList;
var closedList;
var createdList;
var startNode;
var searchNode;
var currentNode;

function run() {
    startNode = getStartNode();
    searchNode = startNode;
    openList = [];
    openList.push(startNode);
    createdList = [];
    createdList.push(startNode);
    closedList = [];
    iterationTime = 0;
    //start iteration procedure
    if (openList.length != 0) {
        iteration();
        // console.log("openList.length != 0")
        // console.log(path)
        // console.log('finiiiiiiiiiiiiish')
    }
}

function iteration() {
    currentNode = openList.pop();
    //highlight currentNode
    try{
        if (currentNode.getMapValue() == goal) {
            closedList.push(currentNode);
            //find path through closedList
            var node = closedList[closedList.length - 1]; //goal node
            path = new Array(node);
            while (node.getMapValue != startNode.getMapValue) {
                node = node.parent;
                path.unshift(node);
            }
    
            // for(i = 0; i<path.length; i++){
            //     roadwork.push(path[i].rowAt)
            //     console.log((i+1) + ": (" + path[i].rowAt + ", " + path[i].colAt + ")")
            // }
            // console.log(path)
    
            return;
        } else setTimeout(() => {
            try{
                currentNode.addNeightBor();
                closedList.push(currentNode);
            }
            catch(error){
                // console.log(closedList)
                console.log(error)
            }
            var i = 1;
            for (; i < openList.length; i++) {
                var k = i;
                for (; k > 0; k--) {
                    if (parseInt(openList[k].totalCost) > parseInt(openList[k - 1].totalCost)) {
                        temp = openList[k];
                        openList[k] = openList[k - 1];
                        openList[k - 1] = temp;
                    }
                }
            }
            iteration();
        }, timeStep);
    }
    catch(error){
        console.log(error)
    }
    
    

}

// console.log(path)

// for(i = 0; i<path.length; i++){
//     console.log((i+1) + ": (" + path[i].rowAt + ", " + path[i].colAt + ")")
// }

function getStartNode() {
    for (i = 0; i < row; i++) {
        for (j = 0; j < col; j++) {
            if (map[i][j] == start)
                return new Node(null, i, j, 0);
        }
    }
}