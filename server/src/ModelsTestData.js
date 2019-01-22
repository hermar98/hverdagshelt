import {
    County,
    Event,
    EventCategory,
    Feedback,
    Issue,
    IssueCategory,
    Municipal,
    Status,
    User,
    UserMunicipal,
    UserIssue
} from "./models";

class ModelsTestData {

    createAll(){
        return this.createCounties().then(()=>
        // this.createAllMunicipals()).then(()=>
        this.createMunicipals()).then(()=>
        this.createUsers()).then(()=>
        this.createStatuses()).then(()=>
        this.createIssueCategory()).then(()=>
        this.createIssues()).then(()=>
        this.createFeedback()).then(()=>
        this.createEventCategory()).then(()=>
        this.crateEvent()).then(()=>
        this.createUserMunicipal()).then(()=>
        this.createUserIssue());

    }

    createAllMunicipals(){
        return Municipal.bulkCreate([
            { munId: 5016, name: 'Agdenes', countyId: 50},
            { munId: 1820, name: 'Alstahaug', countyId: 18},
            { munId: 2012, name: 'Alta', countyId: 20},
            { munId: 438, name: 'Alvdal', countyId: 4},
            { munId: 1871, name: 'Andøy', countyId: 18},
            { munId: 118, name: 'Aremark', countyId: 1},
            { munId: 906, name: 'Arendal', countyId: 9},
            { munId: 220, name: 'Asker', countyId: 2},
            { munId: 124, name: 'Askim', countyId: 1},
            { munId: 1428, name: 'Askvoll', countyId: 14},
            { munId: 1247, name: 'Askøy', countyId: 12},
            { munId: 1027, name: 'Audnedal', countyId: 10},
            { munId: 1547, name: 'Aukra', countyId: 15},
            { munId: 1576, name: 'Aure', countyId: 15},
            { munId: 1421, name: 'Aurland', countyId: 14},
            { munId: 221, name: 'Aurskog-Høland', countyId: 2},
            { munId: 1244, name: 'Austevoll', countyId: 12},
            { munId: 1264, name: 'Austrheim', countyId: 12},
            { munId: 1554, name: 'Averøy', countyId: 15},
            { munId: 1418, name: 'Balestrand', countyId: 14},
            { munId: 1854, name: 'Ballangen', countyId: 18},
            { munId: 1933, name: 'Balsfjord', countyId: 19},
            { munId: 814, name: 'Bamble', countyId: 8},
            { munId: 1922, name: 'Bardu', countyId: 19},
            { munId: 1839, name: 'Beiarn', countyId: 18},
            { munId: 1929, name: 'Berg', countyId: 19},
            { munId: 1201, name: 'Bergen', countyId: 12},
            { munId: 2024, name: 'Berlevåg', countyId: 20},
            { munId: 1811, name: 'Bindal', countyId: 18},
            { munId: 928, name: 'Birkenes', countyId: 9},
            { munId: 1114, name: 'Bjerkreim', countyId: 11},
            { munId: 5017, name: 'Bjugn', countyId: 50},
            { munId: 1804, name: 'Bodø', countyId: 18},
            { munId: 1145, name: 'Bokn', countyId: 11},
            { munId: 1438, name: 'Bremanger', countyId: 14},
            { munId: 1813, name: 'Brønnøy', countyId: 18},
            { munId: 938, name: 'Bygland', countyId: 9},
            { munId: 941, name: 'Bykle', countyId: 9},
            { munId: 219, name: 'Bærum', countyId: 2},
            { munId: 1867, name: 'Bø { munId: Nordland}', countyId: 18},
            { munId: 821, name: 'Bø { munId: Telemark}', countyId: 8},
            { munId: 1219, name: 'Bømlo', countyId: 12},
            { munId: 2028, name: 'Båtsfjord', countyId: 20},
            { munId: 2025, name: 'Tana', countyId: 20},
            { munId: 1850, name: 'Tysfjord', countyId: 18},
            { munId: 511, name: 'Dovre', countyId: 5},
            { munId: 602, name: 'Drammen', countyId: 6},
            { munId: 817, name: 'Drangedal', countyId: 8},
            { munId: 1926, name: 'Dyrøy', countyId: 19},
            { munId: 1827, name: 'Dønna', countyId: 18},
            { munId: 1443, name: 'Eid', countyId: 14},
            { munId: 1551, name: 'Eide', countyId: 15},
            { munId: 1232, name: 'Eidfjord', countyId: 12},
            { munId: 125, name: 'Eidsberg', countyId: 1},
            { munId: 420, name: 'Eidskog', countyId: 4},
            { munId: 237, name: 'Eidsvoll', countyId: 2},
            { munId: 1101, name: 'Eigersund', countyId: 11},
            { munId: 427, name: 'Elverum', countyId: 4},
            { munId: 229, name: 'Enebakk', countyId: 2},
            { munId: 434, name: 'Engerdal', countyId: 4},
            { munId: 1211, name: 'Etne', countyId: 12},
            { munId: 541, name: 'Etnedal', countyId: 5},
            { munId: 1853, name: 'Evenes', countyId: 18},
            { munId: 937, name: 'Evje og Hornnes', countyId: 9},
            { munId: 1003, name: 'Farsund', countyId: 10},
            { munId: 1841, name: 'Fauske ', countyId: 18},
            { munId: 1265, name: 'Fedje', countyId: 12},
            { munId: 227, name: 'Fet', countyId: 2},
            { munId: 1141, name: 'Finnøy', countyId: 11},
            { munId: 1222, name: 'Fitjar', countyId: 12},
            { munId: 1429, name: 'Fjaler', countyId: 14},
            { munId: 1246, name: 'Fjell', countyId: 12},
            { munId: 1859, name: 'Flakstad', countyId: 18},
            { munId: 5049, name: 'Flatanger', countyId: 50},
            { munId: 1004, name: 'Flekkefjord', countyId: 10},
            { munId: 631, name: 'Flesberg', countyId: 6},
            { munId: 1401, name: 'Flora', countyId: 14},
            { munId: 615, name: 'Flå', countyId: 6},
            { munId: 439, name: 'Folldal', countyId: 4},
            { munId: 1129, name: 'Forsand', countyId: 11},
            { munId: 5048, name: 'Fosnes', countyId: 50},
            { munId: 106, name: 'Fredrikstad', countyId: 1},
            { munId: 215, name: 'Frogn', countyId: 2},
            { munId: 919, name: 'Froland', countyId: 9},
            { munId: 5036, name: 'Frosta', countyId: 50},
            { munId: 1548, name: 'Fræna', countyId: 15},
            { munId: 5014, name: 'Frøya', countyId: 50},
            { munId: 1241, name: 'Fusa', countyId: 12},
            { munId: 831, name: 'Fyresdal', countyId: 8},
            { munId: 729, name: 'Færder', countyId: 7},
            { munId: 1432, name: 'Førde', countyId: 14},
            { munId: 1940, name: 'Kåfjord', countyId: 19},
            { munId: 2023, name: 'Gamvik', countyId: 20},
            { munId: 1430, name: 'Gaular', countyId: 14},
            { munId: 522, name: 'Gausdal', countyId: 5},
            { munId: 1838, name: 'Gildeskål', countyId: 18},
            { munId: 1532, name: 'Giske', countyId: 15},
            { munId: 1557, name: 'Gjemnes', countyId: 15},
            { munId: 234, name: 'Gjerdrum', countyId: 2},
            { munId: 911, name: 'Gjerstad', countyId: 9},
            { munId: 1122, name: 'Gjesdal', countyId: 11},
            { munId: 502, name: 'Gjøvik', countyId: 5},
            { munId: 1445, name: 'Gloppen', countyId: 14},
            { munId: 617, name: 'Gol', countyId: 6},
            { munId: 534, name: 'Gran', countyId: 5},
            { munId: 1825, name: 'Grane', countyId: 18},
            { munId: 1234, name: 'Granvin', countyId: 12},
            { munId: 1919, name: 'Gratangen', countyId: 19},
            { munId: 904, name: 'Grimstad', countyId: 9},
            { munId: 5045, name: 'Grong', countyId: 50},
            { munId: 423, name: 'Grue', countyId: 4},
            { munId: 1411, name: 'Gulen', countyId: 14},
            { munId: 2011, name: 'Kautokeino', countyId: 20},
            { munId: 1866, name: 'Hadsel', countyId: 18},
            { munId: 101, name: 'Halden', countyId: 1},
            { munId: 1571, name: 'Halsa', countyId: 15},
            { munId: 403, name: 'Hamar', countyId: 4},
            { munId: 1849, name: 'Hamarøy', countyId: 18},
            { munId: 2004, name: 'Hammerfest', countyId: 20},
            { munId: 1534, name: 'Haram', countyId: 15},
            { munId: 1517, name: 'Hareid', countyId: 15},
            { munId: 1903, name: 'Harstad', countyId: 19},
            { munId: 2015, name: 'Hasvik', countyId: 20},
            { munId: 1826, name: 'Hattfjelldal', countyId: 18},
            { munId: 1106, name: 'Haugesund', countyId: 11},
            { munId: 5011, name: 'Hemne', countyId: 50},
            { munId: 1832, name: 'Hemnes', countyId: 18},
            { munId: 618, name: 'Hemsedal', countyId: 6},
            { munId: 1515, name: 'Herøy { munId: Møre og Romsdal}', countyId: 15},
            { munId: 1818, name: 'Herøy { munId: Nordland}', countyId: 18},
            { munId: 5013, name: 'Hitra', countyId: 50},
            { munId: 827, name: 'Hjartdal', countyId: 8},
            { munId: 1133, name: 'Hjelmeland', countyId: 11},
            { munId: 138, name: 'Hobøl', countyId: 1},
            { munId: 620, name: 'Hol', countyId: 6},
            { munId: 612, name: 'Hole', countyId: 6},
            { munId: 715, name: 'Holmestrand', countyId: 7},
            { munId: 5026, name: 'Holtålen', countyId: 50},
            { munId: 1444, name: 'Hornindal', countyId: 14},
            { munId: 701, name: 'Horten', countyId: 7},
            { munId: 239, name: 'Hurdal', countyId: 2},
            { munId: 628, name: 'Hurum', countyId: 6},
            { munId: 111, name: 'Hvaler', countyId: 1},
            { munId: 1413, name: 'Hyllestad', countyId: 14},
            { munId: 1034, name: 'Hægebostad', countyId: 10},
            { munId: 1416, name: 'Høyanger', countyId: 14},
            { munId: 5046, name: 'Høylandet', countyId: 50},
            { munId: 1119, name: 'Hå', countyId: 11},
            { munId: 1917, name: 'Ibestad', countyId: 19},
            { munId: 5053, name: 'Inderøy', countyId: 50},
            { munId: 5054, name: 'Indre Fosen', countyId: 50},
            { munId: 935, name: 'Iveland', countyId: 9},
            { munId: 532, name: 'Jevnaker', countyId: 5},
            { munId: 1227, name: 'Jondal', countyId: 12},
            { munId: 1431, name: 'Jølster', countyId: 14},
            { munId: 2021, name: 'Karasjok', countyId: 20},
            { munId: 1936, name: 'Karlsøy', countyId: 19},
            { munId: 1149, name: 'Karmøy', countyId: 11},
            { munId: 1120, name: 'Klepp', countyId: 11},
            { munId: 5030, name: 'Klæbu', countyId: 50},
            { munId: 604, name: 'Kongsberg', countyId: 6},
            { munId: 402, name: 'Kongsvinger', countyId: 4},
            { munId: 815, name: 'Kragerø', countyId: 8},
            { munId: 1001, name: 'Kristiansand', countyId: 10},
            { munId: 1505, name: 'Kristiansund', countyId: 15},
            { munId: 622, name: 'Krødsherad', countyId: 6},
            { munId: 2017, name: 'Kvalsund', countyId: 20},
            { munId: 1238, name: 'Kvam', countyId: 12},
            { munId: 1037, name: 'Kvinesdal', countyId: 10},
            { munId: 1224, name: 'Kvinnherad', countyId: 12},
            { munId: 829, name: 'Kviteseid', countyId: 8},
            { munId: 1144, name: 'Kvitsøy', countyId: 11},
            { munId: 1911, name: 'Kvæfjord', countyId: 19},
            { munId: 1943, name: 'Kvænangen', countyId: 19},
            { munId: 712, name: 'Larvik', countyId: 7},
            { munId: 2022, name: 'Lebesby', countyId: 20},
            { munId: 1419, name: 'Leikanger', countyId: 14},
            { munId: 1822, name: 'Leirfjord', countyId: 18},
            { munId: 5052, name: 'Leka', countyId: 50},
            { munId: 1931, name: 'Lenvik', countyId: 19},
            { munId: 512, name: 'Lesja', countyId: 5},
            { munId: 5037, name: 'Levanger', countyId: 50},
            { munId: 626, name: 'Lier', countyId: 6},
            { munId: 5042, name: 'Lierne', countyId: 50},
            { munId: 501, name: 'Lillehammer', countyId: 5},
            { munId: 926, name: 'Lillesand', countyId: 9},
            { munId: 1029, name: 'Lindesnes', countyId: 10},
            { munId: 1263, name: 'Lindås', countyId: 12},
            { munId: 1920, name: 'Lavangen', countyId: 19},
            { munId: 514, name: 'Lom', countyId: 5},
            { munId: 2014, name: 'Loppa', countyId: 20},
            { munId: 1112, name: 'Lund', countyId: 11},
            { munId: 533, name: 'Lunner', countyId: 5},
            { munId: 1834, name: 'Lurøy', countyId: 18},
            { munId: 1426, name: 'Luster', countyId: 14},
            { munId: 1032, name: 'Lyngdal', countyId: 10},
            { munId: 1938, name: 'Lyngen', countyId: 19},
            { munId: 1422, name: 'Lærdal', countyId: 14},
            { munId: 1851, name: 'Lødingen', countyId: 18},
            { munId: 230, name: 'Lørenskog', countyId: 2},
            { munId: 415, name: 'Løten', countyId: 4},
            { munId: 5031, name: 'Malvik', countyId: 50},
            { munId: 1002, name: 'Mandal', countyId: 10},
            { munId: 119, name: 'Marker', countyId: 1},
            { munId: 1021, name: 'Marnardal', countyId: 10},
            { munId: 1266, name: 'Masfjorden', countyId: 12},
            { munId: 1256, name: 'Meland', countyId: 12},
            { munId: 5023, name: 'Meldal', countyId: 50},
            { munId: 5028, name: 'Melhus', countyId: 50},
            { munId: 1837, name: 'Meløy', countyId: 18},
            { munId: 5034, name: 'Meråker', countyId: 50},
            { munId: 1545, name: 'Midsund', countyId: 15},
            { munId: 5027, name: 'Midtre Gauldal', countyId: 50},
            { munId: 1252, name: 'Modalen', countyId: 12},
            { munId: 623, name: 'Modum', countyId: 6},
            { munId: 1502, name: 'Molde', countyId: 15},
            { munId: 1874, name: 'Moskenes', countyId: 18},
            { munId: 104, name: 'Moss', countyId: 1},
            { munId: 1924, name: 'Målselv', countyId: 19},
            { munId: 2018, name: 'Måsøy', countyId: 20},
            { munId: 5040, name: 'Namdalseid', countyId: 50},
            { munId: 5005, name: 'Namsos', countyId: 50},
            { munId: 5044, name: 'Namsskogan', countyId: 50},
            { munId: 238, name: 'Nannestad', countyId: 2},
            { munId: 1805, name: 'Narvik', countyId: 18},
            { munId: 1433, name: 'Naustdal', countyId: 14},
            { munId: 625, name: 'Nedre Eiker', countyId: 6},
            { munId: 236, name: 'Nes { munId: Akershus}', countyId: 2},
            { munId: 616, name: 'Nes { munId: Buskerud}', countyId: 6},
            { munId: 1828, name: 'Nesna', countyId: 18},
            { munId: 216, name: 'Nesodden', countyId: 2},
            { munId: 1543, name: 'Nesset', countyId: 15},
            { munId: 830, name: 'Nissedal', countyId: 8},
            { munId: 233, name: 'Nittedal', countyId: 2},
            { munId: 819, name: 'Nome', countyId: 8},
            { munId: 542, name: 'Nord-Aurdal', countyId: 5},
            { munId: 516, name: 'Nord-Fron', countyId: 5},
            { munId: 418, name: 'Nord-Odal', countyId: 4},
            { munId: 1524, name: 'Norddal', countyId: 15},
            { munId: 2019, name: 'Nordkapp', countyId: 20},
            { munId: 538, name: 'Nordre Land', countyId: 5},
            { munId: 1942, name: 'Nordreisa', countyId: 19},
            { munId: 633, name: 'Nore og Uvdal', countyId: 6},
            { munId: 807, name: 'Notodden', countyId: 8},
            { munId: 5051, name: 'Nærøy', countyId: 50},
            { munId: 1228, name: 'Odda', countyId: 12},
            { munId: 5021, name: 'Oppdal', countyId: 50},
            { munId: 217, name: 'Oppegård', countyId: 2},
            { munId: 5024, name: 'Orkdal', countyId: 50},
            { munId: 441, name: 'Os { munId: Hedmark}', countyId: 4},
            { munId: 1243, name: 'Os { munId: Hordaland}', countyId: 12},
            { munId: 5020, name: 'Osen', countyId: 50},
            { munId: 301, name: 'Oslo kommune', countyId: 3},
            { munId: 1253, name: 'Osterøy', countyId: 12},
            { munId: 5047, name: 'Overhalla', countyId: 50},
            { munId: 2020, name: 'Porsanger', countyId: 20},
            { munId: 805, name: 'Porsgrunn', countyId: 8},
            { munId: 5043, name: 'Røyrvik', countyId: 50},
            { munId: 1260, name: 'Radøy', countyId: 12},
            { munId: 128, name: 'Rakkestad', countyId: 1},
            { munId: 1833, name: 'Rana', countyId: 18},
            { munId: 1127, name: 'Randaberg', countyId: 11},
            { munId: 1539, name: 'Rauma', countyId: 15},
            { munId: 716, name: 'Re', countyId: 7},
            { munId: 432, name: 'Rendalen', countyId: 4},
            { munId: 5022, name: 'Rennebu', countyId: 50},
            { munId: 1142, name: 'Rennesøy', countyId: 11},
            { munId: 1567, name: 'Rindal', countyId: 15},
            { munId: 520, name: 'Ringebu', countyId: 5},
            { munId: 605, name: 'Ringerike', countyId: 6},
            { munId: 412, name: 'Ringsaker', countyId: 4},
            { munId: 901, name: 'Risør', countyId: 9},
            { munId: 5019, name: 'Roan', countyId: 50},
            { munId: 632, name: 'Rollag', countyId: 6},
            { munId: 136, name: 'Rygge', countyId: 1},
            { munId: 228, name: 'Rælingen', countyId: 2},
            { munId: 1836, name: 'Rødøy', countyId: 18},
            { munId: 121, name: 'Rømskog', countyId: 1},
            { munId: 5025, name: 'Røros', countyId: 50},
            { munId: 1856, name: 'Røst', countyId: 18},
            { munId: 627, name: 'Røyken', countyId: 6},
            { munId: 135, name: 'Råde', countyId: 1},
            { munId: 1923, name: 'Salangen', countyId: 19},
            { munId: 1840, name: 'Saltdal', countyId: 18},
            { munId: 1242, name: 'Samnanger', countyId: 12},
            { munId: 1514, name: 'Sande { munId: Møre og Romsdal}', countyId: 15},
            { munId: 713, name: 'Sande { munId: Vestfold}', countyId: 7},
            { munId: 710, name: 'Sandefjord', countyId: 7},
            { munId: 1102, name: 'Sandnes', countyId: 11},
            { munId: 1546, name: 'Sandøy', countyId: 15},
            { munId: 105, name: 'Sarpsborg', countyId: 1},
            { munId: 1135, name: 'Sauda', countyId: 11},
            { munId: 822, name: 'Sauherad', countyId: 8},
            { munId: 517, name: 'Sel', countyId: 5},
            { munId: 5032, name: 'Selbu', countyId: 50},
            { munId: 1441, name: 'Selje', countyId: 14},
            { munId: 828, name: 'Seljord', countyId: 8},
            { munId: 621, name: 'Sigdal', countyId: 6},
            { munId: 811, name: 'Siljan', countyId: 8},
            { munId: 1046, name: 'Sirdal', countyId: 10},
            { munId: 5029, name: 'Skaun', countyId: 50},
            { munId: 231, name: 'Skedsmo', countyId: 2},
            { munId: 213, name: 'Ski', countyId: 2},
            { munId: 806, name: 'Skien', countyId: 8},
            { munId: 127, name: 'Skiptvet', countyId: 1},
            { munId: 1941, name: 'Skjervøy', countyId: 19},
            { munId: 513, name: 'Skjåk', countyId: 5},
            { munId: 1529, name: 'Skodje', countyId: 15},
            { munId: 1913, name: 'Skånland', countyId: 19},
            { munId: 1573, name: 'Smøla', countyId: 15},
            { munId: 5012, name: 'Snillfjord', countyId: 50},
            { munId: 5041, name: 'Snåsa', countyId: 50},
            { munId: 1420, name: 'Sogndal', countyId: 14},
            { munId: 1111, name: 'Sokndal', countyId: 11},
            { munId: 1124, name: 'Sola', countyId: 11},
            { munId: 1412, name: 'Solund', countyId: 14},
            { munId: 1017, name: 'Songdalen', countyId: 10},
            { munId: 1870, name: 'Sortland', countyId: 18},
            { munId: 123, name: 'Spydeberg', countyId: 1},
            { munId: 417, name: 'Stange', countyId: 4},
            { munId: 1103, name: 'Stavanger', countyId: 11},
            { munId: 1848, name: 'Steigen', countyId: 18},
            { munId: 5004, name: 'Steinkjer', countyId: 50},
            { munId: 5035, name: 'Stjørdal', countyId: 50},
            { munId: 430, name: 'Stor-Elvdal', countyId: 4},
            { munId: 1221, name: 'Stord', countyId: 12},
            { munId: 1526, name: 'Stordal', countyId: 15},
            { munId: 1939, name: 'Storfjord', countyId: 19},
            { munId: 1130, name: 'Strand', countyId: 11},
            { munId: 1525, name: 'Stranda', countyId: 15},
            { munId: 1449, name: 'Stryn', countyId: 14},
            { munId: 1531, name: 'Sula', countyId: 15},
            { munId: 1134, name: 'Suldal', countyId: 11},
            { munId: 1245, name: 'Sund', countyId: 12},
            { munId: 1563, name: 'Sunndal', countyId: 15},
            { munId: 1566, name: 'Surnadal', countyId: 15},
            { munId: 1216, name: 'Sveio', countyId: 12},
            { munId: 711, name: 'Svelvik', countyId: 7},
            { munId: 1528, name: 'Sykkylven', countyId: 15},
            { munId: 1018, name: 'Søgne', countyId: 10},
            { munId: 1812, name: 'Sømna', countyId: 18},
            { munId: 536, name: 'Søndre Land', countyId: 5},
            { munId: 540, name: 'Sør-Aurdal', countyId: 5},
            { munId: 519, name: 'Sør-Fron', countyId: 5},
            { munId: 419, name: 'Sør-Odal', countyId: 4},
            { munId: 2030, name: 'Sør-Varanger', countyId: 20},
            { munId: 1845, name: 'Sørfold', countyId: 18},
            { munId: 1925, name: 'Sørreisa', countyId: 19},
            { munId: 226, name: 'Sørum', countyId: 2},
            { munId: 1121, name: 'Time', countyId: 11},
            { munId: 1560, name: 'Tingvoll', countyId: 15},
            { munId: 826, name: 'Tinn', countyId: 8},
            { munId: 1852, name: 'Tjeldsund', countyId: 18},
            { munId: 833, name: 'Tokke', countyId: 8},
            { munId: 436, name: 'Tolga', countyId: 4},
            { munId: 1928, name: 'Torsken', countyId: 19},
            { munId: 1927, name: 'Tranøy', countyId: 19},
            { munId: 1902, name: 'Tromsø', countyId: 19},
            { munId: 5001, name: 'Trondheim', countyId: 50},
            { munId: 428, name: 'Trysil', countyId: 4},
            { munId: 1835, name: 'Træna', countyId: 18},
            { munId: 122, name: 'Trøgstad', countyId: 1},
            { munId: 914, name: 'Tvedestrand', countyId: 9},
            { munId: 5033, name: 'Tydal', countyId: 50},
            { munId: 437, name: 'Tynset', countyId: 4},
            { munId: 1223, name: 'Tysnes', countyId: 12},
            { munId: 1146, name: 'Tysvær', countyId: 11},
            { munId: 704, name: 'Tønsberg', countyId: 7},
            { munId: 235, name: 'Ullensaker', countyId: 2},
            { munId: 1231, name: 'Ullensvang', countyId: 12},
            { munId: 1516, name: 'Ulstein', countyId: 15},
            { munId: 1233, name: 'Ulvik', countyId: 12},
            { munId: 2027, name: 'Nesseby', countyId: 20},
            { munId: 1151, name: 'Utsira', countyId: 11},
            { munId: 2003, name: 'Vadsø', countyId: 20},
            { munId: 1251, name: 'Vaksdal', countyId: 12},
            { munId: 940, name: 'Valle', countyId: 9},
            { munId: 545, name: 'Vang', countyId: 5},
            { munId: 1511, name: 'Vanylven', countyId: 15},
            { munId: 2002, name: 'Vardø', countyId: 20},
            { munId: 1824, name: 'Vefsn', countyId: 18},
            { munId: 1815, name: 'Vega', countyId: 18},
            { munId: 912, name: 'Vegårshei', countyId: 9},
            { munId: 1014, name: 'Vennesla', countyId: 10},
            { munId: 5038, name: 'Verdal', countyId: 50},
            { munId: 5039, name: 'Verran', countyId: 50},
            { munId: 211, name: 'Vestby', countyId: 2},
            { munId: 1535, name: 'Vestnes', countyId: 15},
            { munId: 543, name: 'Vestre Slidre', countyId: 5},
            { munId: 529, name: 'Vestre Toten', countyId: 5},
            { munId: 1860, name: 'Vestvågøy', countyId: 18},
            { munId: 1816, name: 'Vevelstad', countyId: 18},
            { munId: 1417, name: 'Vik', countyId: 14},
            { munId: 5050, name: 'Vikna', countyId: 50},
            { munId: 1160, name: 'Vindafjord', countyId: 11},
            { munId: 834, name: 'Vinje', countyId: 8},
            { munId: 1519, name: 'Volda', countyId: 15},
            { munId: 1235, name: 'Voss', countyId: 12},
            { munId: 1857, name: 'Værøy', countyId: 18},
            { munId: 1865, name: 'Vågan', countyId: 18},
            { munId: 1439, name: 'Vågsøy', countyId: 14},
            { munId: 515, name: 'Vågå', countyId: 5},
            { munId: 426, name: 'Våler Hedmark', countyId: 4},
            { munId: 137, name: 'Våler Østfold', countyId: 1},
            { munId: 1868, name: 'Øksnes', countyId: 18},
            { munId: 5015, name: 'Ørland', countyId: 50},
            { munId: 1523, name: 'Ørskog', countyId: 15},
            { munId: 1520, name: 'Ørsta', countyId: 15},
            { munId: 528, name: 'Østre Toten', countyId: 5},
            { munId: 624, name: 'Øvre Eiker', countyId: 6},
            { munId: 521, name: 'Øyer', countyId: 5},
            { munId: 1259, name: 'Øygarden', countyId: 12},
            { munId: 544, name: 'Øystre Slidre', countyId: 5},
            { munId: 5018, name: 'Åfjord', countyId: 50},
            { munId: 619, name: 'Ål', countyId: 6},
            { munId: 1504, name: 'Ålesund', countyId: 15},
            { munId: 929, name: 'Åmli', countyId: 9},
            { munId: 429, name: 'Åmot', countyId: 4},
            { munId: 1424, name: 'Årdal', countyId: 14},
            { munId: 214, name: 'Ås', countyId: 2},
            { munId: 1026, name: 'Åseral', countyId: 10},
            { munId: 425, name: 'Åsnes', countyId: 4}
        ]);
    }

