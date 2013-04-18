function replaceLibItems(folderPath){
	var folders = FLfile.listFolder(folderPath,"Directories");
	var files = FLfile.listFolder(folderPath,"files");
	if(folders.length){
		var folderLength = folders.length;
		var currentFolder;
		for(var i=0;i<folders.length;i++){
			currentFolder = folders[i];
			replaceLibItems(folderPath+"/"+currentFolder);
		}
	}
	/* 如果导入的文件夹的查看方式是缩略图的话 会在当前目录生成Thumbs.db文件 来保存缩略图信息 需要过滤掉 */
	if(files.length){
		//var relativeDirReg = new RegExp("\/"+rootDir+"\/");
		var relativeDir = folderPath.replace(rootDir,"");
		var folderLv = relativeDir.split("/");
		if(folderLv.length>1){
			folderLv.shift();
		}
		relativeDir = folderLv.join("/");
		fl.trace("[LIBRARY]"+relativeDir);
		for(var i=0;i<files.length;i++){
			if(files[i].split(".")[1]!="db"){
				library.deleteItem(files[i]);
				currentDocument.importFile(folderPath+"/"+files[i],true);
				library.moveToFolder(relativeDir,files[i],true);
				counter++;
			}
		}
	}
}

var rootDir = fl.browseForFolderURL("选择资源所在的根目录");
var currentDocument = fl.getDocumentDOM();
var library;
var counter = 0;
if(currentDocument){
	library = currentDocument.library;
}

if(rootDir){
	fl.outputPanel.clear();
	fl.trace(rootDir);
	replaceLibItems(rootDir);
	fl.trace("共导入文件"+counter+"个");
}