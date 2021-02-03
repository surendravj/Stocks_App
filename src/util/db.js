import firebase from "firebase";

export const saveUser = async (uid, name, mobile) => {
  try {
    var db = await firebase.firestore().collection("fund_users");
    await db.doc(uid).set({
      name: name,
      mobile: mobile,
    });
    return true;
  } catch (error) {
    if (error) {
      return false;
    }
  }
};

export const isAuthenticated = () => {
    if (localStorage.getItem("user")) {
      return JSON.parse(localStorage.getItem("user"));
    }
    return false;
};
