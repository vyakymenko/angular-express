import * as express from 'express';
import * as redis from 'redis';

export function nameListRedis(app: express.Application) {

  /**
   * Get name list
   */
  app.get('/api/name-list/redis',
    (req: express.Request, res: express.Response,
     next: express.NextFunction) => {

      const redisClient = redis.createClient();

      let nameList: string[] = [];

      redisClient.smembers('name-list',
        (err: Error | null, replies: string[]) => {
          console.log(`
          Reply length: ${replies.length}.
          Reply: ${replies}.`);
          nameList = replies;
          res.json(nameList);
      });

      redisClient.quit();
    });
}
