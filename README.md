# AddOrHide player

The page the AddOrHide browser extension opens in its floating player window. It shows one video in that
site's official, unmodified embed player (YouTube, Twitch, IMDb trailers), with the site's own ads and controls.

The extension passes the video after the `#` in the address (`#site=youtube&id=...`). Browsers never send
that part to the server, so this host does not learn what is played. The page loads no scripts, images or
trackers other than the official player, enforced by its Content-Security-Policy.

Browser pages of extensions cannot host these players (YouTube answers "Error 153", Twitch and IMDb refuse
to be framed there), which is why the player lives on an ordinary web page.

The AddOrHide privacy policy is published here too: https://novadreamer.github.io/addorhide-player/privacy.html
