-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Ott 01, 2023 alle 19:31
-- Versione del server: 10.4.25-MariaDB
-- Versione PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ddgames`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `bg_color` char(7) NOT NULL,
  `name_color` char(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `category`
--

INSERT INTO `category` (`id`, `name`, `bg_color`, `name_color`) VALUES
(1, 'Arcade', '#bfcbfa', '#103eee'),
(2, 'Puzzle', '#fadabf', '#d08905'),
(3, 'Platform', '#ebefb0', '#aaaa00'),
(4, 'Adventure', '#c1f6be', '#1abf1a'),
(5, 'Logic', '#f5dadf', '#d6677a'),
(6, 'Fighting', '#daaaaa', '#e33535');

-- --------------------------------------------------------

--
-- Struttura della tabella `game`
--

CREATE TABLE `game` (
  `id` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `title` varchar(20) NOT NULL,
  `description` text NOT NULL,
  `category` int(11) NOT NULL,
  `views` int(11) NOT NULL DEFAULT 0,
  `image_dir` text NOT NULL,
  `script_dir` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `game`
--

INSERT INTO `game` (`id`, `userid`, `title`, `description`, `category`, `views`, `image_dir`, `script_dir`) VALUES
(1, 1, 'Stickman: the game', 'This is a simple game where there is a stickman that has to face 10 levels.\nYou have to pass each level to unlock next one.\nHave fun!\n\nControls:\n– use W to jump\n– use A / D to move', 3, 78, 'C:\\Users\\Vincenzo\\Desktop\\Progetto - Copia\\uploads/1/1.png', 'C:\\Users\\Vincenzo\\Desktop\\Progetto - Copia\\uploads/1/1.js'),
(2, 1, 'Pac-Man LITE', 'This is a lighter version of Pac-Man. Have fun!\r\n\r\nControls:\r\n\r\n– Use W/A/S/D to move', 1, 387, 'C:\\Users\\Vincenzo\\Desktop\\Progetto - Copia\\uploads/2/2.jpg', 'C:\\Users\\Vincenzo\\Desktop\\Progetto - Copia\\uploads/2/2.js'),
(5, 1, 'Hangman Calculator', 'Have fun with math', 5, 40, 'C:\\Users\\Vincenzo\\Desktop\\Progetto - Copia\\uploads/5/5.png', 'C:\\Users\\Vincenzo\\Desktop\\Progetto - Copia\\uploads/5/5.js'),
(6, 1, 'Minesweeper', 'Controls:\r\n– right click/V to mark a box with a flag\r\n– left click/C to dig\r\n– R to restart', 2, 126, 'C:\\Users\\Vincenzo\\Desktop\\Progetto - Copia\\uploads/6/6.png', 'C:\\Users\\Vincenzo\\Desktop\\Progetto - Copia\\uploads/6/6.js'),
(7, 1, 'JustCopyIt', 'Each level has something you have to replicate in a limited amount of time', 2, 53, 'C:\\Users\\Vincenzo\\Desktop\\Progetto - Copia\\uploads/7/7.png', 'C:\\Users\\Vincenzo\\Desktop\\Progetto - Copia\\uploads/7/7.js');

-- --------------------------------------------------------

--
-- Struttura della tabella `review`
--

CREATE TABLE `review` (
  `gameid` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `description` text NOT NULL,
  `stars` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `review`
--

INSERT INTO `review` (`gameid`, `userid`, `description`, `stars`) VALUES
(1, 1, 'So fun!', 5),
(1, 2, 'A really cute 2D game.', 3),
(2, 1, 'Just play this', 5),
(2, 2, 'Really cute lighter version of pacman!', 4),
(5, 1, 'Cool', 3),
(6, 1, 'I like this', 5),
(6, 2, 'Very good!', 5),
(7, 1, 'Good for training visual memory', 5);

-- --------------------------------------------------------

--
-- Struttura della tabella `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `user`
--

INSERT INTO `user` (`id`, `email`, `username`, `password`) VALUES
(1, 'ddgames912@gmail.com', 'DDGames', '5ac109e09f6cb3803bf189604b86ff0864887232'),
(2, 'erica@gmail.com', 'Erica', '5ac109e09f6cb3803bf189604b86ff0864887232');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `game`
--
ALTER TABLE `game`
  ADD PRIMARY KEY (`id`),
  ADD KEY `game_ibfk_1` (`userid`),
  ADD KEY `category` (`category`);

--
-- Indici per le tabelle `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`gameid`,`userid`),
  ADD KEY `review_ibfk_2` (`userid`);

--
-- Indici per le tabelle `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT per la tabella `game`
--
ALTER TABLE `game`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT per la tabella `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `game`
--
ALTER TABLE `game`
  ADD CONSTRAINT `game_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `game_ibfk_2` FOREIGN KEY (`category`) REFERENCES `category` (`id`) ON DELETE CASCADE;

--
-- Limiti per la tabella `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `review_ibfk_1` FOREIGN KEY (`gameid`) REFERENCES `game` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `review_ibfk_2` FOREIGN KEY (`userid`) REFERENCES `user` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
