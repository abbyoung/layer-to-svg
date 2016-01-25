#target photoshop


function Layer(layer) {
	this.bounds		=	[parseInt(layer.bounds[0]), parseInt(layer.bounds[1]), parseInt(layer.bounds[2]), parseInt(layer.bounds[3])];
	this.name		=	(layer.name).replace(/\s+/g, "-").toLowerCase();
	this.height		=	this.bounds[3]-this.bounds[1];
	this.width		=	this.bounds[2]-this.bounds[0];
	this.fillColor	=	layer.textItem.color.rgb;
	this.top		=	this.bounds[1];
	this.left		=	this.bounds[0];
	this.artLayer	=	layer;
	};
	
Layer.prototype = {
	constructor: Layer,
	
	createTextWorkPath: function(){
		this.artLayer.textItem.createPath();
	},
	createCSS: function() {
		var cssText = "#" + this.name + " {\n" + "\tbackground: url('images/" +
			 this.name + ".svg') no-repeat;\n" + "\tbackground-size: " + this.width + 
			 "px " + this.height + "px;\n" + "\theight: " + this.height + "px;\n\twidth: " +
			 this.width + "px;\n" + "\ttop:  " + this.top + "px;\n" + "\tleft:  " + this.left + "px;\n}";
		
		return cssText;
		
	},
	saveCSS: function(cssText){
		var filePath = "~/Desktop/work/svg-me/";
		var f = new File(filePath+this.name+".css");

	    f.open('w');
	    f.write(cssText);
	    f.close();
		
	},
	exportFile: function(docRef, callback){
			
		var options = new ExportOptionsIllustrator();
		options.path = IllustratorPathType.ALLPATHS;
		
		var filePath = "~/Desktop/work/svg-me/";
		savedFile = new File(filePath + this.name + ".ai");
		docRef.exportDocument(File(savedFile), ExportType.ILLUSTRATORPATHS, options);
		
		callback(savedFile, this.fillColor);
		return savedFile;

	},
	openIllustrator: function(file, color){
		var targetApp = BridgeTalk.getSpecifier("illustrator-16");
		
		if (targetApp) {
			var bt = new BridgeTalk;
			var targetApp = BridgeTalk.getSpecifier("illustrator-16");
			bt.target = targetApp;
			bt.body = "var openOptions = new OpenOptions();"+
				"openOptions.convertCropAreaToArtboard = false;"+
				"openOptions.createArtboardWithArtworkBound = true;"+
				"openOptions.preserveLegacyArtboard = false;"+
				"app.open(new File('" + file + "'), DocumentColorSpace.RGB, openOptions);"+
				"var filePath = '~/Desktop/work/svg-me/';"+
				"var fileSpec = new File(filePath);"+
				"if (app.activeDocument.pathItems.length > 0) {"+
				"var newFill = new RGBColor();"+
				"newFill.red = "+color.red+";"+
				"newFill.green = "+color.green+";"+
				"newFill.blue = "+color.blue+";"+
				"for (var i=0; i < app.activeDocument.pathItems.length; i++)"+
				"{app.activeDocument.pathItems[i].filled = true;"+ 
				"app.activeDocument.pathItems[i].fillColor = newFill;}}"+
				"app.activeDocument.exportFile(fileSpec, ExportType.SVG);"
			
			bt.onResult = function(returnBtObj){}
			bt.onError = function(btObj) {
				var errorCode = parseInt(btObj.headers ["Error-Code"]);
 				alert(btObj.body);
			}
			bt.send([500]);
		}		
	}
}

	 
function getSelectedLayers(callback){
	var idGrp = stringIDToTypeID( "groupLayersEvent" );
	var descGrp = new ActionDescriptor();
	var refGrp = new ActionReference();
	refGrp.putEnumerated(charIDToTypeID( "Lyr " ),charIDToTypeID( "Ordn" ),charIDToTypeID( "Trgt" ));
	descGrp.putReference(charIDToTypeID( "null" ), refGrp );
	executeAction( idGrp, descGrp, DialogModes.ALL );
	var resultLayers=new Array();
	for (var ix=0;ix<app.activeDocument.activeLayer.layers.length;ix++){resultLayers.push(app.activeDocument.activeLayer.artLayers[ix])}
	    var id8 = charIDToTypeID( "slct" );
	    var desc5 = new ActionDescriptor();
	    var id9 = charIDToTypeID( "null" );
	    var ref2 = new ActionReference();
	    var id10 = charIDToTypeID( "HstS" );
	    var id11 = charIDToTypeID( "Ordn" );
	    var id12 = charIDToTypeID( "Prvs" );
	    ref2.putEnumerated( id10, id11, id12 );
	desc5.putReference( id9, ref2 );
	executeAction( id8, desc5, DialogModes.NO );
	
	layers = resultLayers;
	
	callback(layers);
	return layers;
};
    
function createLayerObj(layers){
	var docRef = app.activeDocument;
	
	for (var i=0; i < layers.length; i++) {
		layer = new Layer(layers[i]);
		layer.createTextWorkPath();
		layer.saveCSS(layer.createCSS());
		layer.exportFile(docRef, layer.openIllustrator);	
	}
};


(function init(){

	getSelectedLayers(createLayerObj);	
})();


// TODO: Add error handling