    createCounties() {
        return County.bulkCreate([
            {
                countyId: 1,
                name: 'Østfold'
            },
            {
                countyId: 2,
                name: 'Akershus'
            },
            {
                countyId: 3,
                name: 'Oslo'
            },
            {
                countyId: 4,
                name: 'Hedmark'
            },
            {
                countyId: 5,
                name: 'Oppland'
            },
            {
                countyId: 6,
                name: 'Buskerud'
            },
            {
                countyId: 7,
                name: 'Vestfold'
            },
            {
                countyId: 8,
                name: 'Telemark'
            },
            {
                countyId: 9,
                name: 'Aust-Agder'
            },
            {
                countyId: 10,
                name: 'Vest-Agder'
            },
            {
                countyId: 11,
                name: 'Rogaland'
            },
            {
                countyId: 12,
                name: 'Hordaland'
            },
            {
                countyId: 14,
                name: 'Sogn og Fjordane'
            },
            {
                countyId: 15,
                name: 'Møre og Romsdal'
            },
            {
                countyId: 50,
                name: 'Trøndelag'
            },
            {
                countyId: 18,
                name: 'Nordland'
            },
            {
                countyId: 19,
                name: 'Troms'
            },
            {
                countyId: 20,
                name: 'Finnmark'
            }
        ])
    }

