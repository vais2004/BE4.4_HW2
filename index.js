const express = require('express')
const app= express()

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

const {initializeDatabase}= require('./db/db.connect')
const Hotel = require('./models/hotel.models');
const { error } = require('console');

app.use(express.json())

initializeDatabase()

const newHotel1 = {
    name: "New Hotel",
    category: "Mid-Range",
    location: "123 Main Street, Frazer Town",
    rating: 4.0,
    reviews: [],
    website: "https://hotel-example.com",
    phoneNumber: "+1234567890",
    checkInTime: "2:00 PM",
    checkOutTime: "12:00 PM",
    amenities: ["Laundry", "Room Service"],
    priceRange: "$$$ (31-60)",
    reservationsNeeded: true,
    isParkingAvailable: true,
    isWifiAvailable: true,
    isPoolAvailable: false,
    isSpaAvailable: false,
    isRestaurantAvailable: true,
    photos: ["https://example.com/hotel-photo1.jpg", "https://example.com/hotel-photo2.jpg"],
  };

  const newHotel2 = {
    name: "Lake View",
    category: "Mid-Range",
    location: "124 Main Street, Anytown",
    rating: 3.2,
    reviews: [],
    website: "https://lake-view-example.com",
    phoneNumber: "+1234555890",
    checkInTime: "2:00 PM",
    checkOutTime: "12:00 PM",
    amenities: ["Laundry", "Boating"],
    priceRange: "$$$ (31-60)",
    reservationsNeeded: true,
    isParkingAvailable: false,
    isWifiAvailable: true,
    isPoolAvailable: false,
    isSpaAvailable: false,
    isRestaurantAvailable: false,
    photos: ["https://example.com/hotel1-photo1.jpg", "https://example.com/hotel1-photo2.jpg"],
  };

  const newHotel3 = {
    name: "Sunset Resort",
    category: "Resort",
    location: "12 Main Road, Anytown",
    rating: 4.0,
    reviews: [],
    website: "https://sunset-example.com",
    phoneNumber: "+1299655890",
    checkInTime: "2:00 PM",
    checkOutTime: "11:00 AM",
    amenities: ["Room Service", "Horse riding", "Boating", "Kids Play Area", "Bar"],
    priceRange: "$$$$ (61+)",
    reservationsNeeded: true,
    isParkingAvailable: true,
    isWifiAvailable: true,
    isPoolAvailable: true,
    isSpaAvailable: true,
    isRestaurantAvailable: true,
    photos: ["https://example.com/hotel2-photo1.jpg", "https://example.com/hotel2-photo2.jpg"],
  };
  

async function createHotel(newHotel){
    try{
     const hotel= new Hotel(newHotel)
     const saveHotel= await hotel.save()
     console.log("New Hotel Data: ",saveHotel)
    }catch(error){
        throw error
    }
}
// createHotel(newHotel1)
//  createHotel(newHotel2)
// createHotel(newHotel3)



//get hotels from the database

async function readAllHotels() {
    try{
        const hotel = await Hotel.find()
        return hotel

    }catch(error){
        throw error
    }
}
 app.get( "/hotels", async(req,res)=>{
    try{
        const hotels= await readAllHotels()
        if(hotels.length!=0){
            res.json(hotels)
        }else{
            res.status(404).json({error:"hotel not found"})
        }

    }catch(error){
        res.status(500).json({error:"failed to fetch data from hotels"})
    }
 })


//get hotel by name
async function readHotelName(hotelName) {
    try{
        const hotel = await Hotel.find({name:hotelName})
        return hotel

    }catch(error){
        throw error
    }
}

app.get("/hotels/:hotelName", async(req,res)=>{
    try{
        const hotel = await readHotelName(req.params.hotelName)

        if(hotel){
            res.json(hotel)
        }else{
            res.status(404).json({error:"hotel not found."})
        }
    }catch(error){
        res.status(500).json({error:"failed to fetch data"})
    }
})



//get hotels which offers parking space
async function readHotelWithParking(hotelparking) {
    try{
        const hotel= await Hotel.find({isParkingAvailable:hotelparking})
        console.log(hotel)
    }catch(error){
        throw error
    }
} 

//readHotelWithParking(true)



//get hotels which has restaurant available
async function readHotelWithRestaurant(hotelWithRestaurant) {
    try{
        const hotel= await Hotel.find({isRestaurantAvailable:hotelWithRestaurant})
        console.log(hotel)
    }catch(error){
        throw error
    }
} 

//readHotelWithRestaurant(true)



//get hotels by category ("Mid-Range")
async function readHotelWithCategory(hotelCategory) {
    try{
        const hotel = await Hotel.find({category:hotelCategory})
        return hotel
    }catch(error){
        throw error
    }
}

app.get("/hotels/category/:hotelCategory", async(req,res)=>{
    try{
        const hotel = await readHotelWithCategory(req.params.hotelCategory)
        if(hotel){
            res.json(hotel)
        }else{
            res.status(404).json({error:"hotel not found"})
        }
    }catch(error){
        res.status(500).json({error:"failed to fetch data"})
    }
})


