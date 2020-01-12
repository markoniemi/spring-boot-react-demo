import * as Http from "http";
import Webpack from "webpack";
import {Compiler} from "webpack";
import WebpackDevServer from "webpack-dev-server";
import {Configuration} from "webpack-dev-server";
import * as logger from "winston";
import webpackConfig from "../webpack.config";

export default class Server {
    private readonly compiler: Compiler;
    private readonly devServerConfig: Configuration;
    private server: Http.Server;

    public constructor(private readonly serverHost: string, private readonly serverPort: number,
                       private readonly backendHost: string, private readonly backendPort: number) {
        this.compiler = Webpack(webpackConfig);
        this.devServerConfig = {
            contentBase: "./public",
            hot: true,
            proxy: {
                "/api/*": `http://${backendHost}:${backendPort}`,
            },
            publicPath: "",
            historyApiFallback: true,
        };
    }

    public start(): Http.Server {
        const server = new WebpackDevServer(this.compiler, this.devServerConfig);
        this.server = server.listen(this.serverPort, this.serverHost, (err) => {
            if (err) {
                logger.error(err.message);
            }
            logger.info(`Local web server runs at http://${this.serverHost}:${this.serverPort}`);
        });
        return this.server;
    }

    public async stop(): Promise<void> {
        await this.server.close();
    }
}
