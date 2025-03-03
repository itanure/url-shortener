import { Express, Request, Response } from "express";
import { container } from "tsyringe";
import { URLController } from "../controllers/UrlController";
import { AuthController } from "../controllers/AuthController";
import { UserController } from '../controllers/UserController';

const urlController = container.resolve(URLController);
const userController = container.resolve(UserController);
const authController = container.resolve(AuthController);

function routes(app: Express) {

    app.post("/api/url/shorten", (request: Request, response: Response, next) => {
        urlController.createShortUrl(request, response).catch(next);
    });

    app.get("/api/url/:shortCode", (request: Request, response: Response, next) => {
        urlController.redirectToOriginalUrl(request, response).catch(next);
    });

    app.put("/api/url/changeSlug", (request: Request, response: Response, next) => {
        urlController.changeSlug(request, response).catch(next);
    });

    app.get("/api/url/:shortCode/views", (request: Request, response: Response, next) => {
        urlController.getTotalViews(request, response).catch(next);
    });

    app.post("/api/users/", (request: Request, response: Response, next) => {
        userController.register(request, response).catch(next);
    });
    
    app.get('/api/users/:userId/urls', (request: Request, response: Response, next) => {
        userController.getUserUrls(request, response).catch(next);
    });

    app.post("/api/auth", (request: Request, response: Response, next) => {
        authController.authenticate(request, response).catch(next);
    });
}

export default routes;