//all hotels by price range ("$$$$ (61+)")
async function readHotelWithPriceRange(hotelWithPriceRange) {
    try{
        const hotel = await Hotel.find({priceRange:hotelWithPriceRange})
        console.log(hotel)
    }catch(error){
        throw error
    }
}

//readHotelWithPriceRange("$$$$ (61+)")  



//getall hotels with 4.0 rating
async function readHotelWithRating(hotelWithRating) {
    try{
        const hotel = await Hotel.find({rating:hotelWithRating})
        return hotel
    }catch(error){
        throw error
    }
}

app.get("/hotels/rating/:hotelWithRating", async(req,res)=>{
    try{
        const hotel = await readHotelWithRating(req.params.hotelWithRating)
        if(hotel){
            res.json(hotel)
        }else{
            res.status(404).json({error:"hotel not found"})
        }
    }catch{
        res.status(500).json({error:"failed to fetch data"})
    }
})



//get hotel by phone number ("+1299655890")
async function readHotelWithPhoneNumber(hotelWithPhoneNumber) {
    try{
        const hotel = await Hotel.find({phoneNumber:hotelWithPhoneNumber})
        return hotel
    }catch(error){
        throw error
    }
}

app.get("/hotels/directory/:hotelWithPhoneNumber", async(req,res)=>{
    try{
        const hotel = await readHotelWithPhoneNumber(req.params.hotelWithPhoneNumber)

        if(hotel){
            res.json(hotel)
        }else{
            res.status(404).json({error:"hotel not found"})
        }

    }catch(error){
        res.status(500).json({error:"failed to fetch data"})
    }
 

})



// find hotel by id and update it's checkOutTime
async function updateHotelCheckOutTime(hotelId, dataToUpdate) {
    try{
        const updatedHotel= await Hotel.findByIdAndUpdate(hotelId,dataToUpdate,{new:true})
        console.log(updatedHotel)
    }catch(error){
        throw error
    }
}

//updateHotelCheckOutTime('66fe70edb70b438908da624a',{checkOutTime:'11:00 AM'})

//find hotel by name and update it's rating
async function updatesHotelRating(hotelId, dataToUpdate) {
    try{
        const updatedHotel= await Hotel.findByIdAndUpdate(hotelId, dataToUpdate, {new:true})
        return updatedHotel
    }catch(error){
        throw error
    }
}

app.post('/hotels/:hotelId', async(req,res)=>{
    try{
        const updatedHotel= await updatesHotelRating(req.params.hotelId, req.body)

        if(updatedHotel){
            res.status(200).json({message:"hotel updated successfully"})
        }else{
            res.status(404).json({error:"hotel not found."})
        }
    }catch(error){
        res.status(500).json({error:"failed to update data."})
    }
})

//find hotel by name and update it's rating
async function updateHotelRating(hotelName, dataToUpdate) {
    try{
        const updatedHotel= await Hotel.findOneAndUpdate({name:hotelName}, dataToUpdate, {new:true})
        console.log(updatedHotel)
    }catch(error){
        throw error
    }
}

//updateHotelRating('Sunset Resort',{rating:4.2})

//find one data and update its phone number

async function updateHotelPhoneNumber(hotelPhoneNumber, dataToUpdate) {
    try{
        const updatedHotel= await Hotel.findOneAndUpdate({phoneNumber:hotelPhoneNumber}, dataToUpdate, {new:true})
        console.log(updatedHotel)
    }catch(error){
        throw error
    }
    
}

//updateHotelPhoneNumber("+1299655890", {phoneNumber : "+1997687392"})


//accepts a hotel ID and deletes the hotel data from the db

async function deleteHotelById(hotelId) {
    try{
        const deleteHotel = await Hotel.findByIdAndDelete(hotelId);
        console.log(`Deleted restaurant: `, deleteHotel);
    } catch(error){
        throw error;
    }
}

//deleteHotelById('66fe70edb70b438908da6249')


async function deleteHotelByPhoneNumber(hotelPhNumber) {
    try{
        const deleteHotel= await Hotel.findOneAndDelete({phoneNumber: hotelPhNumber})
        console.log(deleteHotel)
    }catch(error){
        throw error
    }
}

//deleteHotelByPhoneNumber('+1234567890')

//delete hotel by id
async function deletesHotelById(hotelId) {
    try{
        const deleteHotel= await Hotel.findByIdAndDelete(hotelId)
        return deleteHotel
    }catch(error){
        throw error
    }
}

app.delete('/hotels/:hotelId',async(req,res)=>{
    try{
        const deleteHotel= await deletesHotelById(req.params.hotelId)

        if(deleteHotel){
            res.status(200).json({message:"hotel deleted successfully."})
        }
    }catch(error){
        res.status(500).json({message:"failed to delete data."})
    }
})





const PORT =3000
app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`)
})