//const exiftool = window.require('node-exiftool')
//const exiftoolBin = window.require('dist-exiftool')

import { ExiftoolProcess } from "node-exiftool";
import { exiftoolBin } from "dist-exiftool";

export function CopyMetadata(from, to) {
    console.log('from :' + from);
    console.log('to :' + to);
    
    var ep = new ExiftoolProcess(exiftoolBin)
    ep.open()
        .then((pid) => console.log('Started exiftool process %s', pid))
        .then(() => ep.readMetadata(from + '/pierre.jpg', ['GPSLatitude', 'GPSLongitude', 'DateTimeOriginal']))
        .then((result, error) => {
            if (result != undefined) {
                console.log(result.data);
                console.log(result.data.length);
                if (result.data.length > 0) {
                    console.log(result.data[0]);
                    console.log(Object.keys(result.data[0]));
                }
            }
            if (error != undefined) {
                console.log(error);
            }
        })
        .then(() => ep.readMetadata(to + '/pierre.jpg', ['-File:all']))
        .then(console.log, console.error)
        .then(() => ep.close())
        .then(() => console.log('Closed exiftool'))
        .catch(console.error)
}