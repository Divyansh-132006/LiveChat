import mongoose from 'mongoose';
import User from '../models/user.model.js';
import Message from '../models/message.model.js';
import cloudinary from '../lib/cloudinary.js';

export const getUserForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } })
            .select('-password');

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error fetching users for sidebar:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getMessage = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;

        // Debug logs
        console.log("userToChatId from params:", userToChatId);
        console.log("myId from req.user:", myId);
        console.log("Full req.params:", req.params);
        console.log("Full req.url:", req.url);

        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(userToChatId)) {
            console.log("Invalid userToChatId format:", userToChatId);
            return res.status(400).json({ message: "Invalid user ID format" });
        }

        if (!mongoose.Types.ObjectId.isValid(myId)) {
            console.log("Invalid myId format:", myId);
            return res.status(400).json({ message: "Invalid sender ID format" });
        }

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId }
            ]
        }).sort({ createdAt: 1 });

        res.status(200).json(messages);
        
    } catch (error) {
        console.log("Error fetching messages:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        // Debug logs
        console.log("receiverId from params:", receiverId);
        console.log("senderId from req.user:", senderId);

        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(receiverId)) {
            return res.status(400).json({ message: "Invalid receiver ID format" });
        }
        
        let imageUrl;
        if (image) {
            // Upload image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });

        await newMessage.save();

        // TODO: Add real-time functionality with socket.io
        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error sending message:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}