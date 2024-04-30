import axios from "axios";

const wikiapi = axios;

wikiapi.defaults.baseURL = `https://en.wikipedia.org/w/api.php`;
axios.defaults.params = {
  origin: "*",
  format: "json",
  action: "query",
  prop: "pageimages",
  piprop: "thumbnail",
  pithumbsize: 400,
  generator: "search",
  gsrlimit: 1,
};

export default wikiapi;
