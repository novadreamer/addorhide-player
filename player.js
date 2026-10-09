"use strict";

// The AddOrHide extension opens this page as `#site=<site>&<key>=<id>&title=<text>`. The part after "#" never
// leaves the browser, so this host does not learn what is played. Each site's official, unmodified embed player
// is used, with that site's own ads and controls.
const PLAYERS = {
  youtube: {
    key: "id", pattern: /^[A-Za-z0-9_-]{11}$/,
    embed: id => `https://www.youtube.com/embed/${id}?autoplay=1&playsinline=1`,
    name: "YouTube"
  },
  twitch: {
    key: "channel", pattern: /^[A-Za-z0-9_]{2,25}$/,
    embed: channel => `https://player.twitch.tv/?channel=${channel}&parent=${location.hostname}&autoplay=true`,
    name: "Twitch"
  },
  twitchvideo: {
    key: "video", pattern: /^[0-9]{1,15}$/,
    embed: video => `https://player.twitch.tv/?video=${video}&parent=${location.hostname}&autoplay=true`,
    name: "Twitch"
  },
  twitchclip: {
    key: "clip", pattern: /^[A-Za-z0-9_-]{2,100}$/,
    embed: clip => `https://clips.twitch.tv/embed?clip=${clip}&parent=${location.hostname}&autoplay=true`,
    name: "Twitch"
  },
  imdb: {
    key: "id", pattern: /^vi[0-9]{4,12}$/,
    embed: id => `https://www.imdb.com/video/embed/${id}/`,
    name: "IMDb"
  }
};

function show() {
  const params = new URLSearchParams(location.hash.slice(1));
  const player = PLAYERS[params.get("site")];
  const value = player ? params.get(player.key) || "" : "";
  const stage = document.getElementById("stage");
  const message = document.getElementById("message");
  stage.querySelectorAll("iframe").forEach(frame => frame.remove());
  if (!player || !player.pattern.test(value)) {
    message.hidden = false;
    document.title = "AddOrHide player";
    return;
  }
  const label = (params.get("title") || player.name).slice(0, 200);
  // The window's own title bar shows this; each official player has its own link back to the site.
  document.title = `${label} - AddOrHide player`;
  message.hidden = true;
  const frame = document.createElement("iframe");
  frame.src = player.embed(value);
  frame.title = `${player.name} player`;
  frame.allow = "autoplay; encrypted-media; fullscreen; picture-in-picture";
  frame.allowFullscreen = true;
  frame.referrerPolicy = "strict-origin-when-cross-origin";
  stage.appendChild(frame);
}

window.addEventListener("hashchange", show);
show();
