import ulog from "ulog";

function setLogLevelIfDefault() {
    const urlString = window.location.search;
    const urlParams = new URLSearchParams(urlString);
    if(!urlParams.has("log")) {
        ulog.level = ulog.ERROR
    }
}

export const ALEX_BIO = "Alex Hooten is currently a junior in computer science at Colorado State University. He has worked as a web developer with Voltage Advertising and Funeral Innovations, using HTML, CSS, PHP, and Javascript extensively. In his free time he likes to watch auto racing, play video games, and drive his 1995 Miata.";
export const SUYASH_BIO = "Suyash Hiray is a senior computer science student at Colorado State University. He has previous experience with a degree in Physics and work in a NASA funded research lab on cubesats and rockets. Outside of coursework he likes to spend his free time at the gym, playing video games, or watching movies.";
export const NICK_BIO = "Nicholas Davidson is a junior computer science student at Colorado State University. For the past two summers Nick worked for a small cyber security reseller and manged service provider. Nick is currently focusing on school to improve his knowledge of computer systems and security. A cool fact about him is that he is taller than the average american male according to most articles.";
export const PRESTON_BIO = "Preston Dunton is currently a junior at Colorado State University studying computer science with minors in math and statistics. Preston worked last summer as a Data Engineering Intern with the SketchUp team at Trimble Inc. His goal in school right now is to continue to develop a tool kit to work with and display data. One cool fact about him is that he loves music and is one of the drum majors for the 2020 CSU marching band!";
export const JESUS_BIO = "Jesus Garcia is a senior computer science student at Colorado State University. This summer Jesus worked on a cyber security project under the guidance of professor Yashwant K. Malaiya. Jesus is currently working on writing a report on his findings. A cool fact about him is that his right hand can't touch his right elbow.";

setLogLevelIfDefault();

export const LOG = ulog("App");

export const CLIENT_TEAM_NAME = "T01 Feather Friends";

export const EARTH_RADIUS_UNITS_DEFAULT = {"miles": 3959};
export const PROTOCOL_VERSION = 4;
export const EMPTY_TRIP = {"options": {"title": "", "earthRadius": ""}, "places": [], "distances": [], "requestType": "find", "requestVersion": {PROTOCOL_VERSION}};
export const TRIP = {"options": {"title": "", "earthRadius": "", "units": "", "response": ""}, "places": [], "distances": [], "requestType": "find", "requestVersion": {PROTOCOL_VERSION}};
export const EMPTY_SEARCH = {"found": 0, "match": "", "places": [], "requestType": "find", "requestVersion": {PROTOCOL_VERSION}};

export const HTTP_OK = 200;
export const HTTP_BAD_REQUEST = 400;
export const HTTP_INTERNAL_SERVER_ERROR = 500;