    createMunicipals() {
        return Municipal.bulkCreate([
            { munId: 5016, name: 'Agdenes', countyId: 50 },
            { munId: 1820, name: 'Alstahaug', countyId: 18 },
            { munId: 2012, name: 'Alta', countyId: 20 },
            { munId: 1418, name: 'Balestrand', countyId: 14 },
            { munId: 1854, name: 'Ballangen', countyId: 18 },
            { munId: 1933, name: 'Balsfjord', countyId: 19 },
            { munId: 511, name: 'Dovre', countyId: 5 },
            { munId: 602, name: 'Drammen', countyId: 6 },
            { munId: 817, name: 'Drangedal', countyId: 8 },
            { munId: 427, name: 'Elverum', countyId: 4 },
            { munId: 237, name: 'Eidsvoll', countyId: 2 },
            { munId: 229, name: 'Enebakk', countyId: 2 },
            { munId: 1003, name: 'Farsund', countyId: 10 },
            { munId: 5036, name: 'Frosta', countyId: 50 },
            { munId: 1432, name: 'Førde', countyId: 14, municipalShield: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/F%C3%B8rde_komm.svg/800px-F%C3%B8rde_komm.svg.png'},
            { munId: 502, name: 'Gjøvik', countyId: 5 },
            { munId: 617, name: 'Gol', countyId: 6 },
            { munId: 5045, name: 'Grong', countyId: 50 },
            { munId: 101, name: 'Halden', countyId: 1 },
            { munId: 1903, name: 'Harstad', countyId: 19 },
            { munId: 1826, name: 'Hattfjelldal', countyId: 18 },
            { munId: 5053, name: 'Inderøy', countyId: 50 },
            { munId: 5054, name: 'Indre Fosen', countyId: 50 },
            { munId: 935, name: 'Iveland', countyId: 9 },
            { munId: 532, name: 'Jevnaker', countyId: 5 },
            { munId: 1227, name: 'Jondal', countyId: 12 },
            { munId: 1850, name: 'Tysfjord', countyId: 18, municipalShield: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Tysfjord_komm.svg/800px-Tysfjord_komm.svg.png'},
            { munId: 2021, name: 'Karasjok', countyId: 20 },
            { munId: 1120, name: 'Klepp', countyId: 11 },
            { munId: 5030, name: 'Klæbu', countyId: 50 },
            { munId: 5037, name: 'Levanger', countyId: 50 },
            { munId: 514, name: 'Lom', countyId: 5 },
            { munId: 1422, name: 'Lærdal', countyId: 14 },
            { munId: 1002, name: 'Mandal', countyId: 10 },
            { munId: 5034, name: 'Meråker', countyId: 50, municipalShield: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Mer%C3%A5ker_komm.svg/800px-Mer%C3%A5ker_komm.svg.png'},
            { munId: 1502, name: 'Molde', countyId: 15 },
            { munId: 5005, name: 'Namsos', countyId: 50 },
            { munId: 216, name: 'Nesodden', countyId: 2 },
            { munId: 807, name: 'Notodden', countyId: 8, municipalShield: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Notodden_komm.svg/800px-Notodden_komm.svg.png'},
            { munId: 1228, name: 'Odda', countyId: 12 },
            { munId: 5021, name: 'Oppdal', countyId: 50 },
            { munId: 1243, name: 'Os', countyId: 12 },
            { munId: 2020, name: 'Porsanger', countyId: 20 },
            { munId: 805, name: 'Porsgrunn', countyId: 8 },
            { munId: 5043, name: 'Røyrvik', countyId: 50 },
            { munId: 1127, name: 'Randaberg', countyId: 11 },
            { munId: 432, name: 'Rendalen', countyId: 4 },
            { munId: 1840, name: 'Saltdal', countyId: 18 },
            { munId: 710, name: 'Sandefjord', countyId: 7 },
            { munId: 1573, name: 'Smøla', countyId: 15 },
            { munId: 1560, name: 'Tingvoll', countyId: 15 },
            { munId: 5001, name: 'Trondheim', countyId: 50, municipalShield: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Trondheim_komm.svg/800px-Trondheim_komm.svg.png'},
            { munId: 1835, name: 'Træna', countyId: 18 },
            { munId: 235, name: 'Ullensaker', countyId: 2 },
            { munId: 1231, name: 'Ullensvang', countyId: 12 },
            { munId: 1516, name: 'Ulstein', countyId: 15 },
            { munId: 2003, name: 'Vadsø', countyId: 20 },
            { munId: 5038, name: 'Verdal', countyId: 50 },
            { munId: 529, name: 'Vestre Toten', countyId: 5 },
            { munId: 1868, name: 'Øksnes', countyId: 18 },
            { munId: 5015, name: 'Ørland', countyId: 50 },
            { munId: 528, name: 'Østre Toten', countyId: 5, municipalShield: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/%C3%98stre_Toten_komm.svg/800px-%C3%98stre_Toten_komm.svg.png'},
            { munId: 5018, name: 'Åfjord', countyId: 50 },
            { munId: 1504, name: 'Ålesund', countyId: 15 },
            { munId: 1424, name: 'Årdal', countyId: 14 }
        ])
    }

    createUsers() {
        return User.bulkCreate(
            [
                {
                    firstName: 'Vegard',
                    lastName: 'Andersson',
                    email: 'test@test.no',
                    rank: 3,
                    salt: 'a83f4da094cc247b',
                    hashStr:
                        '30fed7291ca557c9296862fa62267295708deebf0fa553d17efcf0ea1049965b3175b20cf9b18d18e0249f73cd3e25b9c3ec4413cb35353516731257d2735722',
                    munId: 5016,
                    profilePicture: '',
                    Municipal: [{ munId: 528 }, { munId: 5027 }]
                },
                {
                    firstName: 'Christian',
                    lastName: 'Axell',
                    email: 'cdaxell@stud.ntnu.no',
                    rank: 3,
                    salt: 'b79ryp98',
                    hashStr: '897dfjsodif5vxd4c5vsldfskdclz97cyw7e3o2inJKHaospk902',
                    munId: 528,
                    profilePicture:
                        'https://pbs.twimg.com/profile_images/3304502717/94414e5d246ae893f1080cdc10e0d245_400x400.jpeg'
                },
                {
                    firstName: 'Sebastian',
                    lastName: 'Andresen',
                    email: 'sebasman@stud.ntnu.no',
                    rank: 1,
                    salt: 'b79ryp98',
                    hashStr: '897dfjsodif5vxd4c5vsldfskdclz97cyw7e3o2inJKHaospk902',
                    munId: 1504,
                    profilePicture:
                        'https://pbs.twimg.com/profile_images/3304502717/94414e5d246ae893f1080cdc10e0d245_400x400.jpeg'
                },
                {
                    firstName: 'Trond Jacob',
                    lastName: 'Rondestvedt',
                    email: 'trondjro@stud.ntnu.no',
                    rank: 1,
                    salt: 'b79ryp98',
                    hashStr: '897dfjsodif5vxd4c5vsldfskdclz97cyw7e3o2inJKHaospk902',
                    munId: 528,
                    profilePicture:
                        'https://pbs.twimg.com/profile_images/3304502717/94414e5d246ae893f1080cdc10e0d245_400x400.jpeg'
                },
                {
                    firstName: 'Sander',
                    lastName: 'Nicolausson',
                    email: 'sandern@stud.ntnu.no',
                    rank: 1,
                    salt: 'b79ryp98',
                    hashStr: '897dfjsodif5vxd4c5vsldfskdclz97cyw7e3o2inJKHaospk902',
                    munId: 528,
                    profilePicture:
                        'https://pbs.twimg.com/profile_images/3304502717/94414e5d246ae893f1080cdc10e0d245_400x400.jpeg'
                },
                {
                    firstName: 'Jørgen',
                    lastName: 'Aasvestad',
                    email: 'jorgaas@stud.ntnu.no',
                    rank: 1,
                    salt: 'a83f4da094cc247b',
                    hashStr: '897dfjsodif5vxd4c5vsldfskdclz97cyw7e3o2inJKHaospk902',
                    munId: 528,
                    profilePicture:
                        'https://pbs.twimg.com/profile_images/3304502717/94414e5d246ae893f1080cdc10e0d245_400x400.jpeg'
                },
                {
                    firstName: 'Herman Ryen',
                    lastName: 'Martinsen',
                    email: 'HermanRM@stud.ntnu.no',
                    rank: 2,
                    salt: 'a83f4da094cc247b',
                    hashStr: '30fed7291ca557c9296862fa62267295708deebf0fa553d17efcf0ea1049965b3175b20cf9b18d18e0249f73cd3e25b9c3ec4413cb35353516731257d2735722',
                    munId: 528,
                    profilePicture:
                        'https://pbs.twimg.com/profile_images/3304502717/94414e5d246ae893f1080cdc10e0d245_400x400.jpeg'
                },
                {
                    firstName: 'Herman',
                    lastName: 'Christiansen',
                    email: 'hermanc@stud.ntnu.no',
                    rank: 1,
                    salt: 'b79ryp98',
                    hashStr: '897dfjsodif5vxd4c5vsldfskdclz97cyw7e3o2inJKHaospk902',
                    munId: 528,
                    profilePicture:
                        'https://pbs.twimg.com/profile_images/3304502717/94414e5d246ae893f1080cdc10e0d245_400x400.jpeg'
                }
            ],
            {
                include: [
                    {
                        model: Municipal,
                        as: 'munId'
                    }
                ]
            }
        )
    }

    createStatuses() {
        return Status.bulkCreate([
            {
                statusId: 6,
                name: 'Ikke Behandlet'
            },
            {
                statusId: 2,
                name: 'Under Behandling'
            },
            {
                statusId: 3,
                name: 'Saken er fikset!'
            },
            {
                statusId: 4,
                name: 'Saken ble forlatt'
            },
            {
                statusId: 5,
                name: 'Saken er slettet'
            },
            {
                statusId: 1,
                name: 'Situation Normal, All fucked upp'
            }
        ])
    }

    createIssueCategory() {
        return IssueCategory.bulkCreate([
            { name: 'Fyllikere på gata som ødeleger lamper' },
            { name: 'En veilys er ødelagt' },
            { name: 'Et veihul på gata' },
            { name: 'Grafitti på offentlig bygning' },
            { name: 'Sømpel dumpet' },
            { name: 'Forlatt Sykkel' }
        ])
    }

    createIssues() {
        return Issue.bulkCreate([
            {
                issueId: 1,
                title: 'Dumme folk ødeleger lømp',
                content: 'Disse dumme folka som komemr rett fra byen ødeleger lamper kvelden til midtnatt',
                image:
                    'https://www.thesun.co.uk/wp-content/uploads/2018/07/AF-COMPOSITE-FIGHT.jpg?strip=all&quality=100&w=750&h=500&crop=1',
                longitude: 60.656877,
                latitude: 10.824107,
                date: new Date(Date.now()),
                munId: 528,
                userId: 1,
                categoryId: 1,
                statusId: 1
            },

            {
                issueId: 2,
                title: 'Veilys på gata hjemme er ødelagt',
                content: 'Et veilys på gata har blitt ødelagt',
                image: 'http://www.otera.no/image/20111206015-kopi.jpeg?w=1200',
                longitude: 60.661293,
                latitude: 10.828996,
                date: new Date(Date.now()),
                munId: 528,
                userId: 3,
                categoryId: 2,
                statusId: 2
            },

            {
                issueId: 3,
                title: 'Dårlig grafitti på skole veggen',
                content: 'Det er dårlig grafitti på skole veggen',
                image: 'http://i.imgur.com/so8Ea.jpg',
                longitude: 60.684721,
                latitude: 10.841522,
                createdAt: new Date(Date.now()),
                munId: 528,
                userId: 2,
                categoryId: 4,
                statusId: 6
            },

            {
                issueId: 4,
                title: 'Veilys ødelagt på 33',
                content: 'I have a question for god. WHYYYYYYYYYYY. Is this light broken',
                image: 'https://i.ytimg.com/vi/MPNN_nVwG5w/maxresdefault.jpg',
                longitude: 60.68273,
                latitude: 10.831514,
                date: new Date(Date.now()),
                munId: 528,
                userId: 6,
                categoryId: 2,
                statusId: 3
            }
        ])
    }

    createFeedback() {
        return Feedback.bulkCreate([
            {
                name: 'Dumme folk er dumme',
                content: 'Vi skal fikse dette!',
                date: new Date(Date.now()),
                userId: '2',
                issueId: '1'
            },
            {
                name: 'Veilyset på 33 er fisket!',
                content: 'Veilyset er fikset!',
                date: new Date(Date.now()),
                userId: '2',
                issueId: '4'
            }
        ])
    }

    createEventCategory() {
        return EventCategory.bulkCreate([
            {
                name: 'PARTY'
            },
            {
                name: 'Konsert'
            },
            {
                name: 'Galleri'
            }
        ])
    }

    crateEvent() {
        return Event.bulkCreate([
            {
                title: 'party at the house man!',
                content: 'Det skal være party at the house!',
                image: 'notin',
                longitude: 60.652168,
                latitude: 10.822102,
                timeStart: new Date(Date.now()),
                timeEnd: new Date(Date.now()),
                userId: '1',
                categoryId: 1,
                munId: 5001
            },
            {
                title: 'PARTIET FORSETTER!',
                content: 'DET FORRIGE PARTY FORSETTER HOS ANDERS!',
                image: 'notin',
                longitude: 60.655754,
                latitude: 10.817339,
                timeStart: new Date(Date.now()),
                timeEnd: new Date(Date.now()),
                userId: '2',
                categoryId: 1,
                munId: 5001
            }
        ])
    }

    createUserMunicipal() {
        return UserMunicipal.bulkCreate([
            {
                munId: 5001,
                userId: 1
            },
            {
                munId: 528,
                userId: 1
            }
        ])
    }

    createUserIssue() {
        return UserIssue.bulkCreate([
            {
                issueId: 2,
                userId: 2
            },
            {
                issueId: 1,
                userId: 2
            }
        ])
    }
}

export let modelsTestData = new ModelsTestData();