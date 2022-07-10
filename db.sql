---!Table---
CREATE TABLE restaurants (
    id BIGSERIAL NOT NULL,
    name VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    price_range INT NOT NULL check (price_range >=1 and price_range<=5),
    delete_flag boolean NOT NULL,
    create_at_date_time timestamp NOT NULL,
    update_date_time timestamp ,
    delete_flag_date_time timestamp
);

--!insert
INSERT INTO restaurants(name,location,price_range,delete_flag, create_at_date_time) values ('TaiheoDev','vietnamese',3,false,'10-07-2022 17:02:30');

--!update
UPDATE restaurants
SET delete_flag = false
WHERE id='4';