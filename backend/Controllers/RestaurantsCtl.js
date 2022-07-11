const { format } = require("date-fns");
const pool = require("../Configs/Postgres");
const { set, get, del } = require("../Utils/Limited");
const CONTAINS = require("../Configs/contains");
const RedisCtrl = require("../Controllers/DeleteCache");
const RestaurantCtrl = {
  GetRestaurant: async (req, res) => {
    try {
      var DataCache = await get("restaurants");
      if (DataCache) {
        return res.json({
          status: 200,
          success: true,
          data: JSON.parse(DataCache),
        });
      }
      const restaurantRatingsData = await pool.query(
        "select * from restaurants  where delete_flag = false order by price_range DESC;"
      );
      await set("restaurants", JSON.stringify(restaurantRatingsData.rows));
      return res.json({
        status: 200,
        success: true,
        data: restaurantRatingsData.rows,
      });
    } catch (error) {
      res.status(503).json({
        status: 503,
        msg: "Server Is Busy",
      });
    }
  },
  GetRestaurantDelete: async (req, res) => {
    try {
      var DataCache = await get("flagRestaurants");
      if (DataCache) {
        return res.json({
          status: 200,
          success: true,
          data: JSON.parse(DataCache),
        });
      }
      const restaurantRatingsData = await pool.query(
        "select * from restaurants  where delete_flag = true order by price_range DESC;"
      );
      await set("flagRestaurants", JSON.stringify(restaurantRatingsData.rows));
      return res.json({
        status: 200,
        success: true,
        data: restaurantRatingsData.rows,
      });
    } catch (error) {
      res.status(503).json({
        status: 503,
        msg: "Server Is Busy",
      });
    }
  },
  GetIdRestaurantId: async (req, res) => {
    try {
      var DataCache = await get(req.params.id);
      if (DataCache) {
        return res.json({
          status: 200,
          success: true,
          data: JSON.parse(DataCache),
        });
      }
      const restaurantRatingsData = await pool.query(
        "select * from restaurants where id = $1",
        [req.params.id]
      );
      await set(req.params.id, JSON.stringify(restaurantRatingsData.rows));
      return res.json({
        status: 200,
        success: true,
        data: restaurantRatingsData.rows,
      });
    } catch (error) {
      res.status(503).json({
        status: 503,
        msg: "Server Is Busy",
      });
    }
  },
  CreateRestaurant: async (req, res) => {
    try {
      const { name, location, price_range } = req.body;
      let delete_flag = CONTAINS.DELETED_DISABLE;
      let create_at_date_time = `${format(new Date(), "dd-MM-yyyy HH:mm:ss")}`;
      await pool
        .query(
          "INSERT INTO restaurants (name, location, price_range, delete_flag,create_at_date_time) values ($1, $2, $3,$4,$5) returning *",
          [name, location, price_range, delete_flag, create_at_date_time]
        )
        .then((data) => {
          return res.status(201).json({
            status: "success",
            data: {
              restaurant: data.rows[0],
            },
          });
        })
        .catch((error) => {
          return res.status(503).json({
            status: 503,
            msg: "Server Is Busy",
          });
        });
    } catch (e) {
      return res.status(503).json({
        status: 503,
        msg: "Server Is Busy",
      });
    }
  },
  EditRestaurant: async (req, res) => {
    try {
      const { name, location, price_range, create_at_date_time } = req.body;
      let update_date_time = `${format(new Date(), "dd-MM-yyyy HH:mm:ss")}`;
      await pool
        .query(
          "UPDATE restaurants SET name = $1, location = $2, price_range = $3, create_at_date_time = $4, update_date_time = $5 where id = $6 returning *",
          [
            name,
            location,
            price_range,
            create_at_date_time,
            update_date_time,
            req.params.id,
          ]
        )
        .then(async (item) => {
          await del(req.params.id);
          await del("restaurants");
          return res.status(200).json({
            status: 200,
            msg: "Success",
          });
        })
        .catch((err) => {
          return res.status(503).json({
            status: 503,
            msg: "Server Is Busy",
          });
        });
    } catch (err) {
      return res.status(503).json({
        status: 503,
        msg: "Server Is Busy",
      });
    }
  },
  DeleteRestaurant: async (req, res) => {
    try {
      const { id } = req.body;
      const restaurantRatingsData = await pool.query(
        "select * from restaurants where delete_flag = false AND id = $1",
        [id]
      );
      if (restaurantRatingsData) {
        let name = restaurantRatingsData.rows[0].name;
        let location = restaurantRatingsData.rows[0].location;
        let price_range = restaurantRatingsData.rows[0].price_range;
        let create_at_date_time =
          restaurantRatingsData.rows[0].create_at_date_time;
        let delete_flag_date_time = `${format(
          new Date(),
          "dd-MM-yyyy HH:mm:ss"
        )}`;
        let delete_flag = CONTAINS.DELETED_ENABLE;
        await pool
          .query(
            "UPDATE restaurants SET name = $1, location = $2, price_range = $3, create_at_date_time = $4, delete_flag = $5 ,delete_flag_date_time = $6 where id = $7 returning *",
            [
              name,
              location,
              price_range,
              create_at_date_time,
              delete_flag,
              delete_flag_date_time,
              id,
            ]
          )
          .then(async (item) => {
            await del(req.params.id);
            await del("restaurants");
            await del("flagRestaurants");
            return res.status(200).json({
              status: 200,
              msg: "Success",
            });
          })
          .catch((err) => {
            return res.status(503).json({
              status: 503,
              msg: "Server Is Busy",
            });
          });
      }
    } catch (err) {
      return res.status(503).json({
        status: 503,
        msg: "Server Is Busy",
      });
    }
  },
  UndoRestaurant: async (req, res) => {
    try {
      const { id } = req.body;
      const restaurantRatingsData = await pool.query(
        "select * from restaurants where delete_flag = true AND id = $1",
        [id]
      );

      if (restaurantRatingsData) {
        let name = restaurantRatingsData.rows[0].name;
        let location = restaurantRatingsData.rows[0].location;
        let price_range = restaurantRatingsData.rows[0].price_range;
        let create_at_date_time =
          restaurantRatingsData.rows[0].create_at_date_time;
        let delete_flag_date_time = `${format(
          new Date(),
          "dd-MM-yyyy HH:mm:ss"
        )}`;
        let delete_flag = CONTAINS.DELETED_DISABLE;
        await pool
          .query(
            "UPDATE restaurants SET name = $1, location = $2, price_range = $3, create_at_date_time = $4, delete_flag = $5 ,delete_flag_date_time = $6 where id = $7 returning *",
            [
              name,
              location,
              price_range,
              create_at_date_time,
              delete_flag,
              delete_flag_date_time,
              id,
            ]
          )
          .then(async (item) => {
            await del(req.params.id);
            await del("restaurants");
            await del("flagRestaurants");
            return res.status(200).json({
              status: 200,
              msg: "Success",
            });
          })
          .catch((err) => {
            return res.status(503).json({
              status: 503,
              msg: "Server Is Busy",
            });
          });
      }
    } catch (err) {
      return res.status(503).json({
        status: 503,
        msg: "Server Is Busy",
      });
    }
  },
};
module.exports = RestaurantCtrl;
