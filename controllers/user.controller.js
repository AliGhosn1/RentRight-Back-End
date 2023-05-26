import User from "../mongodb/models/user.js";

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find({}).limit(req.query._end);

        if(!allUsers) throw new Error({ message: 'Couldn\'t fetch users'  });

        res.status(200).json(allUsers);
    } catch (error) {
        res.staus(500).json({ message: error.message });
    }
};

const createUser = async (req, res) => {
    try{
        const { name, email, avatar } = req.body;

        const userExist = await User.findOne({ email });

        if(userExist) return res.status(200).json(userExist);

        const newUser = await User.create({ name, email, avatar });

        res.status(200).json(newUser);
    } catch(error){
        res.status(500).json({ message: error.message });
    }


};

const getUserInfoByID = async (req, res) => {
    const{ id } = req.params;

    try {
        const user = await User.findOne({ _id: id }).populate('allProperties');

        if(user) return res.status(200).json(user);
        throw new Error({ message: 'User not found' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export { getAllUsers, createUser, getUserInfoByID };