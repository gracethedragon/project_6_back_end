import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User';
import bcrypt from 'bcrypt';

dotenv.config();

const hash = bcrypt.hashSync('123', 10);

mongoose.connect('mongodb://127.0.0.1:27017/project5', () => {
	console.log('connected to mongodb');
});

const userSeeds = [
	{
		firstName: 'Gregory',
		lastName: 'Cheok',
		username: 'Cheoklate',
		email: 'gcheok88@gmail.com',
		password: hash,
		friends: [{ userName: 'GracetheDragon' }, { userName: 'Smdewi' }],
	},
	{
		firstName: 'Grace',
		lastName: 'Koh',
		username: 'GracetheDragon',
		email: 'gracethedragon@hotmail.com',
		password: hash,
		friends: [{ userName: 'Cheoklate' }, { userName: 'Smdewi' }],
	},
	{
		firstName: 'Sri',
		lastName: 'Mulyanidewi',
		username: 'Smdewi',
		email: '',
		password: hash,
		friends: [{ userName: 'GracetheDragon' }, { userName: 'Cheoklate' }],
	},
];

const runSeeder = async () => {
	console.log('test');
	// delete all existing records in the DB
	await User.deleteMany({});
	// delete all existing habits in the DB
	// await Habits.deleteMany({});
	// inserts seed data
	const users = await User.insertMany(userSeeds);
	console.log('Inserted userSeeds. This is the result: ', users);
	// find all names in the db
	const allNames = await User.find().select('username');
	console.log('All the users in our app', allNames);
	// get all the userIds
	const userIds = allNames.map((el: { _id: any }) => el._id);
	console.log('All the userIds in our app', userIds);
};

runSeeder().then(() => {
	mongoose.connection.close();
});
