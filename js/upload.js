/**
 * 
 */
var $$=function(id){
		return document.getElementById(id);
	}
	
  
	
	function Upload(controlid){
		var alerthtml="<div style='height:30px;width:98%;margin-top:50px;margin-left:1%;margin-bottom:50px;text-align:center;'><div style='width:0px;height:30px;background-color:green;' id='progress'></div><span id='progresspercent'></span></div>";
		MaskDiv(1,alerthtml,"上传进度显示","300","210");
	    var form = new FormData($$(controlid));
	    var req = new XMLHttpRequest();
	    if(req==null){
	    	alert("浏览器不支持");
	    	return;
	    }
	    var urls="/Rongxin/FileUpload";
	    req.open("post", urls, true);//true会回调，false不会回调
	    //req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;");//缺少这句，后台无法获取参数  
	    //注册回调函数
		req.onreadystatechange=function(){
			//判断数据是否传送完成
			if (req.readyState == 4 && req.status == 200) {//判断http交互是否成功
				var json=eval('('+req.responseText+')');
				var fileid=json.res;
				console.log(fileid);
			}
		};
		req.upload.onprogress=function (ev){
	    //console.log(ev);控制台打印progress { target: XMLHttpRequestUpload, isTrusted: true, lengthComputable: true,<br> //loaded: 15020, total: 15020, eventPhase: 0, bubbles: false, cancelable: false, defaultPrevented: false, <br>//timeStamp: 1445144855459000, originalTarget: XMLHttpRequestUpload }
	    	 if(ev.lengthComputable){
	    	     var precent=100 * ev.loaded/ev.total;
	    		$$('progress').style.width=precent+'%';
	     	    $$('progresspercent').innerHTML=Math.floor(precent)+'%';
	     		if(precent==100){
	     			setTimeout("CloseMask()",1000);
	     		}
	    	 }
	    }
	    req.send(form);
	}
	
	//关闭弹框
	function CloseMask(type){
		if(type==2){//发送请求，当前页返回到上一页
			//sendRequest("parameter=15&paramLength=2");
			removeElement($$("alert"));
			removeElement($$("bigalert"));
		}else{
			removeElement($$("alert"));
			removeElement($$("bigalert"));
		}
	}
	
	//页面弹框操作
	function MaskDiv(type,html,title,width,height){// 1 订制弹框  2 常规弹框
		var zhezhao=document.createElement("div");
		zhezhao.id="bigalert";
		zhezhao.style.zIndex=99999;
		zhezhao.style.width="100%";
		zhezhao.style.height="100%";
		zhezhao.style.position="fixed";
		zhezhao.style.left="0px";
		zhezhao.style.top="0px";
		//zhezhao.style.backgroundColor="#ccc";
		zhezhao.style.filter="alpha(opacity=70)";
		zhezhao.style.opacity="0.7";
		document.body.appendChild(zhezhao);
		//计算左边与顶部的距离
		var alertleft=(document.body.clientWidth -(width.indexOf("%")>=0?parseInt(width.replace("%","")/100*document.body.clientWidth):width))/2;
		var alerttop=(document.body.clientHeight -(height.indexOf("%")>=0?parseInt(height.replace("%","")/100*document.body.clientHeight):height))/2;
		switch (type) {
		case 1:
			var cloud_alert=document.createElement("div");
			cloud_alert.id="alert";
			cloud_alert.style.zIndex=999999;
			cloud_alert.style.width=width+"px";
			cloud_alert.style.height=height+"px";
			cloud_alert.style.position="fixed";
			cloud_alert.style.left="1%";
			cloud_alert.style.top=alerttop+"px";
			cloud_alert.style.backgroundColor="white";
			cloud_alert.style.borderRadius="15px";
			cloud_alert.style.textAlign="center";
			
			var alerthtml="";//"<div style='height:30px;background-color:#83CFE9;border-radius-left-top:15px;border-radius-right-top:15px;padding-left:10px;line-height:30px;font-size:16px;color:white;cursor:default;text-align:left;'>"+title+"<div style='width:26px;height:26px;float:right;margin-right:15px;font-size:13px;cursor: pointer;' onclick='CloseMask();'>关闭</div></div>";
			alerthtml+=html;
			alerthtml+="<div style='height:40px;margin-top:80px;'><div id='alertsurebutton' style='width:60px;background-color:#EBB44A;color:white;height:30px;line-height:30px;margin:0px auto;text-align:center;font-size:13px;border-radius:5px;' onclick='CloseMask();'>确定</div></div>";
			cloud_alert.innerHTML=alerthtml;
			document.body.appendChild(cloud_alert);
			break;
		case 2://单纯弹框
			var cloud_alert=document.createElement("div");
			cloud_alert.id="alert";
			cloud_alert.style.zIndex=999999;
			cloud_alert.style.width=width.indexOf("%")>=0?parseInt(width.replace("%","")/100*window.screen.availWidth)+"px":width+"px";
			cloud_alert.style.height=height.indexOf("%")>=0?parseInt(height.replace("%","")/100*window.screen.availHeight)+"px":height+"px";
			cloud_alert.style.position="fixed";
			cloud_alert.style.left=alertleft+"px";
			cloud_alert.style.top=alerttop+"px";
			cloud_alert.style.backgroundColor="white";
			cloud_alert.style.borderRadius="5px";
			var alerthtml="<div style='height:30px;background-color:#D9F4FF;padding-left:10px;line-height:30px;font-size:13px;'>"+title+"</div>";
			alerthtml+="<div style='margin-top:"+((height-100-((html.length*16/(width-20))*16))/2)+"px;margin-left:2%;width:96%;text-align:center;font-size:16px;margin-bottom:10px;'>"+html+"</div>";
			alerthtml+="<div style='height:40px;margin-top:40px;'><div id='alertsurebutton' style='width:60px;background-color:#EBB44A;color:white;height:30px;line-height:30px;margin:0px auto;text-align:center;font-size:13px;border-radius:5px;' onclick='CloseMask();'>确定</div></div>";
			cloud_alert.innerHTML=alerthtml;
			document.body.appendChild(cloud_alert);
			break;
		case 3://弹框 确认取消框
			var cloud_alert=document.createElement("div");
			cloud_alert.id="alert";
			cloud_alert.style.zIndex=999999;
			cloud_alert.style.width=width+"px";
			cloud_alert.style.height=height+"px";
			cloud_alert.style.position="fixed";
			cloud_alert.style.left=alertleft+"px";
			cloud_alert.style.top=alerttop+"px";
			cloud_alert.style.backgroundColor="white";
			cloud_alert.style.borderRadius="5px";
			
			var alerthtml="<div style='height:30px;background-color:#D9F4FF;padding-left:10px;line-height:30px;font-size:13px;'>"+title+"</div>";
			alerthtml+="<div style='margin-top:"+((height-100-((html.length*16/(width-20))*16))/2)+"px;margin-left:2%;width:96%;text-align:center;font-size:16px;margin-bottom:10px;'>"+html+"</div>";
			alerthtml+="<div style='height:40px;margin-top:50px;'>" +
			"<div style='width:170px;margin:0px auto;'><div id='alertsurebutton' style='float:left;width:60px;background-color:#EBB44A;color:white;height:30px;line-height:30px;margin:0px auto;text-align:center;font-size:13px;border-radius:5px;'>确定</div>"+
			"<div id='alertclosebutton' style='float:left;width:60px;background-color:#EBB44A;color:white;height:30px;line-height:30px;margin:0px auto;margin-left:50px;text-align:center;font-size:13px;border-radius:5px;'>取消</div></div></div>";
			cloud_alert.innerHTML=alerthtml;
			document.body.appendChild(cloud_alert);
			break;
		case 4://弹框打开页面。
			var cloud_alert=document.createElement("div");
			cloud_alert.id="alertpage";
			cloud_alert.style.zIndex=999999;
			cloud_alert.style.width=width+"px";
			cloud_alert.style.height=height+"px";
			cloud_alert.style.position="fixed";
			cloud_alert.style.left=alertleft+"px";
			cloud_alert.style.top=alerttop+"px";
			cloud_alert.style.backgroundColor="white";
			cloud_alert.style.textAlign="center";
			var alerthtml="<div style='width:26px;height:26px;float:right;margin-right:15px;margin-top:10px;font-size:13px;cursor: pointer;' onclick='CloseMask(2);'>关闭</div>";
			alerthtml+=html;
			cloud_alert.innerHTML=alerthtml;
			document.body.appendChild(cloud_alert);
			break;
		default:
			break;
		}
	}
	
	function fileup(){
		var html="<form id='uploadform' action='/Rongxin/FileUpload' style='margin:0px auto;margin-top:50px;' name='cloud_upload' method='post' enctype='multipart/form-data'>";
		html+="<input id='file_upload' type='file' name='file_upload' accept='.jpeg,.jpg,.png'/>";
		html+="</form>";
		html+="<div style='height:40px;margin-top:40px;'>";
		html+="<div id='alertsurebutton' style='width:60px;background-color:#EBB44A;color:white;height:30px;line-height:30px;margin:0px auto;text-align:center;font-size:13px;border-radius:5px;' onclick=\"Upload('uploadform');\">上传</div>";
		html+="</div>";
		MaskDiv(4, html, "文件上传","300","250");
	}
	function check(){
		//alert($$("uploadform").children[0]);
		$$("imageFile").click();
	}
	
	function removeElement(obj){
		return document.body.removeChild(obj);
	}