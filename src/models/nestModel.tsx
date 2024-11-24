import mongoose, { Schema, Document, Model } from "mongoose";

interface INest extends Document {
  nestID: string;
  userID: string;
  nestName: string;
  nestDescription: string;
  image: {
    link: string;
    publicID: string;
  };
  links: [
    {
      platform: string;
      url: string;
      icon: string;
    }
  ];
}

const nestSchema = new Schema<INest>(
  {
    nestID: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 500,
    },
    userID: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    nestName: {
      type: String,
      required: false,
      trim: true,
      minlength: 4,
      maxlength: 30,
    },
    nestDescription: {
      type: String,
      required: false,
      trim: true,
      minlength: 3,
    },
    image:
      {
        link: {
          type: String,
          required: false,
        },
        publicID: {
          type: String,
          required: false,
        },
      },
    links: [
      {
        platform: {
          type: String,
        },
        url: {
          type: String,
        },
        icon: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

const Nest: Model<INest> = mongoose.models.Nest || mongoose.model<INest>("Nest", nestSchema);


export default Nest;
