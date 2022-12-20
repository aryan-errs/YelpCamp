const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelper');
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewurlParser: true,
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", ()=>{
    console.log("Database Connected");
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async() =>{
    await Campground.deleteMany({});
    for(let i = 0; i < 50; i++){
        const randomInt = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random()*30) + 10;
        const camp = new Campground({
            location: `${cities[randomInt].city}, ${cities[randomInt].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam obcaecati necessitatibus suscipit inventore totam, blanditiis non! Odio, esse tempore vel quisquam, libero provident optio ipsum nemo alias debitis dicta accusamus!',
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})