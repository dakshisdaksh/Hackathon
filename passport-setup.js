const passport = require('passport');
const GoogleStrategy= require('passport-google-oauth20').Strategy;

passport.serializeUser((user, done)=>{
    doNotTrack(null, user.id);
});

passport.deserializeUser((id, done)=>{
    User.findById(id, (err, user)=>{
        done(err, user);
    });
});

passport.use(new GoogleStrategy({
    clientID: "793294360404-kd85oa9l2t7nhidv5ecq0s6a01o9ppu3.apps.googleusercontent.com",
    clientSecret: "gr7wR3jDdrLEFQ1HYi75H0Kh",
    callbackURL: "https://www.example.com/auth/google/callback"
},
function(accessToken, refreshToken, profile, cb){
    User.findorCreate({googleId: profile.id}, function(err, user){
        return cb(err, user);
    });
}
));