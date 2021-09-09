import Sprinkler from "./classes/Sprinkler";
import Wiper from "./classes/Wiper";
import { b2DebugDraw, b2Vec2, b2World, SCALE } from "./utils/box2dConf";
("strict-mode");

class App {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.init();
        this.setUp();
    }
    init() {
        this.canvas.width =
            window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth;
        this.canvas.height =
            window.innerHeight ||
            document.documentElement.clientHeight ||
            document.body.clientHeight;
    }

    setUp() {
        const gravity = new b2Vec2(0, -10);
        this.world = new b2World(gravity, true);

        this.debugDraw = new b2DebugDraw();
        this.debugDraw.SetSprite(this.ctx);
        this.debugDraw.SetDrawScale(SCALE);
        this.debugDraw.SetFillAlpha(0.5);
        this.debugDraw.SetLineThickness(1.0);
        this.debugDraw.SetFlags(
            b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit
        );

        this.world.SetDebugDraw(this.debugDraw);
    }

    draw_world() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = "#FFF4C9";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        //convert the canvas coordinate directions to cartesian
        this.ctx.save();
        this.ctx.translate(0, this.canvas.height);
        this.ctx.scale(1, -1);
        this.world.DrawDebugData();
        this.ctx.restore();
    }

    draw(timestamp) {
        const fps = 60;
        const timeStep = 1.0 / fps;

        //move the world ahead , step ahead man!!
        this.world.Step(timeStep, 8, 3);
        this.world.ClearForces();

        this.draw_world();

        requestAnimationFrame((timestamp) => {
            this.draw.call(this, timestamp);
        });
    }
}

window.onload = function () {
    const canvas = document.getElementById("canvas");
    const app = new App(canvas);
    requestAnimationFrame((timestamp) => {
        app.draw.call(app, timestamp);
    });
};
