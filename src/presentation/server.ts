import express, {Router} from 'express';
import cors from 'cors';

interface Options {
  port: number;
  routes: Router;
}


export class Server {
  public readonly app = express();
  private serverListener?: any;
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: Options){
    this.port = options.port;
    this.routes = options.routes;
  }

  async start(){
    //* Middlewares
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true })); //x-www-form-urlencoded
    this.app.use(cors());

    //* Routes
    this.app.use(this.routes);

    this.serverListener = this.app.listen(this.port, () => {
      console.log('Server ready to be running on port: ', this.port);
    });
  }

  public close() {
    this.serverListener?.close();
  }
}