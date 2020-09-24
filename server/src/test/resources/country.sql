-- MariaDB dump 10.17  Distrib 10.4.14-MariaDB, for Linux (x86_64)
--
-- Host: faure    Database: cs314
-- ------------------------------------------------------
-- Server version	10.3.22-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `country`
--

DROP TABLE IF EXISTS `country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `country` (
  `index` int(11) NOT NULL,
  `id` varchar(10) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `continent` varchar(3) DEFAULT NULL,
  `wikipedia_link` varchar(1000) DEFAULT NULL,
  `keywords` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `countries_code_idx` (`id`),
  FULLTEXT KEY `countries_name_idx` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `country`
--
-- WHERE:  name like 'A%'

LOCK TABLES `country` WRITE;
/*!40000 ALTER TABLE `country` DISABLE KEYS */;
INSERT INTO `country` VALUES (302672,'AD','Andorra','EU','http://en.wikipedia.org/wiki/Andorra',NULL),(302619,'AF','Afghanistan','AS','http://en.wikipedia.org/wiki/Afghanistan',NULL),(302722,'AG','Antigua and Barbuda','NA','http://en.wikipedia.org/wiki/Antigua_and_Barbuda',NULL),(302723,'AI','Anguilla','NA','http://en.wikipedia.org/wiki/Anguilla',NULL),(302673,'AL','Albania','EU','http://en.wikipedia.org/wiki/Albania',NULL),(302620,'AM','Armenia','AS','http://en.wikipedia.org/wiki/Armenia',NULL),(302556,'AO','Angola','AF','http://en.wikipedia.org/wiki/Angola',NULL),(302615,'AQ','Antarctica','AN','http://en.wikipedia.org/wiki/Antarctica',NULL),(302789,'AR','Argentina','SA','http://en.wikipedia.org/wiki/Argentina','Aeropuertos de Argentina'),(302763,'AS','American Samoa','OC','http://en.wikipedia.org/wiki/American_Samoa',NULL),(302674,'AT','Austria','EU','http://en.wikipedia.org/wiki/Austria','Flughäfen in Österreich'),(302764,'AU','Australia','OC','http://en.wikipedia.org/wiki/Australia',NULL),(302725,'AW','Aruba','NA','http://en.wikipedia.org/wiki/Aruba',NULL),(302621,'AZ','Azerbaijan','AS','http://en.wikipedia.org/wiki/Azerbaijan',NULL),(302568,'DZ','Algeria','AF','http://en.wikipedia.org/wiki/Algeria','?????? ???????');
/*!40000 ALTER TABLE `country` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-24 13:05:27
