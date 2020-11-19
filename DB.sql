CREATE DATABASE `datawarehouse`;

CREATE TABLE IF NOT EXISTS `datawarehouse`.`companies` 
(`id` INTEGER NOT NULL auto_increment , 
`name` VARCHAR(50) NOT NULL, 
`country` VARCHAR(50) NOT NULL, 
`city` VARCHAR(50) NOT NULL, 
`address` VARCHAR(50) NOT NULL, 
`email` VARCHAR(50) NOT NULL, 
`phone` VARCHAR(50) NOT NULL, 
`createdAt` DATETIME NOT NULL, 
`updatedAt` DATETIME NOT NULL, 
PRIMARY KEY (`id`)) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `datawarehouse`.`contacts` 
(`id` INTEGER NOT NULL auto_increment ,
 `name` VARCHAR(50) NOT NULL, 
 `lastname` VARCHAR(50) NOT NULL, 
 `role` VARCHAR(50) NOT NULL, 
 `email` VARCHAR(50) NOT NULL, 
 `company` VARCHAR(50) NOT NULL, 
 `region` VARCHAR(50) NOT NULL, 
 `country` VARCHAR(50) NOT NULL, 
 `city` VARCHAR(50) NOT NULL, 
 `address` VARCHAR(50) NOT NULL, 
 `interest` INTEGER NOT NULL, 
 `createdAt` DATETIME NOT NULL, 
 `updatedAt` DATETIME NOT NULL, 
 PRIMARY KEY (`id`)) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `datawarehouse`.`regions` 
(`id` INTEGER NOT NULL auto_increment ,
 `name` VARCHAR(50) NOT NULL,
  `createdAt` DATETIME NOT NULL,
 `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`)) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `datawarehouse`.`countries` 
(`id` INTEGER NOT NULL auto_increment ,
`name` VARCHAR(50) NOT NULL,
`createdAt` DATETIME NOT NULL,
`updatedAt` DATETIME NOT NULL,
`regionId` INTEGER,
PRIMARY KEY (`id`),
FOREIGN KEY (`regionId`) REFERENCES `regions` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `datawarehouse`.`cities` 
(`id` INTEGER NOT NULL auto_increment ,
 `name` VARCHAR(50) NOT NULL,
 `countryId` INTEGER,
  PRIMARY KEY (`id`),
     FOREIGN KEY (`countryId`) REFERENCES `countries` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB;   

CREATE TABLE IF NOT EXISTS `datawarehouse`.`users` 
(`id` INTEGER NOT NULL auto_increment ,
 `name` VARCHAR(255) NOT NULL,
  `lastname` VARCHAR(255) NOT NULL,
   `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
     `rol` VARCHAR(255) NOT NULL,
      `createdAt` DATETIME NOT NULL,
       `updatedAt` DATETIME NOT NULL,
        PRIMARY KEY (`id`)) ENGINE=InnoDB;

INSERT INTO `datawarehouse`.`users` 
    (`id`,`name`, `lastname`, `email`,`password`,`rol`, `createdAt`, `updatedAt`)
VALUES 
    ('1','Jhonatan', 'Gomez','admin@correo.com','$2a$10$44CMYADZ5tgIxoiRQR94X.D3pjSBx6aM2J6q0RF3uDpty9fDwGFi6','Administrador', '2020-11-19T04:41:07', '2020-11-19T04:41:07');

INSERT INTO `datawarehouse`.`regions` 
    (`id`,`name`, `createdAt`, `updatedAt`)
VALUES 
    ('1','LATAM', '2020-11-19T04:41:07', '2020-11-19T04:41:07'),
    ('2','NORTE AMERICA', '2020-11-19T04:44:40', '2020-11-19T04:44:40');

INSERT INTO `datawarehouse`.`countries` 
    (`id`,`name`, `createdAt`, `updatedAt`, `regionId`)
VALUES 
    ('1','Colombia', '2020-11-19T04:41:07', '2020-11-19T04:41:07', '1'),
    ('2','Estados Unidos', '2020-11-19T04:44:40', '2020-11-19T04:44:40', '2');

INSERT INTO `datawarehouse`.`cities` 
    (`id`,`name`, `countryId`)
VALUES 
    ('1','Medellin', '1'),
    ('2','New York', '2');