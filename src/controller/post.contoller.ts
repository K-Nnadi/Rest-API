import { Request, Response, Router } from "express";
import { PostEntity } from "../database/post.entity";
import { PostService } from "../services/post.service"; //import service

export class PostController {
    public router: Router;
    private postService: PostService;

    constructor(){
        this.router = Router();
        this.postService = new PostService();
        this.routes();
    }

    public index = async (req:Request, res: Response) => {
        const posts = await this.postService.index();
        res.send(posts).json();
    }

    public create = async (req:Request, res: Response) => {
        const post = req["body"] as PostEntity;
        const newPost = await this.postService.create(post);
        res.send(newPost);
    }

    public update = async (req:Request, res: Response) => {
        const post = req["body"] as PostEntity;
        const id = req["params"]["id"]
        
        res.send(this.postService.update(post, Number(id)));
    }

    public delete = async (req:Request, res: Response) => {
        const id = req["params"]["id"];
        res.send(this.postService.delete(Number(id)));
    }

    public routes(){
        this.router.get("/", this.index);
        this.router.post("/", this.create);
        this.router.put("/", this.update);
        this.router.delete("/", this.delete);
    }
}