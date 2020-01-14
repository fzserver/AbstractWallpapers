import * as functions from "firebase-functions";
import * as rp from "request-promise";
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();
const sett = { timestampsInSnapshots: true };
db.settings(sett);

export const UnsplashPhotosSearch = functions.https.onRequest(
  (request, response) => {
    const options = {
      headers: {
        "User-Agent": "Request-Promise"
      },
      url: "https://api.unsplash.com/search/photos?",
      qs: {
        client_id:
          "6fa91622109e859b1c40218a5dead99f7262cf4f698b1e2cb89dd18fc5824d15",
        query: "abstract",
        per_page: 10,
        orientation: "portrait"
      },
      // method: "GET",
      json: true // Automatically parses the JSON string in the response
    };

    rp(options)
      .then(async results => {
        // console.log("Photos => %d", results["results"].length);

        // FireStore Settings
        // const images = [];
        for (let i = 0; i <= results["results"].length - 1; i++) {
          await db
            .collection("Abstracts")
            .doc(results["results"][i]["id"])
            .get()
            .then(async docSnapshot => {
              if (!docSnapshot.exists) {
                // const image =
                await db
                  .collection("Abstracts")
                  .doc(results["results"][i]["id"])
                  .set({
                    color: results["results"][i]["color"],
                    width: results["results"][i]["width"]
                  });
                // images.push(image);
              }
            });
        }
        // return Promise.all(images);
      })
      .then(() => {
        response.send(
          "<html><head><title>Installing Images</title><style>body{background-color: #000; color: #FFF; font-size: 20px;}</style></head><body>" +
            "<b> All Images Installed successfully" +
            // results["results"][i]["id"] +
            "</b><br />" +
            "</body></html>"
        );
      })
      .catch(error => {
        response.send(error);
      });
    // response.send(rp(options));
  }
);
