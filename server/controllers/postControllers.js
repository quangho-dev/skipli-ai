import firebase from "../firebase.js";
import {
  generateCaptionsFromIdeasByAI,
  generatePostCaptionsByAI,
  getPostIdeasByAI,
} from "../geminiAI.js";

import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDocs,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";

const db = getFirestore(firebase);

export const generatePostCaptions = async (req, res) => {
  try {
    const { socialNetwork, subject, tone } = req.body;

    if (!socialNetwork) {
      return res.status(400).send("Social network is required");
    }

    if (!subject) {
      return res.status(400).send("Subject is required");
    }

    if (!tone) {
      return res.status(400).send("Tone is required");
    }

    const result = await generatePostCaptionsByAI(socialNetwork, subject, tone);

    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getPostIdeas = async (req, res) => {
  try {
    const { topic } = req.body;

    if (!topic) {
      return res.status(400).send("Topic is required");
    }

    const result = await getPostIdeasByAI(topic);

    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const createCaptionsFromIdeas = async (req, res) => {
  try {
    const { idea } = req.body;

    if (!idea) {
      return res.status(400).send("Idea is required");
    }

    const result = await generateCaptionsFromIdeasByAI(idea);

    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const saveGeneratedContent = async (req, res) => {
  try {
    const { topic, data, phoneNumber } = req.body;

    if (!topic) {
      return res.status(400).send("Topic is required");
    }

    if (!data) {
      return res.status(400).send("Data is required");
    }

    if (!phoneNumber) {
      return res.status(400).send("Phone number is required");
    }

    const docRef = await addDoc(collection(db, "savedPosts"), {
      topic: topic.toLowerCase().trim(),
      data,
      phoneNumber,
    });

    res.status(200).json({
      success: true,
      savedPost: { id: docRef.id, topic, data, phoneNumber },
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getUserGeneratedContents = async (req, res) => {
  try {
    const { phoneNumber } = req.params;

    if (!phoneNumber) {
      return res.status(400).send("Phone number is required");
    }

    const q = query(
      collection(db, "savedPosts"),
      where("phoneNumber", "==", phoneNumber)
    );

    const result = [];

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      result.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json({
      success: true,
      contents: result,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const unsaveContent = async (req, res) => {
  try {
    const { captionId } = req.params;

    if (!captionId) {
      return res.status(400).send("Caption Id is required");
    }

    await deleteDoc(doc(db, "savedPosts", captionId));

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
