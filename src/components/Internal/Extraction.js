import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import "firebase/auth";

// Based on link, get the publicKey
export const getPublicKey = () => {
  var keyWord = "publicKey=";
  if (window.location.href.includes(keyWord)) {
    console.log("Public Key is provided");
    var link_without_info_length = window.location.href.indexOf(keyWord); // 38

    var publicKey = window.location.href.substr(
      link_without_info_length + keyWord.length
    );
    console.log(publicKey);
    return publicKey;
  }
  return null;
};
