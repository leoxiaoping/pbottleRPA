# Compression & Decompression

The new compression/decompression interface supports files larger than 4GB.

## Compress | zipDir

Compress folder contents into a zip file. Effective for versions >= v2025.0.

@param {string} directory folder path, absolute path

@param {string} zipFilePath zip file path


## Decompress | unZip

Extract zip file contents to a specified folder. Effective for versions >= v2025.0.

@param {string} zipFilePath zip file path

@param {string} directory folder path, absolute path. Default extracts to the zip file's current directory.
