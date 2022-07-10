"use strict";
const REDIS = require("../configs/RedisIo");
const get = async (key) => {
  return new Promise((resolve, reject) => {
    REDIS.get(key, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};
const set = async (key, count) => {
  return new Promise((resolve, reject) => {
    REDIS.set(key, count, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};
const del = async (key) => {
  return new Promise((resolve, reject) => {
    REDIS.del(key, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const exists = async (key) => {
  return new Promise((resolve, reject) => {
    REDIS.exists(key, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  get,
  set,
  del,
  exists,
};
