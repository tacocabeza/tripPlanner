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

LOCK TABLES `country` WRITE;
/*!40000 ALTER TABLE `country` DISABLE KEYS */;
INSERT INTO `country` VALUES (302672,'AD','Andorra','EU','http://en.wikipedia.org/wiki/Andorra',NULL),(302618,'AE','United Arab Emirates','AS','http://en.wikipedia.org/wiki/United_Arab_Emirates','UAE,?????? ?? ???????? ??????? ???????'),(302619,'AF','Afghanistan','AS','http://en.wikipedia.org/wiki/Afghanistan',NULL),(302722,'AG','Antigua and Barbuda','NA','http://en.wikipedia.org/wiki/Antigua_and_Barbuda',NULL),(302723,'AI','Anguilla','NA','http://en.wikipedia.org/wiki/Anguilla',NULL),(302673,'AL','Albania','EU','http://en.wikipedia.org/wiki/Albania',NULL),(302620,'AM','Armenia','AS','http://en.wikipedia.org/wiki/Armenia',NULL),(302556,'AO','Angola','AF','http://en.wikipedia.org/wiki/Angola',NULL),(302615,'AQ','Antarctica','AN','http://en.wikipedia.org/wiki/Antarctica',NULL),(302789,'AR','Argentina','SA','http://en.wikipedia.org/wiki/Argentina','Aeropuertos de Argentina'),(302763,'AS','American Samoa','OC','http://en.wikipedia.org/wiki/American_Samoa',NULL),(302674,'AT','Austria','EU','http://en.wikipedia.org/wiki/Austria','Flughäfen in Österreich'),(302764,'AU','Australia','OC','http://en.wikipedia.org/wiki/Australia',NULL),(302725,'AW','Aruba','NA','http://en.wikipedia.org/wiki/Aruba',NULL),(302621,'AZ','Azerbaijan','AS','http://en.wikipedia.org/wiki/Azerbaijan',NULL),(302675,'BA','Bosnia and Herzegovina','EU','http://en.wikipedia.org/wiki/Bosnia_and_Herzegovina',NULL),(302726,'BB','Barbados','NA','http://en.wikipedia.org/wiki/Barbados',NULL),(302622,'BD','Bangladesh','AS','http://en.wikipedia.org/wiki/Bangladesh',NULL),(302676,'BE','Belgium','EU','http://en.wikipedia.org/wiki/Belgium','Aéroports de Belgique,Luchthavens van België'),(302557,'BF','Burkina Faso','AF','http://en.wikipedia.org/wiki/Burkina_Faso',NULL),(302677,'BG','Bulgaria','EU','http://en.wikipedia.org/wiki/Bulgaria',NULL),(302623,'BH','Bahrain','AS','http://en.wikipedia.org/wiki/Bahrain','?????? ???????'),(302558,'BI','Burundi','AF','http://en.wikipedia.org/wiki/Burundi',NULL),(302559,'BJ','Benin','AF','http://en.wikipedia.org/wiki/Benin',NULL),(302760,'BL','Saint Barthélemy','NA','http://en.wikipedia.org/wiki/Saint_Barthélemy',NULL),(302727,'BM','Bermuda','NA','http://en.wikipedia.org/wiki/Bermuda',NULL),(302624,'BN','Brunei','AS','http://en.wikipedia.org/wiki/Brunei',NULL),(302790,'BO','Bolivia','SA','http://en.wikipedia.org/wiki/Bolivia','Aeropuertos de Bolivia'),(302724,'BQ','Caribbean Netherlands','NA','http://en.wikipedia.org/wiki/Caribbean_Netherlands',NULL),(302791,'BR','Brazil','SA','http://en.wikipedia.org/wiki/Brazil','Brasil, Brasilian'),(302728,'BS','Bahamas','NA','http://en.wikipedia.org/wiki/Bahamas',NULL),(302625,'BT','Bhutan','AS','http://en.wikipedia.org/wiki/Bhutan',NULL),(302560,'BW','Botswana','AF','http://en.wikipedia.org/wiki/Botswana',NULL),(302678,'BY','Belarus','EU','http://en.wikipedia.org/wiki/Belarus','Belarussian, ????????'),(302729,'BZ','Belize','NA','http://en.wikipedia.org/wiki/Belize',NULL),(302730,'CA','Canada','NA','http://en.wikipedia.org/wiki/Canada',NULL),(302626,'CC','Cocos (Keeling) Islands','AS','http://en.wikipedia.org/wiki/Cocos_(Keeling)_Islands',NULL),(302561,'CD','Congo (Kinshasa)','AF','http://en.wikipedia.org/wiki/Congo_(Kinshasa)',NULL),(302562,'CF','Central African Republic','AF','http://en.wikipedia.org/wiki/Central_African_Republic',NULL),(302563,'CG','Congo (Brazzaville)','AF','http://en.wikipedia.org/wiki/Congo_(Brazzaville)',NULL),(302679,'CH','Switzerland','EU','http://en.wikipedia.org/wiki/Switzerland','Aéroports de la Suisse,Flughäfen der Schweiz'),(302564,'CI','Côte d\'Ivoire','AF','http://en.wikipedia.org/wiki/Côte_d\'Ivoire','Ivory Coast'),(302765,'CK','Cook Islands','OC','http://en.wikipedia.org/wiki/Cook_Islands',NULL),(302792,'CL','Chile','SA','http://en.wikipedia.org/wiki/Chile','Aeropuertos de Chile'),(302565,'CM','Cameroon','AF','http://en.wikipedia.org/wiki/Cameroon',NULL),(302627,'CN','China','AS','http://en.wikipedia.org/wiki/China','?????'),(302793,'CO','Colombia','SA','http://en.wikipedia.org/wiki/Colombia','Aeropuertos de Colombia'),(302731,'CR','Costa Rica','NA','http://en.wikipedia.org/wiki/Costa_Rica','Aeropuertos de Costa Rica'),(302732,'CU','Cuba','NA','http://en.wikipedia.org/wiki/Cuba','Aeropuertos de Cuba'),(302566,'CV','Cape Verde','AF','http://en.wikipedia.org/wiki/Cape_Verde',NULL),(302762,'CW','Curaçao','NA','http://en.wikipedia.org/wiki/Cura%C3%A7ao',NULL),(302628,'CX','Christmas Island','AS','http://en.wikipedia.org/wiki/Christmas_Island',NULL),(302629,'CY','Cyprus','AS','http://en.wikipedia.org/wiki/Cyprus',NULL),(302680,'CZ','Czechia','EU','http://en.wikipedia.org/wiki/Czech_Republic','Letišt? ?eské republiky'),(302681,'DE','Germany','EU','http://en.wikipedia.org/wiki/Germany','Flughäfen in Deutschland'),(302567,'DJ','Djibouti','AF','http://en.wikipedia.org/wiki/Djibouti',NULL),(302682,'DK','Denmark','EU','http://en.wikipedia.org/wiki/Denmark','Lufthavnene i Danmark'),(302733,'DM','Dominica','NA','http://en.wikipedia.org/wiki/Dominica',NULL),(302734,'DO','Dominican Republic','NA','http://en.wikipedia.org/wiki/Dominican_Republic',NULL),(302568,'DZ','Algeria','AF','http://en.wikipedia.org/wiki/Algeria','?????? ???????'),(302794,'EC','Ecuador','SA','http://en.wikipedia.org/wiki/Ecuador','Aeropuertos de Ecuador'),(302683,'EE','Estonia','EU','http://en.wikipedia.org/wiki/Estonia',NULL),(302569,'EG','Egypt','AF','http://en.wikipedia.org/wiki/Egypt','?????? ???'),(302570,'EH','Western Sahara','AF','http://en.wikipedia.org/wiki/Western_Sahara','Sahrawian, ?????? ??????? ???????'),(302571,'ER','Eritrea','AF','http://en.wikipedia.org/wiki/Eritrea',NULL),(302684,'ES','Spain','EU','http://en.wikipedia.org/wiki/Spain','Aeropuertos de España'),(302572,'ET','Ethiopia','AF','http://en.wikipedia.org/wiki/Ethiopia',NULL),(302685,'FI','Finland','EU','http://en.wikipedia.org/wiki/Finland','Lentokentät, Suomen'),(302766,'FJ','Fiji','OC','http://en.wikipedia.org/wiki/Fiji',NULL),(302795,'FK','Falkland Islands','SA','http://en.wikipedia.org/wiki/Falkland_Islands',NULL),(302767,'FM','Micronesia','OC','https://en.wikipedia.org/wiki/Federated_States_of_Micronesia',NULL),(302686,'FO','Faroe Islands','EU','http://en.wikipedia.org/wiki/Faroe_Islands',NULL),(302687,'FR','France','EU','http://en.wikipedia.org/wiki/France','Aéroports de France'),(302573,'GA','Gabon','AF','http://en.wikipedia.org/wiki/Gabon',NULL),(302688,'GB','United Kingdom','EU','http://en.wikipedia.org/wiki/United_Kingdom','Great Britain'),(302735,'GD','Grenada','NA','http://en.wikipedia.org/wiki/Grenada',NULL),(302630,'GE','Georgia','AS','http://en.wikipedia.org/wiki/Georgia_(country)',NULL),(302796,'GF','French Guiana','SA','http://en.wikipedia.org/wiki/French_Guiana','French Guyana'),(302689,'GG','Guernsey','EU','http://en.wikipedia.org/wiki/Guernsey',NULL),(302574,'GH','Ghana','AF','http://en.wikipedia.org/wiki/Ghana',NULL),(302690,'GI','Gibraltar','EU','http://en.wikipedia.org/wiki/Gibraltar',NULL),(302736,'GL','Greenland','NA','http://en.wikipedia.org/wiki/Greenland',NULL),(302575,'GM','Gambia','AF','http://en.wikipedia.org/wiki/Gambia',NULL),(302576,'GN','Guinea','AF','http://en.wikipedia.org/wiki/Guinea','Aéroports de la Guinée'),(302737,'GP','Guadeloupe','NA','http://en.wikipedia.org/wiki/Guadeloupe',NULL),(302577,'GQ','Equatorial Guinea','AF','http://en.wikipedia.org/wiki/Equatorial_Guinea',NULL),(302691,'GR','Greece','EU','http://en.wikipedia.org/wiki/Greece','?????????? ???? ??????'),(302616,'GS','South Georgia and the South Sandwich Islands','AN','http://en.wikipedia.org/wiki/South_Georgia_and_the_South_Sandwich_Islands',NULL),(302738,'GT','Guatemala','NA','http://en.wikipedia.org/wiki/Guatemala','Aeropuertos de Guatemala'),(302768,'GU','Guam','OC','http://en.wikipedia.org/wiki/Guam',NULL),(302578,'GW','Guinea-Bissau','AF','http://en.wikipedia.org/wiki/Guinea-Bissau',NULL),(302797,'GY','Guyana','SA','http://en.wikipedia.org/wiki/Guyana',NULL),(302631,'HK','Hong Kong','AS','http://en.wikipedia.org/wiki/Hong_Kong',NULL),(302739,'HN','Honduras','NA','http://en.wikipedia.org/wiki/Honduras','Aeropuertos de Honduras'),(302692,'HR','Croatia','EU','http://en.wikipedia.org/wiki/Croatia',NULL),(302740,'HT','Haiti','NA','http://en.wikipedia.org/wiki/Haiti','Aéroports de Haïti'),(302693,'HU','Hungary','EU','http://en.wikipedia.org/wiki/Hungary','Repül?terek Magyarország'),(302632,'ID','Indonesia','AS','http://en.wikipedia.org/wiki/Indonesia','Bandara di Indonesia'),(302694,'IE','Ireland','EU','http://en.wikipedia.org/wiki/Ireland','Eire'),(302633,'IL','Israel','AS','http://en.wikipedia.org/wiki/Israel','???? ?????? ?? ?????'),(302695,'IM','Isle of Man','EU','http://en.wikipedia.org/wiki/Isle_of_Man',NULL),(302634,'IN','India','AS','http://en.wikipedia.org/wiki/India',NULL),(302635,'IO','British Indian Ocean Territory','AS','http://en.wikipedia.org/wiki/British_Indian_Ocean_Territory',NULL),(302636,'IQ','Iraq','AS','http://en.wikipedia.org/wiki/Iraq','?????? ??????'),(302637,'IR','Iran','AS','http://en.wikipedia.org/wiki/Iran','??????? ??? ?????'),(302696,'IS','Iceland','EU','http://en.wikipedia.org/wiki/Iceland',NULL),(302697,'IT','Italy','EU','http://en.wikipedia.org/wiki/Italy','Aeroporti d\'Italia'),(302698,'JE','Jersey','EU','http://en.wikipedia.org/wiki/Jersey',NULL),(302741,'JM','Jamaica','NA','http://en.wikipedia.org/wiki/Jamaica',NULL),(302638,'JO','Jordan','AS','http://en.wikipedia.org/wiki/Jordan','?????? ?? ??????'),(302639,'JP','Japan','AS','http://en.wikipedia.org/wiki/Japan','Nippon, ?????'),(302579,'KE','Kenya','AF','http://en.wikipedia.org/wiki/Kenya',NULL),(302640,'KG','Kyrgyzstan','AS','http://en.wikipedia.org/wiki/Kyrgyzstan',NULL),(302641,'KH','Cambodia','AS','http://en.wikipedia.org/wiki/Cambodia',NULL),(302769,'KI','Kiribati','OC','http://en.wikipedia.org/wiki/Kiribati',NULL),(302580,'KM','Comoros','AF','http://en.wikipedia.org/wiki/Comoros','??? ?????'),(302742,'KN','Saint Kitts and Nevis','NA','http://en.wikipedia.org/wiki/Saint_Kitts_and_Nevis',NULL),(302642,'KP','North Korea','AS','http://en.wikipedia.org/wiki/North_Korea',NULL),(302643,'KR','South Korea','AS','http://en.wikipedia.org/wiki/South_Korea','??? ??'),(302644,'KW','Kuwait','AS','http://en.wikipedia.org/wiki/Kuwait',NULL),(302743,'KY','Cayman Islands','NA','http://en.wikipedia.org/wiki/Cayman_Islands',NULL),(302645,'KZ','Kazakhstan','AS','http://en.wikipedia.org/wiki/Kazakhstan','Kazakh'),(302646,'LA','Laos','AS','http://en.wikipedia.org/wiki/Laos',NULL),(302647,'LB','Lebanon','AS','http://en.wikipedia.org/wiki/Lebanon','???????? ?? ?????'),(302744,'LC','Saint Lucia','NA','http://en.wikipedia.org/wiki/Saint_Lucia',NULL),(302699,'LI','Liechtenstein','EU','http://en.wikipedia.org/wiki/Liechtenstein',NULL),(302648,'LK','Sri Lanka','AS','http://en.wikipedia.org/wiki/Sri_Lanka',NULL),(302581,'LR','Liberia','AF','http://en.wikipedia.org/wiki/Liberia',NULL),(302582,'LS','Lesotho','AF','http://en.wikipedia.org/wiki/Lesotho',NULL),(302700,'LT','Lithuania','EU','http://en.wikipedia.org/wiki/Lithuania',NULL),(302701,'LU','Luxembourg','EU','http://en.wikipedia.org/wiki/Luxembourg',NULL),(302702,'LV','Latvia','EU','http://en.wikipedia.org/wiki/Latvia',NULL),(302583,'LY','Libya','AF','http://en.wikipedia.org/wiki/Libya','?????? ?? ?????'),(302584,'MA','Morocco','AF','http://en.wikipedia.org/wiki/Morocco','?????? ??????'),(302703,'MC','Monaco','EU','http://en.wikipedia.org/wiki/Monaco',NULL),(302704,'MD','Moldova','EU','http://en.wikipedia.org/wiki/Moldova',NULL),(302705,'ME','Montenegro','EU','http://en.wikipedia.org/wiki/Montenegro',NULL),(302759,'MF','Saint Martin','NA','http://en.wikipedia.org/wiki/Saint_Martin_(France)',NULL),(302585,'MG','Madagascar','AF','http://en.wikipedia.org/wiki/Madagascar',NULL),(302770,'MH','Marshall Islands','OC','http://en.wikipedia.org/wiki/Marshall_Islands',NULL),(302706,'MK','Macedonia','EU','http://en.wikipedia.org/wiki/Macedonia',NULL),(302586,'ML','Mali','AF','http://en.wikipedia.org/wiki/Mali','Aéroports du Mali'),(302649,'MM','Burma','AS','http://en.wikipedia.org/wiki/Burma','Myanmar'),(302650,'MN','Mongolia','AS','http://en.wikipedia.org/wiki/Mongolia',NULL),(302651,'MO','Macau','AS','http://en.wikipedia.org/wiki/Macau','Macao'),(302771,'MP','Northern Mariana Islands','OC','http://en.wikipedia.org/wiki/Northern_Mariana_Islands',NULL),(302745,'MQ','Martinique','NA','http://en.wikipedia.org/wiki/Martinique',NULL),(302587,'MR','Mauritania','AF','http://en.wikipedia.org/wiki/Mauritania','?????? ?????????'),(302746,'MS','Montserrat','NA','http://en.wikipedia.org/wiki/Montserrat',NULL),(302707,'MT','Malta','EU','http://en.wikipedia.org/wiki/Malta',NULL),(302588,'MU','Mauritius','AF','http://en.wikipedia.org/wiki/Mauritius',NULL),(302652,'MV','Maldives','AS','http://en.wikipedia.org/wiki/Maldives',NULL),(302589,'MW','Malawi','AF','http://en.wikipedia.org/wiki/Malawi',NULL),(302747,'MX','Mexico','NA','http://en.wikipedia.org/wiki/Mexico','Aeropuertos de México'),(302653,'MY','Malaysia','AS','http://en.wikipedia.org/wiki/Malaysia','Lapangan Terbang Malaysia'),(302590,'MZ','Mozambique','AF','http://en.wikipedia.org/wiki/Mozambique',NULL),(302591,'NA','Namibia','AF','http://en.wikipedia.org/wiki/Namibia',NULL),(302772,'NC','New Caledonia','OC','http://en.wikipedia.org/wiki/New_Caledonia',NULL),(302592,'NE','Niger','AF','http://en.wikipedia.org/wiki/Niger',NULL),(302773,'NF','Norfolk Island','OC','http://en.wikipedia.org/wiki/Norfolk_Island',NULL),(302593,'NG','Nigeria','AF','http://en.wikipedia.org/wiki/Nigeria',NULL),(302748,'NI','Nicaragua','NA','http://en.wikipedia.org/wiki/Nicaragua','Aeropuertos de Nicaragua'),(302708,'NL','Netherlands','EU','http://en.wikipedia.org/wiki/Netherlands','Holland,Luchthavens van Nederland'),(302709,'NO','Norway','EU','http://en.wikipedia.org/wiki/Norway','Flyplasser i Norge'),(302654,'NP','Nepal','AS','http://en.wikipedia.org/wiki/Nepal','????? ???????????'),(302774,'NR','Nauru','OC','http://en.wikipedia.org/wiki/Nauru',NULL),(302775,'NU','Niue','OC','http://en.wikipedia.org/wiki/Niue',NULL),(302776,'NZ','New Zealand','OC','http://en.wikipedia.org/wiki/New_Zealand',NULL),(302655,'OM','Oman','AS','http://en.wikipedia.org/wiki/Oman','?????? ????'),(302749,'PA','Panama','NA','http://en.wikipedia.org/wiki/Panama','Aeropuertos de Panamá'),(302798,'PE','Perú','SA','http://en.wikipedia.org/wiki/Perú','Aeropuertos de Perú'),(302777,'PF','French Polynesia','OC','http://en.wikipedia.org/wiki/French_Polynesia',NULL),(302778,'PG','Papua New Guinea','OC','http://en.wikipedia.org/wiki/Papua_New_Guinea',NULL),(302656,'PH','Philippines','AS','http://en.wikipedia.org/wiki/Philippines','Mga alternatibong byahe mula sa Pilipinas'),(302657,'PK','Pakistan','AS','http://en.wikipedia.org/wiki/Pakistan','??????? ?? ????? ????'),(302710,'PL','Poland','EU','http://en.wikipedia.org/wiki/Poland','Lotniska Polski'),(302750,'PM','Saint Pierre and Miquelon','NA','http://en.wikipedia.org/wiki/Saint_Pierre_and_Miquelon',NULL),(302779,'PN','Pitcairn','OC','http://en.wikipedia.org/wiki/Pitcairn',NULL),(302751,'PR','Puerto Rico','NA','http://en.wikipedia.org/wiki/Puerto_Rico',NULL),(302658,'PS','Palestinian Territory','AS','http://en.wikipedia.org/wiki/Palestinian_Territory',NULL),(302711,'PT','Portugal','EU','http://en.wikipedia.org/wiki/Portugal','Aeroportos do Brasil'),(302780,'PW','Palau','OC','http://en.wikipedia.org/wiki/Palau',NULL),(302799,'PY','Paraguay','SA','http://en.wikipedia.org/wiki/Paraguay','Aeropuertos de Paraguay'),(302659,'QA','Qatar','AS','http://en.wikipedia.org/wiki/Qatar','?????? ???'),(302594,'RE','Réunion','AF','http://en.wikipedia.org/wiki/Réunion','Île Bourbon, La Réunion'),(302712,'RO','Romania','EU','http://en.wikipedia.org/wiki/Romania','Aeroporturi din România'),(302713,'RS','Serbia','EU','http://en.wikipedia.org/wiki/Serbia','Serb'),(302714,'RU','Russia','EU','http://en.wikipedia.org/wiki/Russia','Soviet, Sovietskaya, Sovetskaya, ????????? ??????'),(302595,'RW','Rwanda','AF','http://en.wikipedia.org/wiki/Rwanda',NULL),(302660,'SA','Saudi Arabia','AS','http://en.wikipedia.org/wiki/Saudi_Arabia','?????? ??????? ??????? ????????,???????? ????? ????'),(302781,'SB','Solomon Islands','OC','http://en.wikipedia.org/wiki/Solomon_Islands',NULL),(302596,'SC','Seychelles','AF','http://en.wikipedia.org/wiki/Seychelles',NULL),(302597,'SD','Sudan','AF','http://en.wikipedia.org/wiki/Sudan','?????? ???????'),(302715,'SE','Sweden','EU','http://en.wikipedia.org/wiki/Sweden','Flygplatserna i Sverige'),(302661,'SG','Singapore','AS','http://en.wikipedia.org/wiki/Singapore',NULL),(302598,'SH','Saint Helena','AF','http://en.wikipedia.org/wiki/Saint_Helena',NULL),(302716,'SI','Slovenia','EU','http://en.wikipedia.org/wiki/Slovenia',NULL),(302717,'SK','Slovakia','EU','http://en.wikipedia.org/wiki/Slovakia','letisko Slovenska'),(302599,'SL','Sierra Leone','AF','http://en.wikipedia.org/wiki/Sierra_Leone',NULL),(302718,'SM','San Marino','EU','http://en.wikipedia.org/wiki/San_Marino',NULL),(302600,'SN','Senegal','AF','http://en.wikipedia.org/wiki/Senegal','Aéroports du Sénégal'),(302601,'SO','Somalia','AF','http://en.wikipedia.org/wiki/Somalia',NULL),(302800,'SR','Suriname','SA','http://en.wikipedia.org/wiki/Suriname',NULL),(302614,'SS','South Sudan','AF','http://en.wikipedia.org/wiki/South_Sudan',NULL),(302602,'ST','São Tomé and Principe','AF','http://en.wikipedia.org/wiki/São_Tomé_and_Principe',NULL),(302752,'SV','El Salvador','NA','http://en.wikipedia.org/wiki/El_Salvador','Salvadorian, Salvadorean'),(302761,'SX','Sint Maarten','NA','http://en.wikipedia.org/wiki/Sint_Maarten',NULL),(302662,'SY','Syria','AS','http://en.wikipedia.org/wiki/Syria','?????? ?????'),(302603,'SZ','Swaziland','AF','http://en.wikipedia.org/wiki/Swaziland',NULL),(302753,'TC','Turks and Caicos Islands','NA','http://en.wikipedia.org/wiki/Turks_and_Caicos_Islands',NULL),(302604,'TD','Chad','AF','http://en.wikipedia.org/wiki/Chad',NULL),(302617,'TF','French Southern Territories','AN','http://en.wikipedia.org/wiki/French_Southern_Territories',NULL),(302605,'TG','Togo','AF','http://en.wikipedia.org/wiki/Togo',NULL),(302663,'TH','Thailand','AS','http://en.wikipedia.org/wiki/Thailand','Siam, Siamese'),(302664,'TJ','Tajikistan','AS','http://en.wikipedia.org/wiki/Tajikistan','Tajik'),(302782,'TK','Tokelau','OC','http://en.wikipedia.org/wiki/Tokelau',NULL),(302665,'TL','Timor-Leste','AS','http://en.wikipedia.org/wiki/Timor-Leste','East Timor'),(302666,'TM','Turkmenistan','AS','http://en.wikipedia.org/wiki/Turkmenistan',NULL),(302606,'TN','Tunisia','AF','http://en.wikipedia.org/wiki/Tunisia','?????? ????'),(302783,'TO','Tonga','OC','http://en.wikipedia.org/wiki/Tonga',NULL),(302667,'TR','Turkey','AS','http://en.wikipedia.org/wiki/Turkey','Türkiye havaalanlar?'),(302754,'TT','Trinidad and Tobago','NA','http://en.wikipedia.org/wiki/Trinidad_and_Tobago',NULL),(302784,'TV','Tuvalu','OC','http://en.wikipedia.org/wiki/Tuvalu',NULL),(302668,'TW','Taiwan','AS','http://en.wikipedia.org/wiki/Taiwan',NULL),(302607,'TZ','Tanzania','AF','http://en.wikipedia.org/wiki/Tanzania',NULL),(302719,'UA','Ukraine','EU','http://en.wikipedia.org/wiki/Ukraine','????????? ???????'),(302608,'UG','Uganda','AF','http://en.wikipedia.org/wiki/Uganda',NULL),(302785,'UM','United States Minor Outlying Islands','OC','http://en.wikipedia.org/wiki/United_States_Minor_Outlying_Islands',NULL),(302755,'US','United States','NA','http://en.wikipedia.org/wiki/United_States','America'),(302801,'UY','Uruguay','SA','http://en.wikipedia.org/wiki/Uruguay','Aeropuertos de Uruguay'),(302669,'UZ','Uzbekistan','AS','http://en.wikipedia.org/wiki/Uzbekistan','Uzbek'),(302721,'VA','Vatican City','EU','http://en.wikipedia.org/wiki/Vatican_City','The Holy See'),(302756,'VC','Saint Vincent and the Grenadines','NA','http://en.wikipedia.org/wiki/Saint_Vincent_and_the_Grenadines',NULL),(302802,'VE','Venezuela','SA','http://en.wikipedia.org/wiki/Venezuela','Aeropuertos de Venezuela'),(302757,'VG','British Virgin Islands','NA','http://en.wikipedia.org/wiki/British_Virgin_Islands',NULL),(302758,'VI','U.S. Virgin Islands','NA','http://en.wikipedia.org/wiki/U.S._Virgin_Islands',NULL),(302670,'VN','Vietnam','AS','http://en.wikipedia.org/wiki/Vietnam','Các sân bay c?a Vi?t Nam'),(302786,'VU','Vanuatu','OC','http://en.wikipedia.org/wiki/Vanuatu',NULL),(302787,'WF','Wallis and Futuna','OC','http://en.wikipedia.org/wiki/Wallis_and_Futuna',NULL),(302788,'WS','Samoa','OC','http://en.wikipedia.org/wiki/Samoa',NULL),(302720,'XK','Kosovo','EU','http://en.wikipedia.org/wiki/Kosovo','Kosova'),(302671,'YE','Yemen','AS','http://en.wikipedia.org/wiki/Yemen','?????? ?????'),(302609,'YT','Mayotte','AF','http://en.wikipedia.org/wiki/Mayotte',NULL),(302610,'ZA','South Africa','AF','http://en.wikipedia.org/wiki/South_Africa',NULL),(302611,'ZM','Zambia','AF','http://en.wikipedia.org/wiki/Zambia',NULL),(302612,'ZW','Zimbabwe','AF','http://en.wikipedia.org/wiki/Zimbabwe',NULL),(302613,'ZZ','Unknown or unassigned country','AF','http://en.wikipedia.org/wiki/Unknown_or_unassigned_country',NULL);
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

-- Dump completed on 2020-09-24 22:56:08
