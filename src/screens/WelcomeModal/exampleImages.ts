// ARCHITECTURE
import exampleArch from "../../example-images/mak-mnwKi9TVl8w-unsplash.jpg"
// FASHION
// import exampleFashion from "../../example-images/alex-shaw-rmQSXNcM80Y-unsplash.jpg";
// import exampleFashion from "../../example-images/nerf-portraits-q4DJVtxES0w-unsplash.jpg";
import exampleFashion from "../../example-images/yiranding-rQti4ZKWJQk-unsplash.jpg";
// INDOOR
import exampleCG from "../../example-images/victor-malyushev-I5j-_BlOy48-unsplash.jpg";

// TODO add thumb images here
export interface ExampleImage {
  name: string;
  url: string;
  thumbUrl: string;
  tooltip: string;
}

export const EXAMPLE_IMAGES: ExampleImage[] = [
  {
    name: "Architecture",
    url: exampleArch,
    thumbUrl: exampleArch,
    tooltip: "Extract perspective-corrected architectural details",
  },
  {
    name: "Clothes",
    url: exampleFashion,
    thumbUrl: exampleFashion,
    tooltip: "Get pattern details, not matter distortions or shape",
  },
  {
    name: "3d modeling",
    url: exampleCG,
    thumbUrl: exampleCG,
    tooltip: "Cut fragments of images to use in your own work",
  },
];
