import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.CLOUD_APIKEY,
  api_secret: process.env.CLOUD_SECRETKEY,
});

export const uploadToCloudinary = async (fileBuffer: Buffer): Promise<{ link: string; publicID: string }> => {
  try {
    const result = await new Promise<{ secure_url: string; public_id: string }>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "linksnest/profiles" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result as { secure_url: string; public_id: string });
        }
      );
      uploadStream.end(fileBuffer);
    });

    return {
      link: result.secure_url,
      publicID: result.public_id,
    };
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw new Error("Failed to upload image to Cloudinary");
  }
};

export const deleteImage = async (publicId:string) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    console.log("Deleted:", result);
    return result
  } catch (error) {
    console.error("Error deleting image:", error);
  }
};

