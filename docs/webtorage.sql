-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql:3306
-- 생성 시간: 22-12-11 10:29
-- 서버 버전: 8.0.26
-- PHP 버전: 7.4.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 데이터베이스: `webtorage`
--
create database webtorage;
use webtorage;
-- --------------------------------------------------------

--
-- 테이블 구조 `category`
--

CREATE TABLE `category` (
  `id` int NOT NULL,
  `name` varchar(50) NOT NULL,
  `size` int NOT NULL DEFAULT '0',
  `clientId` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 테이블의 덤프 데이터 `category`
--

INSERT INTO `category` (`id`, `name`, `size`, `clientId`) VALUES
(2, 'suchalongnamedcategorylonglonglonglonglong', -1, 'hello'),
(7, 'info', -5, 'hello'),
(8, 'test', 0, '잠'),
(10, '네이버 바이브', 1, '잠'),
(11, 'new', 1, '잠'),
(14, 'title', 0, 'hello'),
(15, '', 4, '');

-- --------------------------------------------------------

--
-- 테이블 구조 `tabinfo`
--

CREATE TABLE `tabinfo` (
  `clientId` varchar(100) NOT NULL,
  `id` int NOT NULL,
  `category` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'DEFAULT',
  `title` varchar(100) NOT NULL,
  `data_url` varchar(500) NOT NULL,
  `image` varchar(500) NOT NULL,
  `description` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `date` char(12) DEFAULT NULL COMMENT 'YYYYMMDDHHMM',
  `memo` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 테이블의 덤프 데이터 `tabinfo`
--

INSERT INTO `tabinfo` (`clientId`, `id`, `category`, `title`, `data_url`, `image`, `description`, `date`, `memo`) VALUES
('잠', 16, '네이버 바이브', 'NAVER VIBE(바이브)', 'https://vibe.naver.com', 'https://music-phinf.pstatic.net/20201019_118/16031004163365Jexk_JPEG/about.jpg', '#나만을 위한 음악이 듣고 싶을 땐 #내돈내듣 VIBE.', '202203220000', '음원 차트'),
('hello', 17, 'info', '네이버', 'https://www.naver.com/', 'https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png', '네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요', '202203232359', '왜 : 검색 bb'),
('잠', 22, 'test', '네이버', 'https://www.naver.com/', 'https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png', '네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요', '202203231111', '22 id'),
('잠', 27, 'new', '', '', 'https://www.youtube.com/img/desktop/yt_1200.png', '', '20220510', '볼빨간 사춘기'),
('', 44, 'test', '', 'www.no.login', '', '', '202207290017', '로그인 안 함'),
('temp', 45, 'news', '네이버 뉴스', 'https://news.naver.com/main/home.naver', 'https://ssl.pstatic.net/static.news/image/news/ogtag/navernews_200x200_20160804.png', '정치, 경제, 사회, 생활/문화, 세계, IT/과학 등 언론사별, 분야별 뉴스 기사 제공', '20220821', 'news'),
('qwe', 46, 'IT news', 'IT/과학 : 네이버 뉴스', 'https://news.naver.com/main/main.naver?mode=LSD&mid=shm&sid1=105', 'https://ssl.pstatic.net/static.news/image/news/ogtag/navernews_200x200_20160804.png', '모바일, 인터넷, SNS, 통신 등 IT/과학 분야 뉴스 제공', '20220821', 'naver news'),
('', 48, 'ALL', '네이버', 'naver.com', 'https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png', '네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요', '202209042206', ''),
('', 49, 'test', 'YouTube', 'http://youtube.com', 'https://www.youtube.com/img/desktop/yt_1200.png', 'YouTube에서 마음에 드는 동영상과 음악을 감상하고, 직접 만든 콘텐츠를 업로드하여 친구, 가족뿐 아니라 전 세계 사람들과 콘텐츠를 공유할 수 있습니다.', '202209132300', 'testing'),
('', 51, 'ALL', 'YouTube', 'http://youtube.com', 'https://www.youtube.com/img/desktop/yt_1200.png', 'YouTube에서 마음에 드는 동영상과 음악을 감상하고, 직접 만든 콘텐츠를 업로드하여 친구, 가족뿐 아니라 전 세계 사람들과 콘텐츠를 공유할 수 있습니다.', '202209191440', ''),
('', 52, 'ALL', 'NAVER', 'http://naver.com', 'https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png', '네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요', '202209191456', ''),
('hello', 61, 'ALL', 'Integrating with GitHub Actions – CI/CD pipeline to deploy a Web App to Amazon EC2 | AWS DevOps Blog', 'https://aws.amazon.com/ko/blogs/devops/integrating-with-github-actions-ci-cd-pipeline-to-deploy-a-web-app-to-amazon-ec2/', 'https://d2908q01vomqb2.cloudfront.net/7719a1c782a1ba91c031a682a0a2f8658209adbf/2022/03/27/1-ArchitectureDiagram.png', 'Many Organizations adopt DevOps Practices to innovate faster by automating and streamlining the software development and infrastructure management processes. Beyond cultural adoption, DevOps also suggests following certain best practices and Continuous Integration and Continuous Delivery (CI/CD) is among the important ones to start with. CI/CD practice reduces the time it takes to release new software […]', '202209192252', 'd'),
('hello', 62, 'ALL', 'API | Axios 러닝 가이드', 'https://yamoo9.github.io/axios/guide/api.html#%EC%9D%B8%EC%8A%A4%ED%84%B4%EC%8A%A4-%EC%83%9D%EC%84%B1', 'https:yamoo9.github.io/axios/Ax.png', 'Axios 라이브러리 API에 대해 학습합니다.', '202209192253', ''),
('hello', 65, 'info', '[Ubuntu] 우분투에 MySQL 설치하기', 'https://velog.io/@seungsang00/Ubuntu-%EC%9A%B0%EB%B6%84%ED%88%AC%EC%97%90-MySQL-%EC%84%A4%EC%B9%98%ED%95%98%EA%B8%B0', 'https://images.velog.io/velog.png', 'apt-get 이라는 패키지 매니저를 이용해 설치를 진행한다. (우분투 리눅스를 설치했다면 이미 설치되어 있다.)\n\n1. 우분투 서버 업데이트\n\n2. mysql-server 설치\n	$ sudo apt-get install mysql-server\n\n설치 중간 중간 Pas', '202211252026', 'checking');

-- --------------------------------------------------------

--
-- 테이블 구조 `users`
--

CREATE TABLE `users` (
  `Email` varchar(50) NOT NULL,
  `Id` varchar(100) NOT NULL,
  `Password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 테이블의 덤프 데이터 `users`
--

INSERT INTO `users` (`Email`, `Id`, `Password`) VALUES
('aa@naver.com', 'aa', '499eff6af6a76e07fc89904b575b83569bb710e0d27c5770401c18344dcb8a71'),
('abcde@gmail.com', 'hello', '5fed4fd6643204b05e87e4b7a035a95c2882d23d0e0a375ee67a63f84768a9b5'),
('hhhhhh@naver.com', '잠', '1eb72f7c10a1cea0113337bcd4abd2be93f433572a3d8a5ccf42ad1761e2a6f9'),
('jjglgk@naver.com', 'lee', '95dd2388d4fef1487347c47c135443213e6a594d267243e1bc06aa444e14fbfc'),
('jongang@naver.com', 'jongang', '4ff6df31c6b15972fe8d79121623f2f0b09ed9c2e37c79f7a857f23571ef99dc');

--
-- 덤프된 테이블의 인덱스
--

--
-- 테이블의 인덱스 `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- 테이블의 인덱스 `tabinfo`
--
ALTER TABLE `tabinfo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category` (`category`);

--
-- 테이블의 인덱스 `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`Email`);

--
-- 덤프된 테이블의 AUTO_INCREMENT
--

--
-- 테이블의 AUTO_INCREMENT `category`
--
ALTER TABLE `category`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- 테이블의 AUTO_INCREMENT `tabinfo`
--
ALTER TABLE `tabinfo`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
