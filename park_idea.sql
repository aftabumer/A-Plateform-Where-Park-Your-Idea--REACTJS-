-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 09, 2019 at 08:16 PM
-- Server version: 5.7.21
-- PHP Version: 5.6.35

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `park idea`
--

-- --------------------------------------------------------

--
-- Table structure for table `idea`
--

DROP TABLE IF EXISTS `idea`;
CREATE TABLE IF NOT EXISTS `idea` (
  `idea_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `user_name` varchar(500) NOT NULL,
  `idea_title` varchar(500) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`idea_id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `idea`
--

INSERT INTO `idea` (`idea_id`, `user_id`, `user_name`, `idea_title`, `description`) VALUES
(1, 1, 'q', 'asdasd', 'asdasd'),
(2, 1, 'q', 'fafs', 'fsafsaf'),
(3, 1, 'q', '1431', '11515'),
(4, 2, 'sarim', 'cs go', 'best game in the world\n'),
(5, 2, '', '123', '14124'),
(6, 4, 'mohammed soban', 'sdada', 'fafa'),
(7, 4, 'mohammed soban', 'asfdsa', 'fsafas'),
(8, 4, 'mohammed soban', '', 'fsaf'),
(9, 4, 'mohammed soban', 'hello', 'jdopaehjod hasopi hd ouiashopd aspodh poashpd aspi dpiasd pasj dasd asjd asdjas das\nd as]d ]asd\n oasod \naso\nd oas\ndo \naspo\nd las\nld'),
(10, 4, 'mohammed soban', 'aftab', 'gfa fgoashlfd hsalhd ;as;dja;sk d]askd askd kask dask dask\ndaskdsakd]sakdk\nasd\nsaldlsa\n'),
(11, 4, 'mohammed soban', 'afas', 'fsafsafsa');

-- --------------------------------------------------------

--
-- Table structure for table `signup`
--

DROP TABLE IF EXISTS `signup`;
CREATE TABLE IF NOT EXISTS `signup` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `f_name` varchar(500) NOT NULL,
  `l_name` varchar(500) NOT NULL,
  `email` varchar(500) NOT NULL,
  `password` varchar(500) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `signup`
--

INSERT INTO `signup` (`user_id`, `f_name`, `l_name`, `email`, `password`) VALUES
(1, 'q', 'q', 'q', 'qq'),
(2, 'sarim', 'shahid', 'syedsarim65@gmail.com', '123'),
(3, 'mohammed soban', 'waraich', 'mohammedsoban1@gmail.com', 'soabn123'),
(4, 'mohammed soban', 'mohammed soban', 'mohammed soban', '1'),
(5, '1', '1', '1', '1'),
(6, '2', '2', '2', '2'),
(7, '3', '3', '3', '3'),
(8, '3', '4', '5', '5'),
(9, '5', '14', '42', '1'),
(10, '', '', '', '1'),
(11, 'mohammed soban', '1', 'qqq', 'q'),
(12, 's', 'afa', '214', '55'),
(13, 'asd', 'asdsa', 'adsasd', 'a');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;