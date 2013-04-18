var dom= fl.getDocumentDOM();
var lib = dom.library;
var items = lib.items;
var saveDir;
var counter = 0;
var dialog = dom.xmlPanel(fl.configURI+"Commands/GiantOS/select.xml");
/* 遍历一个对象的属性 并打印到输出面板 */
function enumProp(obj){
	fl.outputPanel.clear();
	for(var prop in obj){
		fl.trace("property:"+prop+"  value:"+obj[prop]);
	}
}
/* 获取对象的具体名字 移除文件夹的名字 */
function getItemName(item){
	var name = item.name;
	var level = name.split("/");
	name = level[level.length-1];
	level.pop();
	var obj = {
		name:name,
		path:level.join("/")
	}
	return obj;
}
/* 选择保存的目录 */
function selectSaveDir(){
	return fl.browseForFolderURL("选择导出资源存放的目录");
}
/* 导出图片到指定的目录 */
function exportItem(item){
	var itemInfo = getItemName(item);
	var targetDir = saveDir+"/"+itemInfo.path;
	if(!FLfile.exists(targetDir)){
		FLfile.createFolder(targetDir);
	}
	if(item.itemType=="bitmap"){
		item.exportToFile(saveDir+"/"+item.name);
	}else if(item.itemType == "movie clip"){
		item.exportSWF(saveDir+"/"+item.name+".swf");
	}
	
}

if(dialog.dismiss == "accept"){
	fl.outputPanel.clear();
	saveDir = selectSaveDir();
	if(saveDir){
		var itemLength = items.length;
		var item;
		for(var i=0;i<itemLength;i++){
			item = items[i];
			if(item.itemType == dialog.type){
				counter++;
				exportItem(item);
			}
		}
		fl.trace("资源导出完毕 总共"+counter+"项");
		fl.trace("存放目录:"+FLfile.uriToPlatformPath(saveDir));
	}
}