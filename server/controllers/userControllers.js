import firebase from "../firebase.js";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { sendSMSMessage } from "../sms.js";

const db = getFirestore(firebase);

export const createNewAccessCode = async (req, res) => {
  try {
    const phoneNumber = req.body.phoneNumber;
    const random6DigitNumber = generateRandom6DigitNumber();

    await setDoc(doc(db, "users", phoneNumber), {
      accessCode: random6DigitNumber,
    });

    const smsMessage = `Your access code is ${random6DigitNumber}`;

    sendSMSMessage(smsMessage, phoneNumber);

    res.status(200).json({
      message: "Created access code for the provided phone number successfully",
      accessCode: random6DigitNumber,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const generateRandom6DigitNumber = () =>
  Math.floor(100000 + Math.random() * 900000);

export const validateAccessCode = async (req, res) => {
  try {
    const { phoneNumber, accessCode } = req.body;

    let isAccessCodeValid = false;

    const docRef = doc(db, "users", phoneNumber);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const accessCodeInDB = docSnap.data().accessCode;

      isAccessCodeValid = accessCode === accessCodeInDB;

      await setDoc(doc(db, "users", phoneNumber), {
        accessCode: "",
      });
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }

    res.status(200).json({
      success: isAccessCodeValid,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
