import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { CreateSpecificationController } from '../modules/cars/useCases/createSpecification/CreateSpecificationController';
import { ListSpecificationsController } from '../modules/cars/useCases/listSpecifications/listSpecificationsController';

const createSpecificationController = new CreateSpecificationController();
const listSpecificationsController = new ListSpecificationsController();

const specificationsRoutes = Router();
// teste de autenticação
specificationsRoutes.use(ensureAuthenticated);

specificationsRoutes.post('/', createSpecificationController.handle);
specificationsRoutes.get('/', listSpecificationsController.handle);

export { specificationsRoutes };
