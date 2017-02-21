import {Router} from 'express';
import localPassport from './local/passport';
import localRoute from './local';

localPassport();

const router = new Router();

router.use('/local', localRoute);

export default router;