const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const person = require('./models/person');



passport.use(new localStrategy(async (username, password, done) => {
    try{
        // console.log('Received Credientials:', username, password);
        const user = await person.findOne({username: username});
        if(!user)
            return done(null,false, {message: 'incorrect email'});
        
        const isPasswordMatched = await user.comparePass(password);
        
        if(isPasswordMatched){
            return done(null, user);
        }else{
            return done(null, false, {message : 'invalid password'});
        }

    }catch(err){
        return done(err);
    }
}))


// Serialize and Deserialize User
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await person.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

module.exports = passport;