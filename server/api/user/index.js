import {AsyncRouter} from 'express-async-router';
import objectId from 'express-param-objectid';
import * as controller from './user.controller';
import {isAuthenticated, isAdmin} from '../../auth/auth.service';

const router = new AsyncRouter();

router.param('id', objectId);

router.get('/', isAdmin(), controller.index);
router.post('/', controller.create);
router.get('/me', isAuthenticated(), controller.me);
router.put('/:id/password', isAuthenticated(), controller.changePassword);
router.get('/:id', isAuthenticated(), controller.show);
router.put('/:id', isAuthenticated(), controller.update);
router.delete('/:id', isAdmin(), controller.destroy);

export default router;
