# Texture Extractor([Demo][web-app])

[Texture Extractor][web-app] allows you to cut fragments of an image and map them into perfect rectangles.

![gh-img]
*Each colored area on the right will be mapped into a rectangle. The result for currently selected area (higher purple one) shown on the left. The lines that on original image are skewed are perfectly horizontal on the result image.*


With Texture Extractor you can select any area of an image and it will be converted into rectangle. The selected area can have any shape. You can extract many parts of an image at the same time using multiple selections. The result images can then be downloaded.

Some of you may know [Texture Ripper][texture-ripper]. While my app does not revert perspective projection, it also does not require Adobe Air. My app is also open source and works in a browser.



# Privacy

**If you are using adblocker, no data will be collected either way. This also applies to crashlogs.**

This app works only in your browser, your images **are not send anywhere**. The app does not collect neither image data or even filenames. Collected analytics:

- [Basic visit data](https://support.google.com/analytics/answer/6004245?ref_topic=2919631).
- Width, height of input image. I use it to check if it's worth improving performance for bigger pictures.
- Width, height of downloaded image and how many selected areas it is composed of. This is the main feature of the app so it is nice to know how it is used.
- How the user selected image. Drag and drop, file picker or predefined example.
- Which example image is the most popular. It took me ridiculous amount of time to find something interesting to showcase this app.



## Building locally

1. Clone the repo
1. `yarn install` <- uses [Yarn 2][yarn-2]
2. `yarn start` <- dev server
3. go to [localhost:8080](http://localhost:8080)

Alternatively, `yarn build` for production build, outputs will be in `build` folder.


## Licence

MIT, except [src/utils/decodeImage.ts][src/utils/decodeImage.ts].


## 3rd party attributions

* [unsplash.com][unsplash], used images:
  * [https://unsplash.com/photos/mnwKi9TVl8w](https://unsplash.com/photos/mnwKi9TVl8w)
  * [https://unsplash.com/photos/3SVr-CfTYDU](https://unsplash.com/photos/3SVr-CfTYDU)
  * [https://unsplash.com/photos/ffFnddUEaL4](https://unsplash.com/photos/ffFnddUEaL4)
* [squoosh][https://github.com/GoogleChromeLabs/squoosh]

[web-app]: https://scthe.github.io/texture-extractor/index.html
[gh-img]: src/example-images/github-showcase.jpg
[unsplash]: https://unsplash.com/
[yarn-2]: https://yarnpkg.com/getting-started/install
[texture-ripper]: http://renderhjs.net/shoebox/textureRipper.htm

