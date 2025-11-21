-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Jan 29. 13:15
-- Kiszolgáló verziója: 10.4.6-MariaDB
-- PHP verzió: 7.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `viragbolt`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `aruk`
--

CREATE TABLE `aruk` (
  `id` int(11) NOT NULL,
  `nev` varchar(50) COLLATE utf8_hungarian_ci NOT NULL DEFAULT '',
  `kategoriaId` int(11) DEFAULT NULL,
  `leiras` varchar(500) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `keszlet` int(11) DEFAULT NULL,
  `ar` int(11) DEFAULT NULL,
  `kepUrl` varchar(200) COLLATE utf8_hungarian_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `aruk`
--

INSERT INTO `aruk` (`id`, `nev`, `kategoriaId`, `leiras`, `keszlet`, `ar`, `kepUrl`) VALUES
(1, 'Dália', 1, 'A dáliák gumós, fagyérzékeny évelők. Tápanyagdús talajban virágoznak a legszebben. Vízigényük közepes, virágzásuk idején rendszeres vízellátást igényelnek. Virágzási idejük júliustól októberig tart. Kiválóan alkalmasak vágott virágnak.', 10, 356, 'https://res.cloudinary.com/myblog2024/image/upload/v1737373736/fotok/dalia_h4rdyr.jpg'),
(2, 'Százszorszép', 1, 'A százszorszép, vadszázszorszép vagy pipitér (Bellis perennis) az őszirózsafélék (Asteraceae) családjába, az őszirózsaformák (Asteroideae) alcsaládjába tartozó növényfaj. Csaknem egész Európában elterjedt. Észak-Amerikába behurcolták, ott inváziós faj. ', 20, 300, 'https://res.cloudinary.com/myblog2024/image/upload/v1737373739/fotok/szazszorszep_k6ihhc.jpg'),
(3, 'Levendula', 1, 'A levendula (Lavandula) az árvacsalánfélék családjába tartozó növénynemzetség 39 fajjal és több hibrid fajjal. ', 50, 400, 'https://res.cloudinary.com/myblog2024/image/upload/v1737373735/fotok/levendula_jegcfg.jpg'),
(4, 'Petúnia', 1, 'A petúnia (Petunia) a burgonyafélék (Solanaceae) családjába tartozó növénynemzetség. Dél-amerikai eredetű, trombitaforma virágú fajok tartoznak ide, melyeket dísznövényként az egész világon termesztenek. A legtöbb kerti petúnia hibrid (Petunia x hybrida). A petúnia név a francia nyelvből ered, ahová pedig a tupi-guaraní nyelvek \'petun\' = dohány szó átvételével került. ', 20, 360, 'https://res.cloudinary.com/myblog2024/image/upload/v1737373738/fotok/petunia_pnoyll.jpg'),
(5, 'Bazsalikom', 4, 'A bazsalikom - jelentése királyian illatozó) dísz-, fűszer-, és gyógynövény. Népies elnevezései: bazsalikusfű, buszujok, kerti bazsalikum, királyfű, német bors. \r\nEgyéves növény. Karószerű főgyökere számos oldalgyökérre ágazik. Nem hatol mélyre, de dús elágazódásával viszonylag nagy talajréteget sző át. Mereven felálló. 40–60 cm hosszú szára a gyökérnyaktól sok oldalhajtásra ágazik el. ', 100, 250, 'https://res.cloudinary.com/myblog2024/image/upload/v1737373734/fotok/bazsalikom_blbjjj.jpg'),
(6, 'Rozmaring', 4, 'Örökzöld félcserje. Virágai végállásúak, ajakosak, erősen kiemelkedő fellevelekkel. Színei a világoskéktől a liláig, sokféle árnyalatban megtalálhatóak. Levelei sötétzöldek, egyenesek, tűformájúak, szélük visszahajlik, fonákjuk szürkésen szőrözött. A növény minden része aromás illatú.', 150, 310, 'https://res.cloudinary.com/myblog2024/image/upload/v1737373737/fotok/rozmaring_shordk.jpg'),
(7, 'Paradicsom', 3, 'Trópusi hazájában évelő kúszónövény, mérsékelt éghajlaton egyévesként termesztik, vannak egész éves kultúrák is. Fajtától függően 40-260 centiméter magasra nő, átlagban 150 centiméter magas. Termése 1-100 dekagrammig változó nagyságú lehet. ', 600, 500, 'https://res.cloudinary.com/myblog2024/image/upload/v1737373738/fotok/paradicsom_wiftjz.jpg'),
(8, 'Sárgarépa', 3, 'A sárgarépa (Daucus carota subsp. sativus) fontos zöldségnövény, jelentős vitaminforrás, régóta ismerjük és termesztjük. ', 250, 315, 'https://res.cloudinary.com/myblog2024/image/upload/v1737373739/fotok/sargarepa_hawshc.jpg'),
(9, 'Karalábé', 3, 'A káposztafélék családjába tartozó zöldségnövény. Magas B1-, B2-, B6- és C-vitamin (63 mg/100 g) tartalma miatt ajánlatos a nyers fogyasztása. Tartalmaz még kalciumot, káliumot, magnéziumot, vasat, valamint meszet és foszfort is. Nem savanyítható, konzerválásra is alkalmatlan. Viszont egész évben termeszthető, és már tyúktojás nagyság elérésekor szedhető. A karalábét magas vitamintartalma miatt az alternatív gyógyászat hívei méregtelenítő hatásúnak tartják, de mindenképpen egészséges. ', 180, 280, 'https://res.cloudinary.com/myblog2024/image/upload/v1737373737/fotok/karalabe_vtand4.jpg'),
(10, 'Szamóca', 2, 'Az epret nagy földrajzi alkalmazkodóképessége és elterjedése miatt szinte a világ minden országában termesztik. Évelő, tőrózsát fejlesztő növény, az indanövényről úgy nevezett frigó palántákkal szaporított egyedek járulékos gyökérrendszert fejlesztenek, melyek sekélyen helyezkednek el a talajban. A gyökérzetet a levélzettel egy rövid gyökértörzs köti össze. Ebből fejlődnek ki a levelek, az indák, a virágok; ezen kívül ez a szerve tartalékolja a tápanyagokat, amely elősegíti az áttelelést.', 200, 500, 'https://res.cloudinary.com/myblog2024/image/upload/v1737373739/fotok/szamoca_nr8v59.jpg'),
(11, 'Málna', 2, 'Gyümölcse miatt kedvelt kerti növény. A magas vitamintartalma miatt egészséges gyümölcsöt gyakran nyersen fogyasztják, illetve lekvárként, kompótként, zseléként vagy szörpként kerül a konyhákban felhasználásra.', 320, 400, 'https://res.cloudinary.com/myblog2024/image/upload/v1737373740/fotok/malna_itr6ix.jpg'),
(12, 'Chili paprika', 3, 'Indiában, Afrikában és Mexikóban nagy hagyománya van fogyasztásának. Ezeken a helyeken elsősorban emésztést serkentő hatása miatt kedvelik, és ma már kutatások bizonyítják, hogy nem alaptalanul, mivel fokozza a nyál és a gyomornedvek elválasztását, melyek az étel lebontását teszik lehetővé. Akik szeretik a csípős, fűszeres ételeket, ugyanakkor fogyókúrázni szeretnének, kihasználhatják átmeneti anyagcsere-gyorsító tulajdonságát.', 100, 360, 'https://res.cloudinary.com/myblog2024/image/upload/v1737373735/fotok/chili-paprika_om2jkv.jpg'),
(13, 'teszt', 1, 'jshjhfjsh', 10, 360, 'kép');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kategoriak`
--

CREATE TABLE `kategoriak` (
  `id` int(11) NOT NULL,
  `nev` varchar(50) COLLATE utf8_hungarian_ci NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `kategoriak`
--

INSERT INTO `kategoriak` (`id`, `nev`) VALUES
(1, 'Virágok'),
(2, 'Gyümölcsök'),
(3, 'Zöldségek'),
(4, 'Fűszernövény');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `aruk`
--
ALTER TABLE `aruk`
  ADD PRIMARY KEY (`id`),
  ADD KEY `kategoriaId` (`kategoriaId`);

--
-- A tábla indexei `kategoriak`
--
ALTER TABLE `kategoriak`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `aruk`
--
ALTER TABLE `aruk`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT a táblához `kategoriak`
--
ALTER TABLE `kategoriak`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `aruk`
--
ALTER TABLE `aruk`
  ADD CONSTRAINT `aruk_ibfk_1` FOREIGN KEY (`kategoriaId`) REFERENCES `kategoriak` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
