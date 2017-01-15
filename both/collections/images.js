var profileImagesStore = new FS.Store.GridFS("profileImagesStore");

ProfileImages = new FS.Collection("profileImages", {
  stores: [profileImagesStore]
});
