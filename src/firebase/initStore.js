const env = (path) => process.env[`REACT_APP_${path}`];
const latLng = (path, lat) => parseFloat(env(`MAP_${path}_${lat ? "LAT" : "LNG"}`));

const initStore = {
  estados: [],
  paths: [],
  invitados: [],
  menus: [],
  settings: {
    loading: true,
    wamsg: env("WA_MSG"),
    wadesk: true,
    nombres: env("NAMES"),
    eventDate: parseInt(env("EVENT_DATE"), 0),
    map: {
      line1: env("MAP_MARKER_LINE1"),
      line2: env("MAP_MARKER_LINE2"),
      directions: env("MAP_DIRECTION_LINK"),
      points: ["CENTER", "MARKER"].reduce((a, p) => ({ ...a, [p.toLocaleLowerCase()]: { lat: latLng(p, true), lng: latLng(p) } }), {}),
    },
  },
};

export default initStore;
