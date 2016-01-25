SVG Me
======
**SVG Me** is a Photoshop script to simplify the PSD-to-SVG process using Adobe Photoshop and Illustrator. Created with front-end development in mind, the script converts and saves selected text layers to SVG and exports relevant CSS to a file.

Developed for CS6 Version 16.


## Installation
To use SVG ME, you'll need to place the script in Photoshop's Scripts folder, located at ```/Applications/Adobe\ Photoshop\ CS6/Presets/Scripts```

- Save the script [SVG ME.jsx](https://github.com/abbyoung/svg-me/blob/master/SVG%20Me.jsx) to your Desktop.

- Open in your favorite text editor...
```
	$ coda ~/Desktop/SVG\ Me.jsx
```
...and edit the path variables to your preferred destination for saving.

- CSS destination:
```
	saveCSS: function(cssText){
		var filePath = "~/Desktop/work/svg-me/"
```
- AI destination:
```
	exportFile: function(docRef, callback){
		...
		var filePath = "~/Desktop/work/ps-to-svg/";
```
- SVG destination:
	```
	openIllustrator: function(file, color){
		...
		"var filePath = '~/Desktop/work/svg-me'"+
	
	```
		
- Move the file into Photoshop's Scripts folder. On the command line, enter:

	```
	$ mv ~/Desktop/SVG\ Me.jsx /Applications/Adobe\ Photoshop\ CS6/Presets/Scripts/
	```
- Close and reopen Photoshop if it's already open. The script should now appear under **File > Scripts > SVG Me**

## Usage
- Select desired Photoshop layer(s) in the Layers palette

- Run the script under **File > Scripts > SVG Me**. **Make it better**: Set up a keyboard shortcut under **Edit > Keyboard Shortcuts > File > Scripts > SVG Me**.

- The script creates and saves CSS and AI files, then Illustrator opens the AI file and shows an options dialog. Check relevant boxes and click OK. The magic happens in the background.

![Illustrator Dialog](https://github.com/abbyoung/svg-me/blob/master/illustrator-dialog.jpg)**Note**: Sometimes AI lags at the dialog box. Working on fixing this 🔨🐱

- YOU'RE DONE. Your shiny new SVGs, CSS files, and backup AI files will show up in your destination folder(s).

## License 
See [MIT License](https://github.com/abbyoung/svg-me/blob/master/LICENSE.md) file

## Contact
#### Developer
- [abigailyoung.com](http://abigailyoung.com)
- [@girldevilpit](https://twitter.com/girldevilpit "girldevilpit on twitter")
