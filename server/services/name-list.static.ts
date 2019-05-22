import * as express from 'express';
import * as nameData from '../data/name.list.json';

export function nameListStatic(app: express.Application) {

  /**
   * Get name list
   */
  app.get('/api/name-list/static',
    (req: express.Request, res: express.Response,
     next: express.NextFunction) => {

      res.json(nameData);
    });
}
