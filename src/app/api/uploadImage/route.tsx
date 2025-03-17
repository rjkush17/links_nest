import { NextResponse } from "next/server";
import connectDB from "@/lib/database";
import Nest from "@/models/nestModel";
import { auth } from "@/auth";
import { uploadToCloudinary, deleteImage } from "@/utils/uploadToCloudinary";

export async function POST(req: Request) {
  try {
    await connectDB();
    const session = await auth();
    const formData = await req.formData();
    const file: FormDataEntryValue | null = formData.get("file");
    const userID: FormDataEntryValue | null = formData.get("user");
    const nestID: FormDataEntryValue | null = formData.get("nest");

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!file || !nestID || !userID) {
      return NextResponse.json(
        { message: "Require data not found" },
        { status: 400 },
      );
    }

    const isSameUser = String(userID) === String(session?.user?.userID);

    if (!isSameUser) {
      return NextResponse.json(
        { message: "user ID not match with current User" },
        { status: 400 },
      );
    }

    const nest = await Nest.findOne({ nestID: nestID });
    if (!nest) {
      return NextResponse.json(
        { message: "Nest ID not found" },
        { status: 400 },
      );
    }

    if (!(file instanceof File)) {
      return NextResponse.json(
        { message: "Invalid file format" },
        { status: 400 },
      );
    }

    if (nest.image?.link) {
      const isImageDeleted = await deleteImage(nest.image.publicID);
      if (isImageDeleted) {
        NextResponse.json({ message: "fail to delete current profile" });
      }
    }

    const fileBuffer: Buffer = Buffer.from(await file.arrayBuffer());
    const imageURL = await uploadToCloudinary(fileBuffer);

    nest.image = imageURL;
    await nest.save();

    return NextResponse.json({ message: "image uploaded", response: imageURL });
  } catch (error) {
    console.log("error message ---", error);
    return NextResponse.json(
      { message: "Internal Server error", error: (error as Error).message },
      { status: 500 },
    );
  }
}
