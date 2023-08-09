const size = 800;
let tree;

function setup() {
    createCanvas(size, size);
    background(255);
    let b = new Rectangle(0, 0, size, size);
    tree = new Quadtree(b)
}

function draw(){
    tree.draw();
}

function mouseDragged() {
    tree.insert(new Point(mouseX, mouseY));
    return false;
}