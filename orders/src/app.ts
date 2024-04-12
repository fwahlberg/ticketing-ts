import express from 'express';
import 'express-async-errors';
import cookieSession from "cookie-session";
import {deleteOrderRouter} from "./routes/delete";
import {newOrderRouter} from "./routes/new";
import {indexOrderRouter} from "./routes";
import {showOrderRouter} from "./routes/show";

import {errorHandler, NotFoundError, currentUser} from "@fawtickets/common";


const app = express();

app.set('trust proxy', true);

app.use(express.json());
app.use(
    cookieSession({
        signed: false,
        secure: false
    })
)

app.use(currentUser);

app.use(newOrderRouter);
app.use(indexOrderRouter);
app.use(showOrderRouter);
app.use(deleteOrderRouter);

app.all('*', (req, res, next) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export {app};