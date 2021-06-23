// ARCHITECTURE
import exampleArch from "../../example-images/john-towner-UO02gAW3c0c-unsplash.jpg";
// import exampleArch from "../../example-images/mak-mnwKi9TVl8w-unsplash.jpg"
// FASHION
import exampleFashion from "../../example-images/alex-shaw-rmQSXNcM80Y-unsplash.jpg";
// import exampleFashion from "../../example-images/nerf-portraits-q4DJVtxES0w-unsplash.jpg";
// import exampleFashion from "../../example-images/yiranding-rQti4ZKWJQk-unsplash.jpg";
// INDOOR
import exampleCG from "../../example-images/victor-malyushev-I5j-_BlOy48-unsplash.jpg";

// TODO add thumb images here
export interface ExampleImage {
  name: string;
  url: string;
  thumbUrl: string;
}

export const EXAMPLE_IMAGES: ExampleImage[] = [
  {
    name: "Architecture",
    url: exampleArch,
    thumbUrl: exampleArch,
  },
  {
    name: "Clothes",
    url: exampleFashion,
    thumbUrl: exampleFashion,
  },
  {
    name: "3d modeling",
    url: exampleCG,
    thumbUrl: exampleCG,
  },
];
