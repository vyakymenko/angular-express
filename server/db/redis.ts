import * as redis from 'redis';
import { RedisClient } from 'redis';

/**
 * Init Names List.
 */
export function Init() {

  const redisClient: RedisClient = redis.createClient();

  redisClient.sadd('name-list',
    'Edsger Dijkstra',
    'Donald Knuth',
    'Alan Turing',
    'Grace Hopper',
    redis.print);

  redisClient.quit();
}
