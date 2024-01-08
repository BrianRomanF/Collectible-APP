// userController.js
import UserModel from '../schemas/user.js';
import CollectibleModel from '../schemas/collectible.js';
import { addCollectibleDefault } from './collectibleController.js';

const userController = {
  createUser: async (req, res) => {
    try {
      // Extract user data from the request body
      const { userId, displayName } = req.body;

      // Check if user with the provided userId already exists
      const existingUser = await UserModel.findOne({ userId });

      if (existingUser) {
        return res.status(400).json({ error: 'User with this userId already exists' });
      }

      // Create a new user
      const newUser = await UserModel.create({ userId, displayName });

      // Create default collectibles for the new user
      const defaultCollectibles = [
        { type: 'comics', typeImg: 'http://photo.cl' },
        { type: 'figures', typeImg: 'http://photo.cl' },
        { type: 'games', typeImg: 'http://photo.cl' },
        { type: 'vinyls', typeImg: 'http://photo.cl' },
      ];

      for (const collectible of defaultCollectibles) {
        const result = await addCollectibleDefault(newUser.userId, collectible.type, collectible.typeImg);
        if (result.error) {
          console.error(`Failed to create default collectible for type ${collectible.type}: ${result.error}`);
        }
      }

      // Send response
      res.status(201).json({
        user: newUser,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

export default userController;
