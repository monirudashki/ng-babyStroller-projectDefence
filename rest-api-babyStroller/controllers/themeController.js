const { userModel } = require('../models');
const babyStroller = require('../models/babyStrollerModel');
const { newPost } = require('./postController')

async function getThemes(req, res, next) {
    const page = req.query.page;
    const limit = 3;
    
    const skip = (page - 1) * limit;
    
    const result = await babyStroller.find().limit(limit).skip(skip).populate('userId');
    
    try {
        res.json(result);
    }catch (err) {
        next();
    }
}

async function getStrollersLength(req , res , next) {
    const result = await babyStroller.find();
    const strollersLength = result.length;

    try {
        res.json(strollersLength);
    } catch (err) {
        next();
    }
}

async function getUserStrollersLength(req , res , next) {
    const userId = req.params.userId;
    const result = await babyStroller.find({ userId: userId});
    const strollersLength = result.length;

    try {
        res.json(strollersLength);
    } catch (err) {
        next();
    }
}

function getTheme(req, res, next) {
    const { themeId } = req.params;

    babyStroller.findById(themeId)
        .populate({
            path : 'comments',
            populate : {
              path : 'userId'
            }
          })
        .then(theme => res.json(theme))
        .catch(next);
}


async function createTheme(req, res, next) {
    const { babyStrollerBrand, imageUrl , year , price , condition } = req.body;
    const { _id: userId } = req.user;
    const user = await userModel.findById(userId);
   
    try{
        const stroller = await babyStroller.create({
            babyStrollerBrand , imageUrl , year , price , condition , likes: [] , comments: [], userId
        });

        user.babyStrollers.push(stroller);

        await user.save();

        return res.json(stroller);
    } catch (err) {
        next();
    }
}

function editStroller(req , res , next) {
    const { strollerId } = req.params;
    const { babyStrollerBrand, imageUrl , year , price , condition } = req.body;
    const { _id: userId } = req.user;

    babyStroller.findByIdAndUpdate({ _id: strollerId, userId }, { 
        babyStrollerBrand: babyStrollerBrand,
        imageUrl: imageUrl,
        year: year,
        price: price,
        condition: condition
     }, { new: true })
     .then(updatedStroller => {
        if (updatedStroller) {
            res.status(200).json(updatedStroller);
        }
        else {
            res.status(401).json({ message: `Not allowed!` });
        }
    })
    .catch(next);
}

function subscribe(req, res, next) {
    const themeId = req.params.themeId;
    const { _id: userId } = req.user;
    themeModel.findByIdAndUpdate({ _id: themeId }, { $addToSet: { subscribers: userId } }, { new: true })
        .then(updatedTheme => {
            res.status(200).json(updatedTheme)
        })
        .catch(next);
};

async function deleteStroller(req,res, next) {
    const { strollerId } = req.params;
    const { _id: userId } = req.user;

    const user = await userModel.findById(userId);

    const index = user.babyStrollers.indexOf(strollerId);
    user.babyStrollers.splice(index , 1);

    await user.save();

    babyStroller.findOneAndDelete({ _id: strollerId, userId })
    .then(deleteOne => {
        if (deleteOne) {
            res.status(200).json(deleteOne)
        } else {
            res.status(401).json({ message: `Not allowed!` });
        }
    })
    .catch(next);
}

async function likeStroller(req , res , next) {
    const { strollerId } = req.params;
    const { _id: userId } = req.user;
    
    const stroller = await babyStroller.findById(strollerId);
    stroller.likes.push(userId);
     
    await stroller.save();

    return res.status(200).json(stroller);
}

async function unlikeStroller(req , res , next) {
    const { strollerId } = req.params;
    const { _id: userId } = req.user;
    
    const stroller = await babyStroller.findById(strollerId);
    const index = stroller.likes.indexOf(userId);
    stroller.likes.splice(index , 1);
     
    try{
        await stroller.save();
        return res.status(200).json(stroller);
    } catch(err) {
        next();
    }
}

async function strollersBySearch(req , res , next) {
    const searchBy = req.query.searchBy;
    const search = req.query.search;
    const page = req.query.page;
    const limit = 3;
    
    const skip = (page - 1) * limit;
    
    let searchResult = [];
    if(searchBy == 'babyStrollerBrand' || searchBy == 'condition') {
      searchResult = await babyStroller.find({ [searchBy]: {$regex: search, $options: 'i'} }).limit(limit).skip(skip).populate('userId');;
    } else if (searchBy == 'price') {
      const array = req.query.search.split('-');
      const min = array[0];
      const max = array[1];
      const strollers = await babyStroller.find().limit(limit).skip(skip).populate('userId');
      searchResult = strollers.filter((stroller) => stroller.price > min && stroller.price < max);
    }

    try {
      return res.json(searchResult);
    } catch (err) {
      next();
    }
}

async function strollersBySearchLength(req , res , next) {
    const searchBy = req.query.searchBy;
    const search = req.query.search;
    
    let searchResult = [];
    if(searchBy == 'babyStrollerBrand' || searchBy == 'condition') {
      searchResult = await babyStroller.find({ [searchBy]: {$regex: search, $options: 'i'} }).populate('userId');;
    } else if (searchBy == 'price') {
      const array = req.query.search.split('-');
      const min = array[0];
      const max = array[1];
      const strollers = await babyStroller.find().populate('userId');
      searchResult = strollers.filter((stroller) => stroller.price > min && stroller.price < max);
    }

    try {
      return res.json(searchResult.length);
    } catch (err) {
      next();
    }
}

async function getUserStrollers(req , res , next) {
    const page = req.query.page;
    const limit = 3;
    
    const skip = (page - 1) * limit;
    const userId = req.params.userId;

    const result =  await babyStroller.find({ userId: userId}).limit(limit).skip(skip).populate('userId');

    try {
        res.json(result);
    }catch (err) {
        next();
    }
}

module.exports = {
    getThemes,
    createTheme,
    getTheme,
    subscribe,
    editStroller,
    deleteStroller,
    likeStroller,
    unlikeStroller,
    strollersBySearch,
    getUserStrollers,
    getStrollersLength,
    getUserStrollersLength,
    strollersBySearchLength
}
