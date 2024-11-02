const mongoose = require('mongoose')

const HotelSchema= new mongoose.Schema({
    
        name: {
            type:String,
            required:true
        },
        category: {
            type:String,
            required:true,
            enum:['Budget', 'Mid-Range', 'Luxury', 'Boutique', 'Resort', 'Other']
        },
        location: {
            type:String,
            required:true
        },
        rating: {
            type:String,
            min:0,
            max:5,
            default:0,
            required:true
        },
        reviews: {
            type:[String]
        },
        website: {
            type:String,
            required:true
        },
        phoneNumber: {
            type:String,
            required:true
        },
        checkInTime: {
            type:String,
            required:true
        },
        checkOutTime: {
            type:String,
            required:true
        },
        amenities: {
            type:[String],
            
        },
        priceRange: {
            type:String,
            required:true,
            enum:[ '$$ (11-30)', '$$$ (31-60)', '$$$$ (61+)', 'Other']
        },
        reservationsNeeded: {
            type:Boolean,
            default:false,
            required:true
        },
        isParkingAvailable: {
            type:Boolean,
            default:false,
            required:true
        },
        isWifiAvailable: {
            type:Boolean,
            default:false,
            required:true
        },
        isPoolAvailable: {
            type:Boolean,
            default:false,
            required:true
        },
        isSpaAvailable: {
            type:Boolean,
            default:false,
            required:true
        },
        isRestaurantAvailable: {
            type:Boolean,
            default:false,
            required:true
        },
        photos: {
            type:[String],
            required:true
        },
      
},{
    timestamps:true
})


const Hotel= mongoose.model('Hotel',HotelSchema)

module.exports=Hotel
