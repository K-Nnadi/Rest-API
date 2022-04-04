import { EntityRepository,Repository } from "typeorm";
import { PostEntity } from "../database/post.entity";

@EntityRepository(PostEntity)
export class PostRepository extends Repository<PostEntity>{

}