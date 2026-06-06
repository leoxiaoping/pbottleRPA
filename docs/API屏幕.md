# Screen

## getResolution | Get Screen Resolution

Get the current screen resolution, ratio is the desktop scaling ratio.

@returns JSON format `{ w:1920,h:1080,ratio:1.5 }`

## screenShot | Screenshot

@param {*} savePath default save path: My Pictures, format is PNG; if using a custom path, end with '.png'

@param {*} x screenshot start X

@param {*} y

@param {*} w screenshot width

@param {*} h screenshot height


## getScreenColor | Get Screen Color

Get the color of a pixel on the screen.

@param {*} x

@param {*} y

@returns color value

## findScreen | Find Image

Search for an image on the screen and locate it.

@param {string} tpPath the small image to search for, PNG format recommended, relative path

@param {number} miniSimilarity optional, minimum similarity threshold, default 0.9. Range 0-1, 1 = exact match.

@param {number} fromX=0 optional, search start X coordinate

@param {number} fromY=0 optional, search start Y coordinate

@param {number} width=-1 optional, search width

@param {number} height=-1 optional, search height

@returns found result in JSON format: `{x,y}`

## waitImage | Wait for Image

Wait for an image to appear on screen.

@param {string} tpPath template image path, relative path: ./image/123.png

@param {Function} intervalFun operation to run between checks, function format

@param {number} timeOut wait timeout in seconds

@returns {position|boolean} position info in JSON format: `{x,y}`

#### Debug

If waiting for an image times out, pbottleRPA will immediately take a full-screen screenshot and save it to `Computer -> My Pictures` for subsequent investigation.


## findContours | Find Contours

@param {number} minimumArea minimum contour area, default filters out elements below 10x10

@param {number} fromX start coordinate

@param {number} fromY

@param {number} width search range

@param {number} height

@returns {array} all found contour info, including start coordinate, center coordinate, area, id of each closed region. Format: `[{ x: 250, y: 10, cx: 265.5, cy: 30.5, area: 2401, id: 42 },...]`

Find objects or window contours on screen.

## imgSimilar | Image Similarity Comparison

Image similarity comparison. Requires pbottle RPA client version > V2025.3.
  
@param {string} path1  path to image 1

@param {string} path2  path to image 2

@param 'SIFT' | 'ORB' | 'SSIM' checkType comparison algorithm, default 'ORB'

@returns {score:number, time:number}  score similarity score 0-1; time elapsed seconds

#### Debug

A debug/findContours.png file will be generated in the software home directory.
