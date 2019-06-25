//const exiftool = window.require('node-exiftool')
//const exiftoolBin = window.require('dist-exiftool')

import { ExiftoolProcess } from "node-exiftool";
import { exiftoolBin } from "dist-exiftool";
import { readdirSync } from "fs";

export function CopyMetadata(from, to) {
    from = String(from);
    to = String(to);
    
    var srcFolder, destFolder;

    try {
        srcFolder = readdirSync(from);
        destFolder = readdirSync(to);
    } catch (err) {
        console.log(err);
    }

    var intersection = srcFolder.filter(v => destFolder.includes(v));
    
    console.log('intersection : ' + intersection);

    intersection.forEach( filename => {
        var ep = new ExiftoolProcess(exiftoolBin);
        var metadata = {};
        ep.open()
            .then(() => ep.readMetadata(from + '/' + filename, ['GPSLatitude -n', 'GPSLongitude -n', 'DateTimeOriginal']))
            .then((result, error) => {
                if (result != undefined) {
                    if (result.data.length > 0) {
                        console.log(result.data[0]);
                        Object.keys(result.data[0]).forEach(key => {
                            if (key !== 'SourceFile') {
                                metadata[key] = result.data[0][key]
                            }
                        })
                    }
                }
                if (error != undefined) {
                    console.log(error);
                }
            
            })
            .then(() => ep.writeMetadata(to + '/' + filename, metadata, ['overwrite_original']))
            .then(console.log, console.error)
            .then(() => ep.close())
            .then(() => console.log('Closed exiftool'))
            .catch(console.error)
    });
}