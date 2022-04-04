import express, { Request, Response } from "express";
import { createConnection } from "typeorm";
import { PostController } from "./controller/post.contoller";
class Server {
    private postController: PostController;
    private app: express.Application;

    constructor(){
        this.app = express();
        this.configuration();
        this.postController = new PostController(); //Create a new instance of controller
        this.routes();
    }
//Configure the Server
    public configuration(){
        this.app.set("port", process.env.PORT || 3001);

    }
//Configure the Routes
    public async routes(){
        await createConnection({
            type: "postgres",
            host: "localhost",
            port: 5434,
            username: "blog",
            password: "blog",
            database: "blog",
            entities: ["build/database/entities/**/*.js"],
            synchronize: true,
            name: "blog"
            

        });
       
        this.app.get("/", (req: Request, res :Response) => {
            res.send("Hello Nigeria!");

        });

        this.app.use(`/api/posts/`, this.postController.router); // Configure the new routes
    }

    
    // Start server
    public start(){
        this.app.listen(this.app.get("port"), () => {
            console.log(`Server is listening ${this.app.get("port")} port.`);
        });
    }
}

const server = new Server(); // Create server instance
server.start(); // Execute the server