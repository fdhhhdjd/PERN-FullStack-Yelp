const { del } = require("../Utils/Limited.js");
const RedisCtrl = {
  deleteCacheRedis: async (req, res) => {
    try {
      const { key } = req.body;
      await del(key)
        .then((item) => {
          res.status(200).json({
            status: 200,
            msg: "delete cache success",
          });
        })
        .catch((error) => {
          res.status(400).json({
            status: 400,
            msg: "delete cache Fail",
            error: error,
          });
        });
    } catch (error) {
      res.status(503).json({
        status: 503,
        msg: "Server Is Busy",
      });
    }
  },
};
module.exports = RedisCtrl;
