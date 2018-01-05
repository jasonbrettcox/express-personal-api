// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var new_sandwich = [
    { description: 'Meatball Sub',
        Bread: 'Sub',
        Protein: 'Meatballs',
        Condiment: 'Marinara',
        Length: 12
    },
{ description: 'Patty Melt',
Bread: 'Toast',
Protein: 'Hamburger',
Condiment: 'Thousand Island',
Length: 6
}

]

db.Sandwich.remove({}, function(err, sandwich){
    if(err){console.log("Experienced a problem removing", err);}
    else{
        db.Sandwich.create(new_sandwich, function(err, mySandwich){
            if(err){return console.log("Had problems ", err);}
            process.exit();
        });
    }
});
