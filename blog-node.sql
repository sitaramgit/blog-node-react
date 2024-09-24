-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 24, 2024 at 09:07 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `blog-node`
--

-- --------------------------------------------------------

--
-- Table structure for table `blogs`
--

CREATE TABLE `blogs` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `blogs`
--

INSERT INTO `blogs` (`id`, `user_id`, `title`, `content`, `created_at`, `updated_at`) VALUES
(1, 3, ' available as package scripts:', '<p>More tasks are available as package scripts:</p><p>ScriptDescription<code>npm run build</code>Builds lib and browser bundle<code>npm run watch</code>Rebuilds on source code changes<code>npm run test</code>Runs unit tests and coverage<code>npm run clean</code>Cleans build artifacts<code>npm run demo</code>Serves a simple ReactQuill test application</p><h2><br></h2><h2>Browser support</h2><p><br></p>', '2024-09-24 18:59:34', '2024-09-24 18:59:34'),
(2, 3, ' available as package scripts:', '<p>More tasks are available as package scripts:</p><p>ScriptDescription<code>npm run build</code>Builds lib and browser bundle<code>npm run watch</code>Rebuilds on source code changes<code>npm run test</code>Runs unit tests and coverage<code>npm run clean</code>Cleans build artifacts<code>npm run demo</code>Serves a simple ReactQuill test application</p><h2><br></h2><h2>Browser support</h2><p><br></p>', '2024-09-24 19:06:31', '2024-09-24 19:06:31');

-- --------------------------------------------------------

--
-- Table structure for table `blog_files`
--

CREATE TABLE `blog_files` (
  `id` int(11) NOT NULL,
  `blog_id` int(11) NOT NULL,
  `file_name` varchar(255) NOT NULL,
  `file_path` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `blog_files`
--

INSERT INTO `blog_files` (`id`, `blog_id`, `file_name`, `file_path`, `created_at`, `updated_at`) VALUES
(1, 1, 'Screenshot 2024-02-20 075508.png', 'uploads\\f1e1345cd24d9f7c43e54a9164800e3e', '2024-09-24 18:59:34', '2024-09-24 18:59:34'),
(2, 2, 'Screenshot 2024-02-20 075508.png', 'uploads\\1727204791355-coverImage.png', '2024-09-24 19:06:31', '2024-09-24 19:06:31');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(10) NOT NULL,
  `mobile` int(12) NOT NULL,
  `socialName` varchar(50) NOT NULL,
  `socialPicture` text NOT NULL,
  `isSocialUser` tinyint(1) NOT NULL DEFAULT 0,
  `status` int(1) NOT NULL DEFAULT 1,
  `token` text NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `password`, `mobile`, `socialName`, `socialPicture`, `isSocialUser`, `status`, `token`, `createdAt`, `updatedAt`) VALUES
