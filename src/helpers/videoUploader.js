import uploader from "../config/cloudinary.js";

const videoUploader = async (req) => {
  try {
    const tmp = req.files.video.tempFilePath;
    const Result = await uploader.upload(
      tmp,
      { folder: "Heal-the-world", resource_type: "video" },
      (_, result) => result
    );
    return Result;
  } catch (error) {
    console.log(error);
  }
};

export default videoUploader;
