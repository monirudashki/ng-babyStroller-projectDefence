const { userModel } = require('../models');
const babyStroller = require('../models/babyStrollerModel');
const { newPost } = require('./postController')

async function getThemes(req, res, next) {
    const page = req.query.page;
    
    const limit = 3;
    
    const skip = (page - 1) * limit;
    
    const result = await babyStroller.find({status: 'active'}).limit(limit).skip(skip).populate('userId');
    
    try {
        res.json(result);
    }catch (err) {
        next();
    }
}

async function getStrollersForAdmin(req , res, next) {
    const page = req.query.page;
    const limit = 3;
    
    const skip = (page - 1) * limit;

    const strollers = await babyStroller.find({status: 'holding'}).limit(limit).skip(skip).populate('userId');

    try {
        res.json(strollers);
    } catch(err) {
        next();
    }
}

async function getStrollersLength(req , res , next) {
    const result = await babyStroller.find({status: 'active'});
    const strollersLength = result.length;

    try {
        res.json(strollersLength);
    } catch (err) {
        next();
    }
}

async function getUserStrollersLength(req , res , next) {
    const userId = req.params.userId;
    const result = await babyStroller.find({ userId: userId , status: 'active'});
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
    const admin = await userModel.find({roles: 'admin'});

    try{
        const stroller = await babyStroller.create({
            babyStrollerBrand , imageUrl , year , price , condition , likes: [] , comments: [], userId
        });
        
        if(admin) {
            admin[0].babyStrollers.push(stroller);
            await admin[0].save();
        }
        user.babyStrollers.push(stroller);

        await user.save();

        return res.json(stroller);
    } catch (err) {
        next();
    }
}

async function editStroller(req , res , next) {
    const { strollerId } = req.params;
    const { babyStrollerBrand, imageUrl , year , price , condition } = req.body;
    const { _id: userId } = req.user;

    const admin = await userModel.find({roles: 'admin'});

    const stroller = await babyStroller.findByIdAndUpdate({ _id: strollerId, userId }, { 
        babyStrollerBrand: babyStrollerBrand,
        imageUrl: imageUrl,
        year: year,
        price: price,
        condition: condition,
        status: 'holding'
     }, { new: true });
    
    if(admin) {
        admin[0].babyStrollers.push(stroller);
        await admin[0].save();
    }
    
    if (stroller) {
        res.status(200).json(stroller);
    }
    else {
        res.status(401).json({ message: `Not allowed!` });
    }
    
    
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

    const admin = await userModel.find({roles: 'admin'});
    if(admin) {
      const index = admin[0].babyStrollers.indexOf(strollerId);
      admin[0].babyStrollers.splice(index , 1);
      admin[0].save();
    }

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
      searchResult = await babyStroller.find({ [searchBy]: {$regex: search, $options: 'i'} , status: 'active'}).limit(limit).skip(skip).populate('userId');;
    } else if (searchBy == 'price') {
      const array = req.query.search.split('-');
      const min = array[0];
      const max = array[1];
      const strollers = await babyStroller.find({status: 'active'}).limit(limit).skip(skip).populate('userId');
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
      searchResult = await babyStroller.find({ [searchBy]: {$regex: search, $options: 'i'} , status: 'active' }).populate('userId');;
    } else if (searchBy == 'price') {
      const array = req.query.search.split('-');
      const min = array[0];
      const max = array[1];
      const strollers = await babyStroller.find({status: 'active'}).populate('userId');
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

    const result =  await babyStroller.find({ userId: userId , status: 'active'}).limit(limit).skip(skip).populate('userId');

    try {
        res.json(result);
    }catch (err) {
        next();
    }
}

async function getUserStrollersHolding(req , res , next) {
    const page = req.query.page;
    const limit = 3;
    
    const skip = (page - 1) * limit;
    const userId = req.params.userId;

    const result =  await babyStroller.find({ userId: userId , status: 'holding'}).limit(limit).skip(skip).populate('userId');

    try {
        res.json(result);
    }catch (err) {
        next();
    }
}

async function getUserStrollersModerated(req , res , next) {
    const page = req.query.page;
    const limit = 3;
    
    const skip = (page - 1) * limit;
    const userId = req.params.userId;

    const result =  await babyStroller.find({ userId: userId , status: 'moderated'}).limit(limit).skip(skip).populate('userId');

    try {
        res.json(result);
    }catch (err) {
        next();
    }
}


async function adminModerateStroller(req , res , next) {
    const { strollerId } = req.params;
    const { _id: userId } = req.user;

    const admin = await userModel.findById(userId);

    const index = admin.babyStrollers.indexOf(strollerId);
    admin.babyStrollers.splice(index, 1);
    await admin.save();

    const stroller = await babyStroller.findById(strollerId);
    stroller.status = 'moderated';

    await stroller.save();

    try {
      res.json(stroller);
    } catch (err){
      next()
    }
}

async function adminApproveStroller(req , res , next) {
    const { strollerId } = req.params;
    const { _id: userId } = req.user;

    const admin = await userModel.findById(userId);

    const index = admin.babyStrollers.indexOf(strollerId);
    admin.babyStrollers.splice(index, 1);
    await admin.save();

    const stroller = await babyStroller.findById(strollerId);
    stroller.status = 'active';

    await stroller.save();

    try {
      res.json(stroller);
    } catch (err){
      next()
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
    strollersBySearchLength,
    getStrollersForAdmin,
    adminModerateStroller,
    adminApproveStroller,
    getUserStrollersHolding,
    getUserStrollersModerated
}
