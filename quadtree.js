class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Rectangle {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
}

class Quadtree {
    constructor(boundry) {
        this.boundry = boundry;
        this.isSubdivided = false;
        this.point = null;
        this.children = [];
    }

    subdivide() {
        if(this.tooSmall()){
            return;
        }
        if(this.isSubdivided){
            return;
        }
        let x = this.boundry.x;
        let y = this.boundry.y;
        let w = this.boundry.w / 2;
        let h = this.boundry.h / 2;

        let ne = new Rectangle(x + w, y, w, h);
        this.children.push(new Quadtree(ne));
        let nw = new Rectangle(x + w, y + h, w, h);
        this.children.push(new Quadtree(nw));
        let se = new Rectangle(x, y + h, w, h);
        this.children.push(new Quadtree(se));
        let sw = new Rectangle(x, y, w, h);
        this.children.push(new Quadtree(sw));
        this.isSubdivided = true;
    }

    insert(point) {
        if(point.x < this.boundry.x || point.x > this.boundry.x + this.boundry.w ||
            point.y < this.boundry.y || point.y > this.boundry.y + this.boundry.h){
            return;
        }
        if(!this.point && !this.isSubdivided){
            this.point = point;
            return;
        }
        if(!this.isSubdivided){
            this.subdivide();
            this.children.forEach(c => {
                c.insert(this.point);
                c.insert(point);
            })
            this.point = null;
            return;
        }
        this.children.forEach(c => {
            c.insert(point);
        })
    }

    draw(){
        stroke(0, 200, 100, 150);
        rect(this.boundry.x, this.boundry.y, this.boundry.w, this.boundry.h);
        if(this.point){
            stroke(0);
            circle(this.point.x, this.point.y, 2);
        }
        if(this.isSubdivided){
           this.children.forEach(c => {
               c.draw();
           })
        }
    }

    tooSmall() {
        return this.boundry.w < 4 || this.boundry.h < 4;
    }
}