import { v2 as cloudinary } from "cloudinary";
import { EnvConfig } from "../../Config/envConfig";

cloudinary.config({
  cloud_name: EnvConfig.CLOUDINARY_CLOUD_NAME,
  api_key: EnvConfig.CLOUDINARY_API_KEY,
  api_secret: EnvConfig.CLOUDINARY_API_SECRET,
  secure: true,
});

export default cloudinary;
