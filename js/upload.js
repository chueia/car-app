/**
 * 
 */
	
	//拆分符号
	function Separator(type){
		var array = ["aadc0", "Qlcc=", "3aOk=", "RQ7U=","LSko=","L7ZY=","0IUU=","U2Fsd"]; 
		return array[type-1];
	}
	
	
	//首页商家预览
	function get(id,detailtype,locatype,detailid){
		var url="/Rongxin/GetDetailServlet";
    	$.ajax({
            type: 'POST',
            url: url,
            data: {
            	'detailtype':detailtype,
            	'locatype':locatype,
            	'detailid':detailid
            },
            dataType: 'json',
            cache: false,
            success: function (resu) {
                var obj = eval(resu);
                var html="";
                if (obj.res!="") {
                	
                	var arr_data=obj.res.split(Separator(2));
                	for(var i=0;i<arr_data.length;i++){
                		var arr_culoum=arr_data[i].split(Separator(1));
                		html+="<div class=\"shop-box\">"
                			html+="<a class=\"external\" href=\"./jinrongxiangqing.html?detailid="+arr_culoum[2]+"\">"
                				html+="<div class=\"shop-top\">"
                					html+="<div class=\"shop-left\">"
                						html+="<img src=\""+arr_culoum[1]+"\" alt=\"\">"
                					html+="</div>"
                					html+="<div class=\"shop-right\">"
                						html+="<h2>"+arr_culoum[34]+"</h2>"
                						html+="<span>参考额度:"+arr_culoum[20]+"-"+arr_culoum[21]+"</span>"
                						html+="<span>32541人已放款</span>"
                						html+="<img src=\"./img/star-1.png\" alt=\"\">"
                					html+="</div>"
                				html+="</div>"
                		   html+="</a>"
                		   html+="<div class=\"shop-bottom\">"
	                		   html+="<span>"+arr_culoum[24]+"</span>"
	                	   html+="</div>"
                		html+="</div>";
                	}
                	
                } else {
                    //myApp.alert(obj.res, '融信E家');
                }
                document.getElementById(id).innerHTML=html;
            }
        });
	}
	
	//二手车信息
	function getTwoCar(id,detailtype,locatype,price,pinpai,ordertype){
		var url="/Rongxin/GetDetailServlet";
    	$.ajax({
            type: 'POST',
            url: url,
            data: {
            	'detailtype':detailtype,
            	'locatype':locatype,
            	'price':price,
            	'pinpai':pinpai,
            	'detailid':ordertype
            },
            dataType: 'json',
            cache: false,
            success: function (resu) {
                var obj = eval(resu);
                var html="";
                if (obj.res!="") {
                	var arr_data=obj.res.split(Separator(2));
                	for(var i=0;i<arr_data.length;i++){
                		var arr_culoum=arr_data[i].split(Separator(1));
                		html+="<a class=\"external\" href=\"./ershouchexiangqing.html?detailid="+arr_culoum[2]+"\">";
                		html+="<div class=\"shop-box\">";
                		html+="<div class=\"shop-top row\">";
                		html+="<div class=\"shop-left col-25\">";
                		html+="<img src=\""+arr_culoum[1]+"\" alt=\"\">";
                		html+="</div>";
                		html+="<div class=\"shop-right col-75\">";
                		html+="<h2>"+arr_culoum[4]+"</h2>";
                		html+="<p>行驶距离：";
                		html+=" <span>"+arr_culoum[5]+"万公里</span>";
                		html+="</p>";
                		html+="<p>首次上牌：";
                		html+="<span>"+arr_culoum[7]+"年</span>";
                		html+="</p>";
                		html+="<p>卖家信息：";
                		html+="<span>商家</span>";
                		html+="</p>";
                		html+="<b>"+arr_culoum[19]+"万</b>";
                		html+="</div>";
                		html+="</div>";
                		html+="</div>";
                		html+="</a>";
                	}
                	
                } else {
                    //myApp.alert(obj.res, '融信E家');
                }
                document.getElementById(id).innerHTML=html;
            }
        });
	}
	
	//收藏订单
	function Colltion(){
		var storage=window.localStorage;
		var userid=storage.getItem("userid");
		var detailid=location.href.split("?")[1].split("=")[1];
		var url="/Rongxin/ColltionServlet";
    	$.ajax({
            type: 'POST',
            url: url,
            data: {
            	'userid':userid,
            	'detailid':detailid,
            },
            dataType: 'json',
            cache: false,
            success: function (resu) {
            	
            }
        });
	}
	
	function Upload(controlid,obj,type){
		var storage=window.localStorage;
		var alerthtml="<div style='height:30px;width:98%;margin-top:50px;margin-left:1%;margin-bottom:50px;text-align:center;'><div style='width:0px;height:30px;background-color:green;' id='progress'></div><span id='progresspercent'></span></div>";
		MaskDiv(1,alerthtml,"上传进度显示","300","210");
	    var form = new FormData(document.getElementById(controlid));
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
				var fileurl=json.res;
				if(type==1){
					var html="<div class='img-box col-25'><img src='"+fileurl+"' alt=''></div>";
					obj.parentNode.parentNode.parentNode.innerHTML=html+obj.parentNode.parentNode.parentNode.innerHTML;
				}else if(type==2){
					obj.parentNode.parentNode.children[0].src=fileurl;
				}else if(type==3){
					obj.parentNode.parentNode.children[0].src=fileurl;
					var userid=storage.getItem("userid");
					var url="/Rongxin/AddHeadServlet";
					$.ajax({
			            type: 'POST',
			            url: url,
			            data: {
			            	'userid':userid,
			            	'headurl':fileurl
			            },
			            dataType: 'json',
			            cache: false,
			            success: function (resu) {
			                var obj = eval(resu);
			            }
					});
				}
			}
		}
		req.upload.onprogress=function (ev){
	    //console.log(ev);控制台打印progress { target: XMLHttpRequestUpload, isTrusted: true, lengthComputable: true,<br> //loaded: 15020, total: 15020, eventPhase: 0, bubbles: false, cancelable: false, defaultPrevented: false, <br>//timeStamp: 1445144855459000, originalTarget: XMLHttpRequestUpload }
	    	 if(ev.lengthComputable){
	    	    var precent=100 * ev.loaded/ev.total;
	    		document.getElementById('progress').style.width=precent+'%';
	     	    document.getElementById('progresspercent').innerHTML=Math.floor(precent)+'%';
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
			removeElement(document.getElementById("alert"));
			removeElement(document.getElementById("bigalert"));
		}else{
			removeElement(document.getElementById("alert"));
			removeElement(document.getElementById("bigalert"));
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
			cloud_alert.style.left=alertleft+"px";
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
		document.getElementById("imageFile").click();
	}
	
	function removeElement(obj){
		return document.body.removeChild(obj);
	}
	
	//获取金融详情
	function GetXiangQing(id){
		var url="/Rongxin/GetDetailServlet";
		var detailid=location.href.split("?")[1].split("=")[1];
    	$.ajax({
            type: 'POST',
            url: url,
            data: {
            	'detailid':detailid
            },
            dataType: 'json',
            cache: false,
            success: function (resu) {
                var obj = eval(resu);
                var html="";
                if (obj.res!="") {
                	var arr_data=obj.res.split(Separator(2));
                	for(var i=0;i<arr_data.length;i++){
                		var arr_culoum=arr_data[i].split(Separator(1));
                		html+="<div class=\"shop-box\">";
                        html+="<div class=\"shop-top\">";
                        html+="<div class=\"shop-left\">";
                        html+="<img src=\""+arr_culoum[1]+"\" alt=\"\">";
                        html+="</div>";
                        html+="<div class=\"shop-right\">";
                        html+="<h2>"+arr_culoum[34]+"</h2>";
                        html+="<i class=\"love active\" alt=\"\" onclick=\"Colltion();\"></i>";
                        html+="<br>";
                        html+="<span class=\"distance\">2km</span>";
                        html+="<span class=\"numbers\">351444人已放款</span>";
                        html+="<img src=\"./img/star-5.png\" alt=\"\">";
                        html+="</div>";
                        html+="</div>";
                        html+="<div class=\"text\">";
                        html+="<p>线上全自动审核放款，20000元内即时到账。</p>";
                        html+="</div>";
                        html+="</div>";
                        html+="<div class=\"choose\">";
                        html+="<div class=\"choose-box\">";
                        html+="<span>借款金额("+arr_culoum[22]+"-"+arr_culoum[23]+")</span>";
                        html+="<input id=\"choose-gold\" type=\"text\" readonly placeholder=\"1000\">";
                        html+="</div>";
                        html+="<div class=\"choose-box\">";
                        html+="<span>分期期限("+arr_culoum[24]+"个月）</span>";
                        html+="<input id=\"choose-bystages\" type=\"text\" readonly placeholder=\"1\">";
                        html+="</div>";
                        html+="</div>";
                        html+="<div class=\"text1\">";
                        html+="<div class=\"text1-box\">";
                        html+="<span>1000</span>";
                        html+="<p>每月还款</p>";
                        html+="</div>";
                        html+="<div class=\"text1-box\">";
                        html+="<span>"+arr_culoum[25]+"</span>";
                        html+="<p>参考月利率</p>";
                        html+="</div>";
                        html+="<div class=\"text1-box\">";
                        html+="<span>"+arr_culoum[26]+"min</span>";
                        html+="<p>最快放款时间</p>";
                        html+="</div>";
                        html+="</div>";
                        html+="<div class=\"details\">";
                        html+="<div class=\"details-title\">";
                        html+="<p>产品详情</p>";
                        html+="</div>";
                        html+="<div class=\"details-main\">";
                        html+="<div class=\"conditions\">";
                        html+="<i></i><span>申请条件</span>";
                        html+="<p>"+arr_culoum[27]+"</p>";
                        html+="</div>";
                        html+="<div class=\"conditions introduction\">";
                        html+="<i></i><span>产品介绍</span>";
                        html+="<p>"+arr_culoum[28]+"</p>";
                        html+="</p>";
                        html+="</div>";
                        html+="</div>";
                        html+="</div>";
                        html+="<div class=\"button\" >";
                        html+="<a href=\"./jinrongdaikuan.html\" class=\"external\">";
                        html+="<p>立即申请</p>";
                        html+="</a>";
                        html+="</div>";
                	}
                	
                } else {
                    //myApp.alert(obj.res, '融信E家');
                }
                document.getElementById(id).innerHTML=html;
            }
        });
	}
	
	//获取用户信息
	function getUser(id){
		var storage=window.localStorage;
		var userid=storage.getItem("userid");
		var url="/Rongxin/GetUserServlet";
    	$.ajax({
            type: 'POST',
            url: url,
            data: {
            	'userid':userid
            },
            dataType: 'json',
            cache: false,
            success: function (resu) {
                var obj = eval(resu);
                var html="";
                if (obj.res!="") {
                	var arr_data=obj.res.split(Separator(2));
                	html+="<div>";
                	html+="<span class=\"\">本人姓名</span>";
                	html+="<span style=\"float:right;\">"+arr_data[1]+"</span>";
                	html+="</div>";
                	html+="<div>";
                	html+="<span class=\"\">身份证号</span>";
                	html+="<span style=\"float:right;\">"+arr_data[2]+"</span>";
                	html+="</div>";
                	html+="<div>";
                	html+="<span class=\"\">电话</span>";
                	html+="<span style=\"float:right;\">"+arr_data[0]+"</span>";
                	html+="</div>";
                } else {
                    //myApp.alert(obj.res, '融信E家');
                }
                document.getElementById(id).innerHTML=document.getElementById(id).children[0].outerHTML+html;
            }
        });
	}
	//获取汽车详情
	function GetCarXiangqing(id){
		var url="/Rongxin/GetDetailServlet";
		var detailid=location.href.split("?")[1].split("=")[1];
    	$.ajax({
            type: 'POST',
            url: url,
            data: {
            	'detailid':detailid
            },
            dataType: 'json',
            cache: false,
            success: function (resu) {
                var obj = eval(resu);
                var html="";
                if (obj.res!="") {
                	var arr_data=obj.res.split(Separator(2));
                	for(var i=0;i<arr_data.length;i++){
                		var arr_culoum=arr_data[i].split(Separator(1));
                		var arr_img=arr_culoum[13].split(";");
                		html+="<div class=\"banner\">";
                        html+="<div class=\"swiper-container\">";
                        html+="<div class=\"swiper-wrapper\">";
                        for(var j=0;j<arr_img.length;j++){
                        	html+="<div class=\"swiper-slide\"><img src=\""+arr_img[j]+"\" alt=\"\"></div>";
                        }
                        html+="</div>";
                        html+="<div class=\"swiper-button-prev\"></div>";
                        html+="<div class=\"swiper-button-next\"></div>";
                        html+="<div class=\"shadow shadow-name\">";
                        html+="<p>恩施|2017-09-28发布</p>";
                        html+="</div>";
                        html+="<div class=\"shadow shadow-number\">";
                        html+="<p>1/"+arr_img.length+"</p>";
                        html+="</div>";
                        html+="</div>";
                        html+="</div>";
                        html+="<div class=\"title\">";
                        html+="<h1>"+arr_culoum[4]+"</h1>";
                        html+="<i class=\"love\"></i>";
                        html+="</div>";
                        html+="<div class=\"title2\">";
                        html+="<h1>"+arr_culoum[19]+"万<span>(包含过户费)</span></h1>";
                        html+="<span class=\"span2\">比新车省：113.49万</span>";
                        html+="</div>";
                        html+="<div class=\"car-text\">";
                        html+="<div class=\"text-title\">";
                        html+="<span>车辆详情</span>";
                        html+="</div>";
                        html+="<div class=\"car-instruction row\">";
                        html+="<p class=\"col-20\">说明：</p>";
                        html+="<span class=\"col-80\">"+arr_culoum[12]+"</span>";
                        html+="</div>";
                        html+="<div class=\"car-img\">";
                        html+="<img src=\""+arr_culoum[14]+"\" alt=\"\">";
                        html+="<div class=\"row\">";
                        html+="<p class=\"col-20\">正侧</p>";
                        html+="<span class=\"col-80\">";
                        html+="漆面完整保持较好，车身结构无修复。";
                        html+="</span>";
                        html+="</div>";
                        html+="</div>";
                        html+="<div class=\"car-img\">";
                        html+="<img src=\""+arr_culoum[15]+"\" alt=\"\">";
                        html+="<div class=\"row\">";
                        html+="<p class=\"col-20\">正前</p>";
                        html+="<span class=\"col-80\">";
                        html+="挡泥板、保险杠完好，大灯清晰。";
                        html+="</span>";
                        html+="</div>";
                        html+="</div>";
                	}
                	
                } else {
                    //myApp.alert(obj.res, '融信E家');
                }
                document.getElementById(id).innerHTML=document.getElementById(id).children[0].outerHTML+html;
            }
        });
	}
	
	
	//个人简介
	function Gerenjianjie(id){
		var storage=window.localStorage;
		var nickname=storage.getItem("nickname");
		var createtime=storage.getItem("createtime");
		var html="";
		html+="<div class=\"main-title\">";
		html+="<div class=\"exit\" onclick='javascript:history.back(-1)'>";
		html+="<img src=\"./img/exit.png\" alt=\"\">";
		html+="</div>";
		html+="<p>个人信息</p>";
		html+="</div>";
		html+="<div class=\"excel-box\">";
		html+="<div>";
		html+="<span class=\"\">昵称</span>";
		html+="<input type=\"text\" placeholder=\""+nickname+"\">";
		html+="</div>";
		html+="</div>";
		html+="<div class=\"excel-box\">";
		html+="<div>";
		html+="<span class=\"\">头像</span>";
		html+="<div class=\"geren\" style=\"border-bottom:0\">";
		html+="<img src=\"./img/moren-img.png\" alt=\"\">";
		html+="<form id=\"uploadform\" action=\"FileUpload\" method=\"post\" enctype=\"multipart/form-data\" >";
		html+="<input class=\"file file1\" accept=\"image/*\" multiple onchange=\"Upload('uploadform',this,3);\" type=\"file\" name=\"imageFile\" id=\"imageFile\" >";
        html+="</form>";
        html+="</div>";
        html+="</div>";
        html+="<div>";
        html+="<span class=\"\">个人简介</span>";
        html+="<input type=\"text\">";
        html+="</div>";
    	html+="</div>";
    	html+="<div class=\"excel-box\">";
        html+="<a href=\"./shenfenzheng.html\" class=\"external\">";
        html+="<div>";
        html+="<span class=\"\">身份证认证</span>";
        html+="<img class=\"icon-right\" src=\"./img/icon-right.png\" alt=\"\">";
        html+="</div>";
        html+="</a>";
        html+="<a href=\"./yingyezhizhao.html\" class=\"external\">";
        html+="<div>";
        html+="<span class=\"\">营业执照认证</span>";
        html+="<img class=\"icon-right\" src=\"./img/icon-right.png\" alt=\"\">";
        html+="</div>";
        html+="</a>";
    	html+="</div>";
   		html+="<div class=\"excel-box\">";
        html+="<div>";
        html+="<span>注册时间</span>";
        html+="<span class=\"right\">"+createtime.split(" ")[0]+"</span>";
        html+="</div>";
    	html+="</div>";
    	document.getElementById(id).innerHTML=html;
	}