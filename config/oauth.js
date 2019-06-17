/* eslint-disable */
var passport = require('passport')
  , OAuthStrategy = require('passport-oauth').OAuthStrategy;

var consumerKey = "oKUAPHG2bGV3X6xqymmWz07HXVT5jOvVLtn95rmbrtBdbFCE1E";
var consumerSecret = "TK3WijAZ3rZyiH1sZJyjuOSw5uOraCBzF9ray87o";

passport.use('getToken', new OAuthStrategy({
  requestTokenURL: '//api.petfinder.com/v2/oauth2/token',
  // accessTokenURL: 'https://www.example.com/oauth/access_token',
  userAuthorizationURL: 'https://www.example.com/oauth/authorize',
  consumerKey: consumerKey,
  consumerSecret: consumerSecret,
  callbackURL: "http://127.0.0.1:3000/auth/example/callback",
  signatureMethod: "RSA-SHA1"
},
function(token, tokenSecret, profile, cb) {
  User.findOrCreate({ exampleId: profile.id }, function (err, user) {
    return cb(err, user);
  });
}
));