(3, 'sitaram', 'kudireddy', 'sitaramkdks@gmail.com', 'SIqV1', 0, 'sitaram kudireddy', 'https://lh3.googleusercontent.com/a/ACg8ocIbfEzSKQa5ETtjzhPhGMPYbPxQ74fCWw9I2nFM2dhRUadb7dQ=s96-c', 1, 1, 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjVhYWZmNDdjMjFkMDZlMjY2Y2NlMzk1YjIxNDVjN2M2ZDQ3MzBlYTUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI5MDU4NDAzMDYyOTYtZWZiMnRkbGNoaXAyam1jZHE0czJqdjEzMjN0a2gyYWsuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI5MDU4NDAzMDYyOTYtZWZiMnRkbGNoaXAyam1jZHE0czJqdjEzMjN0a2gyYWsuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTc1NjkyOTA1NTA2MDY2ODI4MzkiLCJlbWFpbCI6InNpdGFyYW1rZGtzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoibmZoQ0w5SWozRzVoZ2NxVmlZdS1rQSIsIm5hbWUiOiJzaXRhcmFtIGt1ZGlyZWRkeSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NJYmZFelNLUWE1RVR0anpoUGhHTVBZYlB4UTc0ZkNXdzlJMm5GTTJkaFJVYWRiN2RRPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6InNpdGFyYW0iLCJmYW1pbHlfbmFtZSI6Imt1ZGlyZWRkeSIsImlhdCI6MTcyNzE5NzcwNSwiZXhwIjoxNzI3MjAxMzA1fQ.DeZB9MKdWx4fkPDWv6aveOSPKLUatH-Jw0oXdQRjCw1oWjNZJGk3XPlBsujlJxaauJO3Zu68BoGs0-GTxOlNJcCN2sGU6awdiHWzHC9tdRB1xRd4SJD1ImfEwYUPeqYA3quJEbcyHIsTGHntP7gnYNem727sJ2jv4GSAPYU-wZ3lpMUbGSYUV92ffSb-2F_jtJFVulKohX1KipA_56bydHER1hh3wXBvLeTKDv0nOoiTjQwYNllsDU40GwcXQPZi2XLmZgO0Uqc_marg8lmp3JSZv6HKkShtDFdpSo0gbnTgVwZRsgG2KvUvELqBmSit7eN5pmY6lSBIbFse1hkLDg', '2024-09-24 17:08:25', '2024-09-24 16:37:58'),
(4, 'Sitaram', 'Kudireddy', 'sitaramkudireddy@gmail.com', 'ayVqV', 0, 'Sitaram Kudireddy', 'https://lh3.googleusercontent.com/a/ACg8ocIvp9LH_e7EntejaJOEryuVCaPFCYDsyG2dntwVSz-CdiyVU1UH=s96-c', 1, 1, 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjVhYWZmNDdjMjFkMDZlMjY2Y2NlMzk1YjIxNDVjN2M2ZDQ3MzBlYTUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI5MDU4NDAzMDYyOTYtZWZiMnRkbGNoaXAyam1jZHE0czJqdjEzMjN0a2gyYWsuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI5MDU4NDAzMDYyOTYtZWZiMnRkbGNoaXAyam1jZHE0czJqdjEzMjN0a2gyYWsuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDQzMDE0NDQ1MDE5NDI4MjM4NjYiLCJlbWFpbCI6InNpdGFyYW1rdWRpcmVkZHlAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJWWEFqSjYyUnU3SFQ0el9VTHBjcXFBIiwibmFtZSI6IlNpdGFyYW0gS3VkaXJlZGR5IiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0l2cDlMSF9lN0VudGVqYUpPRXJ5dVZDYVBGQ1lEc3lHMmRudHdWU3otQ2RpeVZVMVVIPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IlNpdGFyYW0iLCJmYW1pbHlfbmFtZSI6Ikt1ZGlyZWRkeSIsImlhdCI6MTcyNzE5NzU1OCwiZXhwIjoxNzI3MjAxMTU4fQ.e3WooAHydm4lPzyeQjszvsN9Xjux2uuZEQZmmwwO3fUncng-2iPriCsnGAJDlWmbCMfU8IkJXkjYXKlIylO4IIcG-sD8uF-r7CoOOF_4aq8xlWFWRvifVxCe7nQJ0B4rtmt0tnhw1-cHPmFxVkyf2LGdLIXM5KQr9c5E_69_6o-xxvOhugKr-Xq_XvPGRYODlub7c9MV44-NIs-R4r3GYFMfeY8WuVn4FgwzlAc6BPMzTAihya8WmfOW_d7MWbCxF4IV9viKiTqwbh7L76kWxTjv98wxZbwndK7MVHh1smtsfCjm_F0GVSvW3kzTTEiC6V2UG9w-D18BmfD-B3SLpA', '2024-09-24 17:05:58', '2024-09-24 17:05:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `blog_files`
--
ALTER TABLE `blog_files`
  ADD PRIMARY KEY (`id`),
  ADD KEY `blog_id` (`blog_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `blog_files`
--
ALTER TABLE `blog_files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `blogs`
--
ALTER TABLE `blogs`
  ADD CONSTRAINT `blogs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `blog_files`
--
ALTER TABLE `blog_files`
  ADD CONSTRAINT `blog_files_ibfk_1` FOREIGN KEY (`blog_id`) REFERENCES `blogs` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
