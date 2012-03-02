/*
chrome.extension.onConnect.addListener(function(port) {
  port.onMessage.addListener(function(msg) {
    port.postMessage({counter: msg.counter+1});
  });
});

chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
    sendResponse({counter: request.counter+1});
  });
*/

/*
function tabHand(tab)
{
	alert(tab.id);
}

// imagens
var img;
var bigImg = {"width":0,"height":0,"src":null,"ob":null};
var images = document.getElementsByTagName("img");
var autor = "";
for( var i=0;i<images.length; i++)
{
	img = images[i];
	if (img.width>bigImg.width && img.height>bigImg.height)
	{
		bigImg.src = img.src;
		bigImg.ob = $(img);
	}
}

if (bigImg.src != null)
{
	var div = $(document.createElement('div'));
	div.css({
		"border":"1px solid red",
		"position":"absolute",
		"z-index":400,
		"left":bigImg.ob.offset().left,
		"top":bigImg.ob.offset().top,
		"width":bigImg.ob.width(),
		"height":bigImg.ob.height(),
		"background-color":"rgba(255,255,255,0.6)",
		"overflow-x":"hidden",
		"overflow-y":"auto"
		});
		
	var json = "{\n"+
		'"author":"' + autor + "\",\n" +
		'"url":"' + bigImg.src + "\",\n" +
		'"link":"' + window.location + "\",\n" +
		'"thumb":"<img src=\'' + __screenShot + '\' width=\'128\' />",' + "\n" +
		"},\n \n";
	div.html( '<img src="'+__screenShot+'" width="128" alt="" /><br/>' +
		'{<br/>'+
		'"author":"' + autor + '",<br/>' +
		'"url":"' + bigImg.src + '",<br/>' +
		'"link":"' + window.location + '",<br/>' +
		'"thumb":"<img src=\'' + __screenShot + '\' width=\'128\' />",<br/>' +
		'},'
	);
	
	$.ajax({
		type: 'POST',
		url: 'http://localhost/?save',
		data: json,
		success: null,
		dataType: "text"
		});
	$(document.body).append(div);
	
}
*/

//var port = chrome.extension.connect();
//alert(__screenShot);

//-----------------------------------------------------------------------------

function nm_getFile(src)
{
	return src.substring( src.lastIndexOf("/")+1 );
}

// Compara as URI verificando o nome bruto do arquivo
function nm_compareURL(url1,url2)
{
	url1 = url1.substring(url1.lastIndexOf("/")+1);
	url2 = url2.substring(url2.lastIndexOf("/")+1);
	url1 = url1.substring(0,url1.lastIndexOf("."));
	url2 = url2.substring(0,url2.lastIndexOf("."));
	url1 = unescape(url1);
	url2 = unescape(url2);
	
	return url1==url2;
}

function nm_getFromList(url)
{
	for(var i=0; i<nm_image_store.length; i++)
	{
		if ( nm_compareURL(nm_image_store[i].img_url,url) )
			return nm_image_store[i];
	}
	return null;
	//return nm_image_store[0];
}

$($("#postingComposeBox")[0].contentDocument).find("a img").each(
 function( e )
 {
	var img = $(this);
	var a = img.parent();
	var url = nm_getFile(img.attr("src"));
	var ref = nm_getFromList(url);
	if (ref!=null)
	{
		var title = ref.title + " por " + ref.autor;
		a.attr("title",title);
		a.attr("href",ref.url);
		a.attr("target","_new");
		img.attr("alt",title);
	}
 }
);




$("#debug").html(imagens.length);
