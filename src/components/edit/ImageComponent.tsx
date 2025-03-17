import { useState, useEffect } from "react";
import Image from "next/image";
import usePOST from "@/hooks/usePOST";
import toast from "react-hot-toast";

export default function ImageComponent({ imagelink }) {
  const [image, setImage] = useState(imagelink.image?.link || "/profile.png");
  const { isError, isLoading, data, fetchPOST } = usePOST();

  useEffect(() => {
    if (data) {
      setImage(data.response.link);
      toast.success(data?.message || "Image updated successfully!");
    }

    if (isError) {
      toast.error(isError.message);
    }
  }, [isError, data]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!imagelink) {
      toast.error("Image data is missing!");
      return;
    }

    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("user", imagelink.userID);
    formData.append("nest", imagelink.nestID);

    await fetchPOST("/uploadImage", formData)
      .then(() => {
        if (data) {
          setImage(data.response.link);
          toast.success(data?.message || "Image updated successfully!");
        }
      })
      .catch(() => {
        if (isError) {
          toast.error(isError.message);
        }
      });
    return;
  };
  return (
    <>
      {isLoading ? (
        <div>
          <p>uploading image</p>
        </div>
      ) : (
        <div>
          <input
            type="file"
            accept="image/*"
            id="imageUpload"
            className="hidden"
            onChange={handleFileChange}
          />
          <Image
            src={image}
            width={500}
            height={500}
            alt="User image"
            onClick={() => document.getElementById("imageUpload")?.click()}
          />
        </div>
      )}
    </>
  );
}
