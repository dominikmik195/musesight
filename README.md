# MuseSight

MuseSight is a music player which also gives an insight into most listened to genres and artists of a user.

To use the app, you need a Spotify account. Using free Spotify account, you will have access to track lists and insights, but you won't be able to use the player. However, with premium Spotify account you can use the player as well.

Instructions to set up the app locally:

1. Install Node.js via https://nodejs.org (be careful to install npm as well)
2. Install yarn using command: `npm install --global yarn`
3. Install Ember-CLI using command: `npm install -g ember-cli`
4. Download the repository
5. Install HighChart library using command: `npm install highcharts --save`, najbolje u direktoriju projekta
6. In file `routes/callback.js` you need to fill up clientSecret - you can contact me to get the datum. I will also need the e-mail connected to the Spotify account you will use with this app (because the app is still in development mode).
7. Enter the root directory of the project and run command `yarn`, and then run server using command `ember s`
8. Open page https://localhost:4200

---

_**Note**_:

_The app is still very much in development and there are many improvements to be made. Some of the known bugs are:_
 - _when you change playback state in Spotify player, MuseSight player won't be synced_
 - _some of the icons (like the Spotify icon used for accessing your Spotify profile) occasionally get broken_
 - _refreshing the page breaks the player (so you need to log out and log back in again to get it to work again)_

_Feel free to contact me if you notice any new bugs so I can fix them!_
