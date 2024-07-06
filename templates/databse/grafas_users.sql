USE grafas_users;

CREATE TABLE `users` (
`id` int NOT NULL AUTO_INCREMENT,
`apellido` varchar(45) DEFAULT NULL,
`nombre` varchar(45) DEFAULT NULL,
`mail` varchar(45) NOT NULL,
`comentario` text DEFAULT NULL,
`fecha` date DEFAULT NULL,
`leido` bit default 0,
PRIMARY KEY (`id`)
) ENGINE = innoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8; 