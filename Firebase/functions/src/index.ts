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
      /* 
      https://api.unsplash.com/search/photos?
      client_id=6fa91622109e859b1c40218a5dead99f7262cf4f698b1e2cb89dd18fc5824d15&
      query=girls&
      per_page=1&
      orientation=portrait
      */
      url: "https://api.unsplash.com/search/photos?",
      qs: {
        client_id:
          "6fa91622109e859b1c40218a5dead99f7262cf4f698b1e2cb89dd18fc5824d15",
        query: "girls",
        per_page: 1,
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
              // if (!docSnapshot.exists) {
              // const image =
              await db
                .collection("Abstracts")
                .doc(results["results"][i]["id"])
                .set({
                  width: results["results"][i]["width"],
                  height: results["results"][i]["height"],
                  color: results["results"][i]["color"],
                  description: results["results"][i]["description"],
                  alt_description: results["results"][i]["alt_description"],
                  raw_url: results["results"][i]["urls"]["raw"],
                  full_url: results["results"][i]["urls"]["full"],
                  regular_url: results["results"][i]["urls"]["regular"],
                  small_url: results["results"][i]["urls"]["small"],
                  thumb_url: results["results"][i]["urls"]["thumb"],
                  self_link: results["results"][i]["links"]["self"],
                  html_links: results["results"][i]["links"]["html"],
                  download_links: results["results"][i]["links"]["download"],
                  download_links_location:
                    results["results"][i]["links"]["download_location"],
                  categories: results["results"][i]["categories"],
                  likes: results["results"][i]["likes"],
                  liked_by_user: results["results"][i]["liked_by_user"],
                  current_user_collections:
                    results["results"][i]["current_user_collections"],
                  user_id: results["results"][i]["user"]["id"],
                  user_username: results["results"][i]["user"]["username"],
                  user_name: results["results"][i]["user"]["name"],
                  user_firstName: results["results"][i]["user"]["first_name"],
                  user_lastName: results["results"][i]["user"]["last_name"],
                  user_twitterUsername:
                    results["results"][i]["user"]["twitter_username"],
                  user_portfolioUrl:
                    results["results"][i]["user"]["portfolio_url"],
                  user_bio: results["results"][i]["user"]["bio"],
                  user_location: results["results"][i]["user"]["location"],
                  user_link_self:
                    results["results"][i]["user"]["links"]["self"],
                  user_link_html:
                    results["results"][i]["user"]["links"]["html"],
                  user_link_photos:
                    results["results"][i]["user"]["links"]["photos"],
                  user_link_likes:
                    results["results"][i]["user"]["links"]["likes"],
                  user_link_portfolio:
                    results["results"][i]["user"]["links"]["portfolio"],
                  user_link_following:
                    results["results"][i]["user"]["links"]["following"],
                  user_link_followers:
                    results["results"][i]["user"]["links"]["followers"],
                  user_profileImage_small:
                    results["results"][i]["user"]["profile_image"]["small"],
                  user_profileImage_medium:
                    results["results"][i]["user"]["profile_image"]["medium"],
                  user_profileImage_large:
                    results["results"][i]["user"]["profile_image"]["large"],
                  user_instagramUsername:
                    results["results"][i]["user"]["instagram_username"],
                  user_totalCollections:
                    results["results"][i]["user"]["total_collections"],
                  user_totalLikes: results["results"][i]["user"]["total_likes"],
                  user_totalPhotos:
                    results["results"][i]["user"]["total_photos"],
                  user_acceptedTos:
                    results["results"][i]["user"]["accepted_tos"],
                  tags: results["results"][i]["tags"]
                });
              // images.push(image);
              // }

              // Saving the image to the cloud storage
              // File or Blob named mountains.jpg
              // var file = File('https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjk4MjkzfQ')

              // // Create the file metadata
              // var metadata = {
              //   contentType: 'image/jpeg'
              // };

              // // Upload file and metadata to the object 'images/mountains.jpg'
              // var uploadTask = storageRef.child('images/' + file.name).put(file, metadata);

              // // Listen for state changes, errors, and completion of the upload.
              // uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
              //   function(snapshot) {
              //     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              //     var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              //     console.log('Upload is ' + progress + '% done');
              //     switch (snapshot.state) {
              //       case firebase.storage.TaskState.PAUSED: // or 'paused'
              //         console.log('Upload is paused');
              //         break;
              //       case firebase.storage.TaskState.RUNNING: // or 'running'
              //         console.log('Upload is running');
              //         break;
              //     }
              //   }, function(error) {

              //   // A full list of error codes is available at
              //   // https://firebase.google.com/docs/storage/web/handle-errors
              //   switch (error.code) {
              //     case 'storage/unauthorized':
              //       // User doesn't have permission to access the object
              //       break;

              //     case 'storage/canceled':
              //       // User canceled the upload
              //       break;

              //     ...

              //     case 'storage/unknown':
              //       // Unknown error occurred, inspect error.serverResponse
              //       break;
              //   }
              // }, function() {
              //   // Upload completed successfully, now we can get the download URL
              //   uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
              //     console.log('File available at', downloadURL);
              //   });
              // });

              // End of Google Cloud Storage
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
