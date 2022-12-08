import sharp from "sharp";
import path from "path";

const imgPromise = (dir, file,image) => {
    Promise.all([
        sharp(file.buffer)
            .rotate()
            .jpeg({mozjpeg: true})
            .resize(1024)
            .toFile(path.join(__dirname, dir, image + '_full.jpg'))
    ]);
}


export default imgPromise
