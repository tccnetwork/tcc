((_t)=>{
  _t.domain="https://ram.tcc-coin.com";
  _t.postData=async(url = '', data = {})=>{
    var dataP = {
      method: 'POST',
      credentials: 'same-origin',
      //credentials:'omit',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    const response = await fetch(url,dataP );
    return response.json();
  };
  _t.login=(script, callback)=>{
    postData2(_t.domain+"/login", {script }).then(t => {
      if (typeof callback == 'function') {
        callback(t);
      }
    }).catch(err => {
      if (typeof callback == 'function') {
        callback({ result: false, msg: err });
      }
    });
  };
  _t.app_list=(callback)=>{
    postData2(_t.domain+"/app_list").then(t => {
      if (typeof callback == 'function') {
        callback(t);
      }
    }).catch(err => {
      if (typeof callback == 'function') {
        callback({ result: false, msg: err });
      }
    });
  };
  _t.app=(script, callback)=>{
    postData2(_t.domain+"/app", {script }).then(t => {
      if (typeof callback == 'function') {
        callback(t);
      }
    }).catch(err => {
      if (typeof callback == 'function') {
        callback({ result: false, msg: err });
      }
    });
  };
  _t.encode=(text)=>{
    let c=new TextEncoder();
    let a=c.encode(text);
    r=[];
    i=0;
    while (r.length<a.length||r.length%4!=0) {
      r.push(a[i]||0);
      i++;
    }
    let t=new Uint8Array(r);
    t=new Int32Array(t.buffer);
    return t.join("_");
  }
  _t.decode=(text)=>{
    let d=new TextDecoder();
    let a=text.split("_");
    a=a.map(m=>Number(m));
    let t=new Int32Array(a);
    t=d.decode(t.buffer);
    t=t.split("\x00");
    return t[0];
  };
  _t.encode2=(text)=>{
    let c=new TextEncoder();
    let a=c.encode(text);
    r=[];
    i=0;
    while (r.length<a.length||r.length%2!=0) {
      r.push(a[i]||0);
      i++;
    }
    let t=new Uint8Array(r);
    t=new Uint16Array(t.buffer);
    let kq=[];
    t.forEach(m=>{kq.push(String.fromCharCode(m))});
    return kq.join("");
  }
  _t.decode2=(text)=>{
    let d=new TextDecoder();
    let a=text.split("");
    a=a.map(m=>m.charCodeAt());
    let t=new Uint16Array(a);
    t=d.decode(t.buffer);
    t=t.split("\x00");
    return t[0];
  };
  _t.appAdd=(ob)=>{
    //ob={tapp:"123",name:"App 123",manager:["datnv","datnv2"]};
    return new Promise(r2=>{
      _t.app(`return await _a.add(`+JSON.stringify(ob)+`)`,r=>{r2(r)});
    });
  };
  _t.addDoc2=(ob, callback)=>{
    postData2(_t.domain+"/addDoc", {ob}).then(t => {
      if (typeof callback == 'function') {
        callback(t);
      }
    }).catch(err => {
      if (typeof callback == 'function') {
        callback({ result: false, msg: err });
      }
    });
  };
  _t.sendNotify=(tokenApp,title,body)=>{
    fetch("https://fcm.googleapis.com/v1/projects/tcc-coin-2f82b/messages:send",{
      headers:{
        Authorization: `Bearer ya29.c.c0ASRK0GbXH11N8nMPVBxQt-hzi0JGx8vNZNet7VGOP1HHg2jQtqJxh17wL4JZWSCZb6qNkN8dw8irBw6Cn7rqI-BGBrLqzGbIz_apabbDmtprLp2DQEAFDOa7lCtkdPQFkSLMxfH-upqAJpiB58f1VtQ_wLe2SHWLpHpwqyEiMr7wvnG1LcgrF-9ntUmAS9z7DtGHcwylfBfPVnvluCFjH9hs8MvBOWJ11uTmHnoVT0_4TTKAnb_9gZ62xCfb51wULHYmbejAuSndc4PtV6Js82oQAYX32TvfASoi1D2mwmTJ9J_WsmMnqn8meXfTAa3VmiWLoe8zKPNTMMZfv1krtnwNvax4HPaW-foEXaHV1SCybMT4cFLz0GH0mUPtFFQqG393CYsbkB-hQJ6_zgSfZUwesJdZzJRkaMoIQ8fwZZgShkJfXfFMuvyzQY79Rh03bsBSZqiouff46IZFUeIZi_RxZ2aJmUg71l-typlcubJeQFsX84_Q84Q4UgMI9ra6dsXdglnzrMbleoMcqM9SV-mlm5RBQRVZ2xjix6V55--zpbYnbb89nUma9Sos-omvRFO-t5rJuJ24-XuOOuI75je1Waii6SZzuhpgrxoM2-gevaFjZdSOiVIMiXz4j_rg61OUBMy4oMzVW-3sUIOzik7wbX-wyX-Ozh2vag-dVM4e9f1wXXfpbWWZBbyRnajYmnrvW7z-a8vV7o3QihWXsh5el2k6sU16YzgqgmFo8cjzhh6SwptlhraUnowUzxevIUBQpb7gI1smcoeoBskgdvW7mM0RmbxBzse8rcVuf0nggzsz_9nnS0s3phemgxtZUJRrssbUrvZ_QbihFBq5M6Jjh097b9svthkeYfa5lbR6XWp4v878s5pxVpd3RvyyuYz59jBSt73BBwrW0pm_x5S2FUubytqzXg_y71hFbuMdUXofj0Zd65nRUhkO-WvvS-BSSB-479knsnrlkIi_m2oII3Rwy68W5270cttMiV10vX2Ri4FRo65`,
        "Content-Type": 'application/json',

      },
      method:"POST",
      body:JSON.stringify({
        "message":{
          "token":tokenApp,
          "notification":{
            "body":body,
            "title":title
          }
        }
      })
    })
  };
  _t.copyApp=(ob, callback)=>{
    postData2(_t.domain+"/copyApp", {ob}).then(t => {
      if (typeof callback == 'function') {
        callback(t);
      }
    }).catch(err => {
      if (typeof callback == 'function') {
        callback({ result: false, msg: err });
      }
    });
  };
  
  
  _t.delApp=(ob, callback)=>{
    postData2(_t.domain+"/delApp", {ob}).then(t => {
      if (typeof callback == 'function') {
        callback(t);
      }
    }).catch(err => {
      if (typeof callback == 'function') {
        callback({ result: false, msg: err });
      }
    });
  };
  
  _t.sendMail=(to,subject,body, callback)=>{
    let ob={to:to,subject:subject,text:body};
    postData2(_t.domain+"/sendMail", {ob}).then(t => {
      if (typeof callback == 'function') {
        callback(t);
      }
    }).catch(err => {
      if (typeof callback == 'function') {
        callback({ result: false, msg: err });
      }
    });
  };
  
  _t.buy=(ob, callback)=>{
    postData2(_t.domain+"/buy", {ob}).then(t => {
      if (typeof callback == 'function') {
        callback(t);
      }
    }).catch(err => {
      if (typeof callback == 'function') {
        callback({ result: false, msg: err });
      }
    });
  };
  
  _t.checkToken=(callback)=>{
    return new Promise(r2=>{
      postData2(_t.domain+"/checkToken").then(t => {
        if (typeof callback == 'function') {callback(t);}
        r2(t);
      }).catch(err => {
        if (typeof callback == 'function') {callback({ result: true, msg: err });}
        r2({ result: true, msg: err });
      });
    });
  };
  
  _t.countDoc=(ob,callback)=>{
    return new Promise(r2=>{
      postData2(_t.domain+"/countDoc",{ob}).then(t => {
        if (typeof callback == 'function') {callback(t);}
        r2(t);
      }).catch(err => {
        if (typeof callback == 'function') {callback({ result: true, msg: err });}
        r2({ result: true, msg: err });
      });
    });
  };
  
  _t.profileAdd=(ob, callback)=>{
    postData2(_t.domain+"/profileAdd", {ob}).then(t => {
      if (typeof callback == 'function') {
        callback(t);
      }
    }).catch(err => {
      if (typeof callback == 'function') {
        callback({ result: false, msg: err });
      }
    });
  };
  
  _t.post=(url,ob, callback)=>{
    postData2(_t.domain+url, {ob}).then(t => {
      if (typeof callback == 'function') {
        callback(t);
      }
    }).catch(err => {
      if (typeof callback == 'function') {
        callback({ result: false, msg: err });
      }
    });
  };
  
  _t.profileView=(ob, callback)=>{
    postData2(_t.domain+"/profileView", {ob}).then(t => {
      if (typeof callback == 'function') {
        callback(t);
      }
    }).catch(err => {
      if (typeof callback == 'function') {
        callback({ result: false, msg: err });
      }
    });
  };
  
  _t.lsProfileImg=(ob, callback)=>{
    postData2(_t.domain+"/lsProfileImg", {ob}).then(t => {
      if (typeof callback == 'function') {
        callback(t);
      }
    }).catch(err => {
      if (typeof callback == 'function') {
        callback({ result: false, msg: err });
      }
    });
  };
  
  _t.uploadProfileImg=async(file,type)=>{
    if(!file){file=document.querySelector("#pop2 #file1")}
    
    let p=type||"";
    let fn=Date.now()+"_"+type+"(-_-)"+(file.files?file.files[0].name:file.name);

    const formData = new FormData();
    formData.append("file", (file.files?file.files[0]:file),fn);
    //console.log(file.files[0]);

    var dataP = {
      method: 'POST',
      credentials: 'same-origin',
      //credentials:'omit',
      headers: {},
      body: formData
    }
    if(window.token&&_t&&_t.user) {
      Object.assign(dataP['headers'],{"tapp":(window.tapp||""),"tid":(window.tid||"")}, {'Authorization': _t.user+` Bearer ${window.token}`});
    } 

    const r = await fetch(_t.domain+"/uploadProfileImg", dataP).then(t => t.json());
    //console.log(r);
    //if(window.pop2_close){if(r.result){pop2_close.click()}else{popupT2("pop2","",r.msg,"Upload False!",1,300);}}
    
    return r;
  };
  
  _t.allDoc=(tapp,t_filter,t_projection, callback)=>{
    postData2(_t.domain+"/alldoc", {tapp:tapp,t_filter:t_filter,t_projection:t_projection}).then(t => {
      if (typeof callback == 'function') {
        callback(t);
      }
    }).catch(err => {
      if (typeof callback == 'function') {
        callback({ result: false, msg: err });
      }
    });
  };
  
  _t.getdoc=(tapp,t_filter,t_projection, callback)=>{
    return new Promise(r2=>{
      postData2(_t.domain+"/getdoc", {tapp:tapp,t_filter:t_filter,t_projection:t_projection}).then(t => {
        if (typeof callback == 'function') {callback(t);}
        r2(t);
      }).catch(err => {
        if (typeof callback == 'function') {callback({ result: false, msg: err });}
        r2({result: false});
      });
    });
  };
  
  _t.tcc_reg=(user,pwd, callback)=>{
    return new Promise(r2=>{
      postData2(_t.domain+"/tcc_reg", {user:user,pwd:pwd}).then(t => {
        if (typeof callback == 'function') {callback(t);}
        r2(t);
      }).catch(err => {
        if (typeof callback == 'function') {callback({ result: false, msg: err });}
        r2({result: false});
      });
    });
  };
  
  _t.call=(path,ob, callback)=>{
    return new Promise(r2=>{
      postData2(_t.domain+"/"+path, ob).then(t => {
        if (typeof callback == 'function') {callback(t);}
        r2(t);
      }).catch(err => {
        if (typeof callback == 'function') {callback({ result: false, msg: err });}
        r2({result: false});
      });
    });
  };
  
  _t.call2=(path,ob, callback)=>{
    return new Promise(r2=>{
      postData2("https://ram.tcc-coin.com/"+path, ob).then(t => {
        if (typeof callback == 'function') {callback(t);}
        r2(t);
      }).catch(err => {
        if (typeof callback == 'function') {callback({ result: false, msg: err });}
        r2({result: false});
      });
    });
  };
  
  _t.readFile3=(tapp,path, callback)=>{
    postData2(_t.domain+"/readfile", {tapp:tapp,path:path}).then(t => {
      if (typeof callback == 'function') {
        callback(t);
      }
    }).catch(err => {
      if (typeof callback == 'function') {
        callback({ result: false, msg: err });
      }
    });
  };
  
  _t.saveFile3=(ob, callback)=>{
    postData2(_t.domain+"/saveFile", {ob}).then(t => {
      if (typeof callback == 'function') {
        callback(t);
      }
    }).catch(err => {
      if (typeof callback == 'function') {
        callback({ result: false, msg: err });
      }
    });
  };
  _t.f=(script, callback)=>{
    postData2(_t.domain+"/f", {script }).then(t => {
      if (typeof callback == 'function') {
        callback(t);
      }
    }).catch(err => {
      if (typeof callback == 'function') {
        callback({ result: false, msg: err });
      }
    });
  };
  _t.dirT=(path="")=>{
    return new Promise(r2=>{
      _t.postData(_t.domain+"/list",{path:path}).then(r=>r2(r.data));
    });
  };

  _t.obs=()=>{
    return new Promise(r2=>{
      excuteCache("return re.obs",r=>{
        let d=r.data;
        r2(d);
      });
    });
  }
  _t.as=async (ob)=>{
    await _t.a2(ob);
    await _t.s();
  };
  _t.a2=(ob)=>{
    return new Promise((r2)=>{
      excuteCache('re.a2('+JSON.stringify(ob)+')',r=>{r2(r)});
    });
  };
  _t.s=()=>{
    return new Promise((r2)=>{
      excuteCache('re.s(1)',r=>{r2(r)});
    });
  };
  _t.getMem=()=>{
    return new Promise((r2)=>{
      excuteCache('return new Promise(r => {getMemory(r);});', r=>console.log(r.data.data));
    });
  };
  //await _t.find('f=>f.content&&f.content.includes("CVE-2023")')
  _t.find=async (f,callback)=>{
    let r=[];
    let l=await _t.dirT("/db");
    console.log(l);
    l=l.map(m=>m.name);
    for(let i=0;i<l.length;i++){
      let d=await _t.fetch2("https://ram.nguyentrung.net/db/"+l[i]);
      if(f){
        let t='d=d.filter('+f+')';
        eval(t);
      }
      r.push(...d);
      if(typeof callback=="function"){callback(d)}
    }
    return r;
  };
  //await _t.filter('f=>f.content&&f.content.includes("CVE-2023-6094")')
  _t.filter=async (f='f=>f.content&&f.content.includes("CVE-2023-6094")',callback)=>{
    let r=[];
    for(let i=0;i<5;i++){
      let k=await _t.fetch2("https://ram.nguyentrung.net/re/"+i+"_k.html");
      let d=await _t.fetch2("https://ram.nguyentrung.net/re/"+i+".html");
      d=_t.d(d,k);
      let t='d=d.filter('+f+')';
      eval(t);
      r.push(...d);
      if(typeof callback=="function"){callback(d)}
    }
    return r;
  };
  _t.addDoc=async (tapp,ob)=>{
    ob.form=ob.form||ob.type;
    let path="/tfl/dbram/apps/"+tapp+"/"+ob.form+"/";
    if(!ob.tid){
      ob.tid=Date.now().toString(36)+(Math.floor(Math.random() * Date.now())).toString(36).padStart(8,"0");
    }
    if(!ob.tapp){ob.tapp=tapp}
    if(!await _t.exists(path)){
      let t=await _t.newFolder(path);
      if(!t.result){return t}
    }
    let t=await _t.saveFileGzip(path,ob.tid+".tdoc",ob);
    return t;
  };
  _t.lsDocAll=(tapp,f,p)=>{
    return new Promise(r2=>{
      //_t.f('return await _f.lsDocAll("'+tapp+'",'+JSON.stringify(f)+','+JSON.stringify(p)+')',r=>{r2(r);});
      _t.allDoc(tapp,f,p,r=>{
        r2(r);
      });
    });
  };
  _t.lsDoc=(path,mix)=>{
    return new Promise(r2=>{
      _t.f('return await _f.lsDoc("'+path+'","'+mix+'")',r=>{
        r2(r);
      });
    });
  };
  _t.findDoc=async(tapp,f,p)=>{
    f=f||{};
    p=p||{};
    let folder=(f.form||f.type||"");
    let path="/tfl/dbram/apps/"+tapp+"/"+folder+"/";
    if(folder&&f.tid){path=path+f.tid+"/"}
    let d=await _t.dirT2(path);
    d=(d.data||{}).data||[];
    d=d.filter(m=>m.isFile&&m.name.includes(".tdoc"));
    if(folder&&f.tid){d=[d[d.length-1]]}
    d=d.map(m=>m.name);
    let r=[];
    for(let i=0;i<d.length;i++){
      let t=await _t.readFileGzip(path+d[i]);
      if(Array.isArray(t)){r.push(...t)}else{
        r.push(t);
      }
    }
    return r;
  };
  _t.saveFile2=async(path,fn,data,pop=1)=>{
    
    if(!navigator.onLine){
      if(pop){popupT2("loading1","",`<div class="color-green">No Internet Access</div>`,"Error!",1,355);}
      return;
    }
    if(pop){popupT2("loading","",`<div class="shadow-md bdr5 p5 bg-white cg">Saving...</div>`,"",0,100);}
    if(!path&&!fn&&!data){
      path=_t.info_.p;
      fn=_t.info_.f;
      data="";
      if(window.editor&&window.editor["editorT"]){data=editor["editorT"].getValue();}
    }
    if(!fn||!data){
      return {result:false,msg:"File name && File data cannot be null!"}
      if(pop){popupT2("loading","",`<div class="shadow-md bdr5 p5 bg-white color-orange">File name && File data cannot be null!</div>`,"",0,100)}
    }
    
    let ex=fn.split(".").pop();
    let mode="text/html";
    switch(ex) {
      case "js":mode="text/javascript";break;
      case "json":mode="text/json";break;
      case "php":mode="text/x-php";break;
      case "css":mode="text/css";break;
      case "jsx":mode="text/jsx";break;
      case "xml":mode="text/xml";break;
      case "svg":mode="image/svg+xml";break;
    }
    
    var contents = data;
    var blob = new Blob([contents], { type: mode });
    var file = new File([blob], fn, {type: mode});
    let r=await _t.upload(file,path,0);
    if(r.result){
      if(pop){popupT2("loading","",`<div class="shadow-md bdr5 p5 bg-white cg">Saved!</div>`,"",0,100);}
    }else{if(pop){popupT2("loading","",`<div class="shadow-md bdr5 p5 bg-white cg">Save Failed!</div>`,"",0,100);}}
    if(pop){setTimeout(()=>{loading_close.click()},1000);}
  };
  _t.saveFile=(path,fn,data,pop=1)=>{
    if(!navigator.onLine){
      if(pop){popupT2("loading1","",`<div class="color-green">No Internet Access</div>`,"Error!",1,355);}
      return;
    }
    if(pop){popupT2("loading","",`<div class="shadow-md bdr5 p5 bg-white cg">Saving...</div>`,"",0,100);}
    if(!path&&!fn&&!data){
      path=_t.info_.p;
      fn=_t.info_.f;
      data="";
      if(window.editor&&window.editor["editorT"]){data=editor["editorT"].getValue();}
    }
    if(!fn||!data){
      return {result:false,msg:"File name && File data cannot be null!"}
      if(pop){popupT2("loading","",`<div class="shadow-md bdr5 p5 bg-white color-orange">File name && File data cannot be null!</div>`,"",0,100)}
    }
    return new Promise(r2=>{
      _t.f(`return await _f.saveFile("`+path+`","`+fn+`",`+JSON.stringify(data)+`,0)`,r=>{
        if(r.result){
          if(pop){popupT2("loading","",`<div class="shadow-md bdr5 p5 bg-white cg">Saved!</div>`,"",0,100);}
        }else{if(pop){popupT2("loading","",`<div class="shadow-md bdr5 p5 bg-white cg">Save Failed!</div>`,"",0,100);}}
        if(pop){setTimeout(()=>{loading_close.click()},1000);}
        r2(r);
      });
    });
  };
  _t.delFile=(path,reload)=>{
    return new Promise(r2=>{
      _t.f(`return await _f.delFile("`+path+`")`,r=>{
        if(!r.result){r2(r)}else{
          if(reload){
            if(window.pop2_close){pop2_close.click()}
            if(typeof path!="string"){path=path.join("/")}
            if(path.includes("/tfl/dbram/apps/")){
              path=path.split("/");
              path.pop();
              _t.ls2(path.join("/"),path[4]);
            }else{
              path=path.split("/");
              path.pop();
              _t.ls(path.join("/"),path[4]);
            }
          }else{r2(r)}
        }
      });
    });
  };
  _t.dirT2=(path="")=>{
    let ob={path:path};
    
   
    return new Promise(r2=>{
      _t.post("/dirT",ob,(t)=>{r2({result:true,data:t});});
    });
    
  };
  _t.newFolder=(path)=>{
    return new Promise(r2=>{
      _t.f(`return await _f.newFolder("`+path+`")`,r=>{
        r2(r);
      });
    });
  };
  _t.delFolder=(path,reload)=>{
    return new Promise(r2=>{
      _t.f(`return await _f.delFolder("`+path+`")`,r=>{
        if(reload){
          if(window.pop2_close){pop2_close.click()}
          if(path.includes("/tfl/dbram/apps/")){
            path=path.split("/").filter(m=>m);
            path.pop();
            _t.ls2("/"+path.join("/"),path[3]);
          }else{
            path=path.split("/").filter(m=>m);
            path.pop();
            _t.ls("/"+path.join("/")+"/",path[3]);
          }
        }else{r2(r);}
      });
    });
  };
  _t.readTemplate=(path)=>{
    return new Promise(r2=>{
      fetch(path).then(r=>r.text()).then(r=>r2(r))
    });
  };
  _t.readFile2=(path)=>{
    return new Promise(r2=>{
      _t.readFile3("","/tfl/dbram/web/6868/templates/tintuc.html",r=>{
        try{
          let c=new TextDecoder();
          let d=r.data.data.data;
          d=c.decode(new Int8Array(d));
          r2(d)
        }catch(err){console.log(err)}
      });
    });
  };
  _t.readFile=(path="/tfl/dbram/web/apps.html")=>{
    if(!path.includes("/tfl/dbram/apps")&&path!="/tfl/dbram/index.js"){
      path=("/tfl/dbram/web/"+path).split("//").join("/").split("/tfl/dbram/web/tfl/dbram/web/").join("/tfl/dbram/web/");
    }
    return new Promise(r2=>{
      _t.f('return await _f.readFile("'+path+'",0)',r=>{
        try{
          let c=new TextDecoder();
          let d=r.data.data.data;
          d=c.decode(new Int8Array(d));
          r2(d)
        }catch(err){console.log(err)}
      });
    });
  };
  _t.saveFileGzip=(path,fn,data,pop=1)=>{
    if(!navigator.onLine){
      if(pop){popupT2("loading1","",`<div class="color-green">No Internet Access</div>`,"Error!",1,355);}
      return;
    }
    if(pop){popupT2("loading","",`<div class="shadow-md bdr5 p5 bg-white cg">Saving...</div>`,"",0,100);}

    if(!path&&!fn&&!data){
      path=_t.info_.p;
      fn=_t.info_.f;
      data="";
      if(window.editor&&window.editor["editorT"]){data=editor["editorT"].getValue();}
    }
    path=path+"/".split("//").join("/");
    return new Promise(r2=>{
      _t.f(`return _f.saveFileGzip("`+path+`","`+fn+`",`+JSON.stringify(data)+`)`,r=>{
        if(r.result){
          if(pop){popupT2("loading","",`<div class="shadow-md bdr5 p5 bg-white cg">Saved!</div>`,"",0,100);}
        }else{if(pop){popupT2("loading","",`<div class="shadow-md bdr5 p5 bg-white cg">Save Failed!</div>`,"",0,100);}}
        if(pop){setTimeout(()=>{loading_close.click()},1000);}
        r2(r);
      });
    });
  };
  _t.readFileGzip=(path="/tfl/dbram/web/apps.gzip")=>{
    //path="/tfl/dbram/"+path.split("/tfl/dbram/").join("");
    return new Promise(r2=>{
      _t.f(`return await _f.readFileGzip("`+path+`",1)`,r=>{
        if(r.data){r2(r.data);}else{r2(r)}
      });
    });
  };

  _t.addFileForm=()=>{
    popupT2("pop2","",`
          <div class="df aic">
          	<div class="mt10 df bd bdr10 oh">
                 <input class="p10 w100" placeholder="File name" id="name" name="name">
                  <select class="p10 w86p" id="ex" name="ex">
                      <option value="html">.html</option>
                      <option value="css">.css</option>
                      <option value="svg">.svg</option>
                      <option value="js">.js</option>
                      <option value="jsx">.jsx</option>
                      <option value="json">.json</option>
                      <option value="xml">.xml</option>
                      <option value="txt">.txt</option>
                      <option value="php">.php</option>
                      <option value="aspx">.aspx</option>
      </select>
      </div>
      	</div>
          <div class="df w100 jcc"><div onclick="_t.addFileUpdate()" class="p10 mt10 btn cf">Cập nhật</div></div>
          `,"New File",1,300);
    let t=document.querySelector("#pop2 input");
    if(t){t.focus()}
  };
  _t.exists=async(p,fn)=>{
    if(fn){
      let d=await _t.dirT2(p);
      d=(d.data.data||[]).filter(m=>m.isFile).map(m=>m.name);

      if(d.includes(fn)){return 1}
      return 0;
    }else{
      return new Promise(r2=>{
        _t.f('return await _f.exists("'+p+'")',r=>{
          if(r.result){r2(r.data)}else{r2(0)}
        });
      });
    }
  };
  _t.addFileUpdate=async()=>{
    let ob=getDataForm("pop2");
    if(ob.name){
      let fn=ob.name+"."+ob.ex;
      _t.addFile(fn);
    }else{alert("Name cannot be null!")}
  };
  _t.addFile=async(fn)=>{
    let path="";
    let t={};
    let d=_t.info_;
    if(d.p.includes('/tfl/dbram/apps')){
      if(d.t=="folder"){
        path="/"+d.p+(d.f?`/`+d.f+`/`:`/`);
      }else{path="/"+d.p+"/";}
      path=path.split("//").join("/");
      path=_t.truePath(path);
      if(!await _t.exists(path,fn)){
        t=await _t.saveFileGzip(path,fn,"content");
      }
    }else{
      if(d.t=="folder"){
        path='/tfl/dbram/web/'+d.p+(d.f?`/`+d.f+`/`:`/`);
      }else{
        path='/tfl/dbram/web/'+d.p+'/';
      }
      path=path.split("//").join("/");
      path=_t.truePath(path);
      if(!await _t.exists(path)){await _t.newFolder(path)}//chưa có folder thì tạo mới
      if(!await _t.exists(path,fn)){
        t=await _t.saveFile(path,fn,"content");
      }
    }

    if(!t.result){
      alert("Network error or filename has already existed!");
    }else{
      pop2_close.click();
      if(d.p.includes('/tfl/dbram/apps')){
        if(d.t=="folder"){
          path="/"+d.p+(d.f?`/`+d.f+`/`:`/`);
        }else{path="/"+d.p+"/";}
        console.log(path);
        _t.openFile(path+fn,"editorT");
      }else{
        if(d.t=="folder"){
          path=d.p+(d.f?`/`+d.f+`/`:`/`);
        }else{
          path=d.p+'/';
        }
        path="/tfl/dbram/web/"+path;
        path=path.split("//").join("/").split("/tfl/dbram/web/tfl/dbram/web/").join("/tfl/dbram/web/");
        console.log(path);
        _t.openFile(path+fn,"editorT");
      }
    }
    return t;
  };
  _t.addFolderForm=()=>{
    popupT2("pop2","",`
          <input class="w100 bd bdr5 p10 mt5" type="email" placeholder="Name"/>
          <div class="df w100 jcc"><div onclick="_t.addFolderUpdate()" class="p10 mt10 btn bdr5 cf">Cập nhật</div></div>
          `,"New Folder",1,300);
    let t=document.querySelector("#pop2 input");
    if(t){t.focus()}
  };

  _t.addFolderUpdate=async()=>{
    let e=document.querySelector("#pop2 input").value;
    if(e){
      _t.addFolder(e);
    }else{alert("Name cannot be null!")}
  };
  _t.addFolder=async(fn)=>{
    let f=_t.info_;
    let path=_t.truePath(f.p+"/"+(f.t=="folder"?f.f+"/":""));
    //console.log(path+fn+"/")
    let tapp=path.split("/")[4];
    let t=await _t.newFolder(path+fn+"/");
    if(!t.result){alert("Error!")}else{
      pop2_close.click();
        _t.ls(path,tapp);
      }
    return t;
  };
  _t.newForm=()=>{
  };
  _t.newView=()=>{
  };
  _t.moreControl=()=>{
    popupT2("pop2","",`
          <div onclick="_t.newForm()" class="bd p5 bdr5 m5 cp df aic">
            <div class="wh18 me5 icon op50 icon_file2"></div>
            <div>+ Form</div>
      </div>
            <div onclick="_t.newView()" class="bd p5 bdr5 m5 cp df aic">
            <div class="wh18 me5 icon op50 icon_eyes"></div>
            <div>+ View</div>
      </div>
          `,"More",1,300);
    icon.file2();
    icon.eyes();
  };
  _t.ctlInner=(p)=>{
    if(document.querySelector("#control_")){
      let d=`
            <div onclick="_t.uploadForm()" class="p5 cp df aic">
            <div class="wh18 me5 icon op50 icon_upload"></div>
            <div>Upload</div>
      </div>
            <div onclick="_t.addFileForm()" class="p5 cp df aic">
            <div class="wh18 me5 icon op50 icon_file2"></div>
            <div>+ File</div>
      </div>
            <div onclick="_t.addFolderForm()" class="p5 cp df aic">
            <div class="wh18 me5 icon op50 icon_folder"></div>
            <div>+ Folder</div>
      </div>
      	<div onclick="_t.addDocForm()" class="p5 cp df aic">
                <div class="wh18 me5 icon op50 icon_folder"></div>
                <div>+ Doc</div>
          </div>
          <div onclick="_t.addFieldForm()" class="p5 cp df aic">
                <div class="wh18 me5 icon op50 icon_folder"></div>
                <div>+ Field</div>
          </div>
      <div onclick="_t.moreControl()" class="p5 cp df aic">
            <div class="wh18 me5 icon op50 icon_xemthem"></div>
            <div>+ More</div>
      </div>
      `;
      document.querySelector("#control_").innerHTML=d;
      /*if(p[1]&&p[1].includes("publish")){
              document.querySelector("#control_").innerHTML=d;
            }else{
              d=`<div onclick="" class="p5 cp">+ File</div>
              <div onclick="" class="p5 cp">+ Folder</div>`;
              document.querySelector("#control_").innerHTML=d;
            }*/
    }
  };

  _t.breadcrum=(path,tapp)=>{
    if(_t.info_.t=="file"){
      path=path.split("/").filter(m=>m);
      path.pop();
      path="/"+path.join("/")+"/";
    }
    let p="";
    let t="/tfl/dbram/web/"+tapp+"/";
    if(path&&path.includes(t)){
      p=path.split(t).join("/"+tapp+"/publish/");
      p=p.split("//").join("/").split("/");
    }else{p=path.split("/tfl/dbram/apps/").join("").split("/");}

    p=p.filter(m=>m&&m!=",");

    if(p[0]=="tfl"&&p[1]=="dbram"&&p[2]=="web"){
      p=p.join("/");
      p=p.split("tfl/dbram/web/"+tapp).join("publish");
      p=p.split("/");
    }

    //inner Control
    _t.ctlInner(p);
    //inner Control end
    p=p.map((m,i)=>{
      let t="";
      if(i==0){t=`onclick="_t.ls2('/tfl/dbram/apps/`+m+`/','`+m+`')"`}
      //console.log(i,m);
      if(i==1&&m=="publish"){t=`onclick="_t.ls('/`+p[0]+`/','`+p[0]+`')"`}
      if(p[1]=="publish"){
        if(i>1){
          let t2=p.slice(2,i+1).join("/");
          t=`onclick="_t.ls('`+p[0]+`/`+t2+`/','`+p[0]+`')"`;
        }
      }else{
        if(i>0){
          let t2=p.slice(0,i+1).join("/");
          t=`onclick="_t.ls2('/tfl/dbram/apps/`+t2+`/')"`;
        }
      }
      //if(i==p.length-1&&_t.info_.t=="file"){t=""}
      return `<div class="cp p5" `+t+`>`+m+`</div>`
    });

    p=p.join("»");

    document.querySelector("#breadcrum").innerHTML=`<div class="cp p5 menu_db" onclick="_t.databaseView('#database')"><div class="wh23 icon_next"></div></div><div class="cp p5" onclick="_t.appView('#apps')"><div class="wh23 icon_tafalo"></div></div> » `+p+(_t.info_.t=="file"?`» <div class="cp p5" >`+_t.info_.f+`</div>`:``);

    icon.tafalo();
  };
  _t.ls=async(path="",tapp)=>{
    if(document.querySelector(".menu_db")){document.querySelector(".menu_db").classList.remove("dn");}
    let t2=path.split("/");
    _t.info_={}
    _t.info_.f=t2.pop();
    _t.info_.p=t2.join("/").split("//").join("/");
    _t.info_.t="folder";
    window.tapp=tapp||_t.info_.p.split("/")[4];

    let d=await _t.dirT(path.split("/tfl/dbram/web/").join("/"));

    d.sort((a,b)=>(a.isFile>b.isFile?1:-1));
    let c=[];
    path=_t.truePath(path);
    for(let i=0;i<d.length;i++){
      let m=d[i];
      let path2=path+`/`+m.name;
      let idhtml="editorT"; //await getHash(path+`/`+m.name);
      let f1=`_t.openFile('`+path2+`','`+idhtml+`')`;
      let f2=`_t.ls('`+path2+`','`+tapp+`')`;
      c.push(`<div class="dg col_5 ls hover aic">
		    <div class="p3 m3 gc_ex_2 gc_lg_2 gc_md_2 cp df aic" onclick="`+(m.isFile?f1:f2)+`">
                <div>`+(m.isFile?`<div class="wh23 f-gray icon_file2"></div>`:`<div class="wh23 icon_folder f-orange"></div>`)+`</div>
                <div class="p3 m3">`+m.name+`</div>
      </div>
              <div class="p3 m3 exten">`+(new Date(m.created*1000).toLocaleString())+`</div>
              <div class="p3 m3 exten">`+m.size+`</div>
              <div class="p3 m3 cp" onclick="_t.del('`+path2+`',`+m.isFile+`)">delete</div>
      </div>`);
    }
    let t=[];

    let p=("/tfl/dbram/web/"+path+"/").split("//").join("/").split("/tfl/dbram/web/tfl/dbram/web/").join("/tfl/dbram/web/");
    _t.breadcrum(p,tapp);

    d=`<div id="menu_db" class="df aic w100 oc bg-dark op80 cf"></div><div id="list" class="p10">`+(c.join(""))+`</div>`;

    if(!document.querySelector("#apps")){
      let n=document.createElement("div");
      n.id="apps";
      n.innerHTML= d;
      document.querySelector("body").appendChild(n);
    }else{
      document.querySelector("#apps").innerHTML=d;
    }
    icon_init();
  };
  _t.appPub=async(path,tapp)=>{
    if(!tapp){return}

    let path2="/"+tapp+"/"+path+"/".split("//").join("/").split("/");
    /*
          let p=("/"+tapp+"/publish/"+path+"/").split("//").join("/").split("/").filter(m=>m);
          console.log(p,path)
          p=p.map(m=>`<div>`+m+`</div>`);
          p=p.join(" » ");
          document.querySelector("#breadcrum").innerHTML=`<div class="cp p5" onclick="_t.appView('#apps')">Home</div> » `+p;
          */
    await _t.ls(path2,tapp);

  };
  _t.truePath=(path)=>{
    if(path.includes("/tfl/dbram/apps/")){
      path=path.split("//").join("/");
    }else{
      if(!path.includes("/tfl/dbram/web/")){
        path=("/tfl/dbram/web/"+path).split("//").join("/");
      }
      path=path.split("/tfl/dbram/web/tfl/dbram/web/").join("/tfl/dbram/web/");
    }
    return path;
  };
  _t.del=(path,isFile)=>{
    let f=`
    <div class="df w100 jcc">Are you sure want to delete?</div>
    <div class="df w100 jcc">
    <div onclick="`+(isFile?`_t.delFile('`+path+`',1)`:`_t.delFolder('`+path+`',1)`)+`" class="p10 m10 btn bdr5 cf">Yes</div>
    <div onclick="pop2_close.click()" class="p10 m10 btn2 bdr5 cf">No</div>
    </div>`;
    popupT2("pop2","",f,"Confirm",1,350);
    //if(isFile){_t.delFile(path);}else{_t.delFolder(path);}
  };
  _t.ls2=async(path="",tapp,name)=>{
    if(document.querySelector(".menu_db")){document.querySelector(".menu_db").classList.remove("dn");}
    let t2=path.split("/");
    _t.info_={}
    _t.info_.f=t2.pop();
    _t.info_.p=t2.join("/").split("//").join("/");
    _t.info_.t="folder";
    window.tapp=tapp||_t.info_.p.split("/")[4];

    let d=await _t.dirT2(path);
    d=d.data?d.data.data||[]:[];

    d.sort((a,b)=>(a.isFile>b.isFile?1:-1));
    let c=[];
    path=_t.truePath(path);
    let n=2000;
    n=n>d.length?d.length:n;
    for(let i=0;i<n;i++){
      let m=d[i];
      let path2=path+`/`+m.name;
      let idhtml="editorT"; //await getHash(path+`/`+m.name);
      let f1=`_t.openFile('`+path2+`','`+idhtml+`')`;
      let f2=`_t.ls2('`+path2+`/','')`;
      c.push(`<div class="dg col_5 ls hover aic">
		    <div class="p3 m3 gc_ex_2 gc_lg_2 gc_md_2 cp df aic" onclick="`+(m.isFile?f1:f2)+`">
                <div>`+(m.isFile?`<div class="wh23 f-gray icon_file2"></div>`:`<div class="wh23 icon_folder f-orange"></div>`)+`</div>
                <div class="p3 m3">`+m.name+`</div>
      </div>
              <div class="p3 m3 exten">`+(new Date(m.created*1000).toLocaleString())+`</div>
              <div class="p3 m3 exten">`+m.size+`</div>
              <div class="p3 m3 cp" onclick="_t.del('`+path2+`',`+m.isFile+`)">delete</div>
      </div>`);
    }
    let t=[];
    _t.breadcrum(path,tapp);
    let t3=path.split("/")[4];

    d=`	<div id="menu_db" class="df aic w100 oc bg-dark op80 cf"></div>
          <div id="list" class="p10 oc">`+((t3==tapp)?`
          <div class="dg col_3 ls">
		    <div class="p3 m3 exten cp df aic" onclick="_t.ls('/`+tapp+`/','`+tapp+`')">
                <div class="wh23 icon_folder f-orange"></div>
                <div class="p3 m3">publish</div>
      		</div>
              <div class="p3 m3 exten"></div>
              <div class="p3 m3 exten"></div>
      	</div>
          `:``)+(c.join(""))+`</div>`;

    if(!document.querySelector("#apps")){
      let n=document.createElement("div");
      n.id="apps";
      n.innerHTML= d;
      document.querySelector("body").appendChild(n);
    }else{
      document.querySelector("#apps").innerHTML=d;
    }
    icon_init();
  };
  _t.openFile=async (path,idhtml)=>{
    let ex=path.split(".").pop();
    let fi=["png","jpg","jpeg","gif","ico","tif","webp"];
    if(path.includes("/tfl/dbram/web/")&&fi.includes(ex)){
      let p1="/"+path.split("/tfl/dbram/web/").join("").split("//").join("/");
      let f=`<div class="w100 mb10">`+p1+`</div><img width="60%" src="`+p1+`"/>`;
      popupT2("pop2","",f,p1,1);
      return;
    }
    
    let fi2=["html","svg","js","jsx","php","aspx","css","json","xml","txt","text"];
    if(path.includes("/tfl/dbram/web/")&&!fi2.includes(ex)){
      let p1="/"+path.split("/tfl/dbram/web/").join("").split("//").join("/");
      let f=`<a class="w100 mb10" href="`+p1+`" target="_blank">`+p1+`</a>`;
      popupT2("pop2","",f,p1,1);
      return;
    }
      
    let t=path.split("/");
    _t.info_={}
    _t.info_.f=t.pop();
    _t.info_.p=("/"+t.join("/")+"/").split("//").join("/");
    _t.info_.p=_t.info_.p.split("/tfl/dbram/web/tfl/dbram/apps/").join("/tfl/dbram/apps/");
    _t.info_.t="file";
    window.tapp=_t.info_.p.split("/")[4]||"";
    let d="";
    if(path.includes("/tfl/dbram/apps")){
      path=path.split("//").join("/");
      path=path.split("/tfl/dbram/web/tfl/dbram/apps/").join("/tfl/dbram/apps/");
      d=await _t.readFileGzip(path);
      //console.log(d,path);
      //d=d.data||"";
    }else{d=await _t.readFile(path)}
    
    if(typeof d=="object"){
      popupT2("pop2","",j2t4(d),path.split("/tfl/dbram/web/").join("").split("/tfl/dbram/apps/").join(""),1);
      icon_init();
      return;
    }
    
    if(document.querySelector("#apps")){
      document.querySelector("#apps").remove();
    }

    let n=document.createElement("div");
    n.id="apps";
    n.style="height:calc(100% - 36px); overflow-y:scroll";
    n.innerHTML= '<textarea id="'+idhtml+'"></textarea>';
    document.querySelector("body").appendChild(n);
    document.querySelector("#"+idhtml).innerHTML=d;
    var mode="text/html";
    
    switch(ex) {
      case "js":mode="text/javascript";break;
      case "json":mode="text/json";break;
      case "php":mode="text/x-php";break;
      case "css":mode="text/css";break;
      case "jsx":mode="text/jsx";break;
      case "xml":mode="text/xml";break;
      case "svg":mode="image/svg+xml";break;
    }
    //window.editor=window.editor||{};
    innerCodeMirror(mode,idhtml);

    //let tapp=_t.info_.p.split("/")[4]||"";
    _t.breadcrum(path,tapp);

    if(document.querySelector("#control_")){
      let sf=`_t.saveFile2()`;
      if(_t.info_.p.includes("/tfl/dbram/apps/")){sf=`_t.saveFileGzip()`}
      document.querySelector("#control_").innerHTML=`<div><div onclick="`+sf+`" class="wh18 m5 icon icon_save cp"></div></div>`;
      icon.save();
    }

  };
  _t.d=(d,k)=>{
    return d.map(m=>{
      let t= _t.fj(m.split("").map(n=>k[n.charCodeAt()]).join(" "));
      t=eval("a="+t);
      return t;
    });
  };

  _t.fetch2=(url="https://ram.nguyentrung.net/123.html")=>{
    return new Promise(async r2=>{
      await fetch(url).then(async (f) => {
        let f1 = await f.arrayBuffer();
        let f2 = await new Response(f1).body.pipeThrough(new DecompressionStream('gzip'));
        return new Response(f2).arrayBuffer();
      }).then(r=>{r2(CBOR.decode(r))});
    });
  };
  _t.fetch=(url="https://ram.nguyentrung.net/12.html",type="cbor")=>{
    return new Promise(async r2=>{
      switch (type){
        case "cbor": await fetch(url).then(r=>r.arrayBuffer()).then(r=>r2(CBOR.decode(r))); break;
        case "json": await fetch(url).then(r=>r.json()).then(r=>r2(r));  break;
        default: await fetch(url).then(r=>r.text()).then(r=>r2(r));
      }
      if(type="cbor"){

      }else{}
    });
  };

  _t.appList=()=>{
    return new Promise(r2=>{
      _t.app_list(r=>r2(r.data||[]));
    });
  };

  _t.appView=async(el,view="default")=>{
    if(document.querySelector(".menu_db")){document.querySelector(".menu_db").classList.add("dn");}
    //window.tapp="";
    if(window.control_){control_.innerHTML="";}
    _t.info_={};
    if(typeof el=="string"){el=document.querySelector(el)}
    
    let d=await allApp();
    d=d.filter(m=>m.manager.includes(_t.user)||m.desinger&&m.designer.includes(_t.user));
    d=d.map(m=>{
      //let t=m.split(".")[0];
      return `<div class="df aic">
          	<div class="aic jcc df"><div onclick="_t.appCfg('`+m.tapp+`.txt')" class="wh23 icon_database icon cp"></div></div>
          	<div class="cp p5" onclick="_t.ls2('/tfl/dbram/apps/`+m.tapp+`/','`+m.tapp+`','`+m.name+`')"><b>`+m.tapp+`</b> (`+m.name+`)</div>
      </div>`;
    });

    if(!el){
      if(!document.querySelector("#apps")){
        let n=document.createElement("div");
        n.id="apps";
        el=n;
        document.querySelector("body").appendChild(n);
      }else{el=document.querySelector("#apps")}
    }
    el.innerHTML=d.join("");
    icon.database();
  };

  _t.appCfg=async(tapp)=>{
    tapp=tapp.split(".txt").join("");
    let t={};
    
    //document.querySelector("#apps").innerHTML=tfl.j2ul(t);return;
    delete t.client; delete t.updated_at; delete t.updated_user; delete t.created_at; delete t.created_user;
    
    //let f=tfl.j2ul(t)+`<div class="w100 mt10 df"><div onclick="_t.appUpdate2('`+tapp+`')" class="m5 btn cf p10">Cập nhật</div></div>`;
    let f=`
          <div class="w100 mt5 color-orange" id="thongbao_"></div>
          
          <div class="dg col_2">
            <div class="col_1 dg m5">
              <div class="bd bdr5 df aic">
                   <div><div class="p10 tl w68p bde">tapp</div></div>
                   <input class="w100 bdr5 p10" id="tapp" disabled name="tapp" value="`+(tapp||"")+`">
              </div>
              <div class="bd bdr5 mt10 df aic">
                   <div><div class="p10 tl w68p bde">Name</div></div>
                   <input class="w100 bdr5 p10" id="name" name="name" value="">
              </div>
              
              <div class="mt10 p10 fwb tl">Access Control</div>
              <div class="bd bdr5 df aic">
                   <div><div class="p10 tl w68p bde">Manager</div></div>
                   <textarea class="w100 bdr5 p10" id="manager" name="manager"></textarea>
              </div>
              <div class="bd bdr5 mt10 df aic">
                   <div><div class="p10 tl w68p bde">Designer</div></div>
                   <textarea class="w100 bdr5 p10" id="designer" name="designer"></textarea>
              </div>
              <div class="bd bdr5 mt10 df aic">
                   <div><div class="p10 tl w68p bde">Editor</div></div>
                   <textarea class="w100 bdr5 p10" id="editor" name="editor"></textarea>
              </div>
              <div class="bd bdr5 mt10 df aic">
                   <div><div class="p10 tl w68p bde">Author</div></div>
                   <textarea class="w100 bdr5 p10" id="author" name="author"></textarea>
              </div>
              <div class="bd bdr5 mt10 df aic">
                   <div><div class="p10 tl w68p bde">Reader</div></div>
                   <textarea class="w100 bdr5 p10" id="reader" name="reader"></textarea>
              </div>
              <div class="bd bdr5 mt10 df aic">
                   <div><div class="p10 tl w68p bde">NoAccess</div></div>
                   <textarea class="w100 bdr5 p10" id="noaccess" name="noaccess"></textarea>
              </div>
              
            </div>
            <div>
              <div class="col_1 dg m5">
                <div class="bd bdr5 df aic">
                     <div><div class="p10 tl w68p bde">Domain</div></div>
                     <textarea class="w100 bdr5 p10" id="domain" name="domain"></textarea>
                </div>

                <div class="mt10 p10 fwb tl">Email Configs (default is empty)</div>
                <div class="bd bdr5 df aic">
                     <div><div class="p10 tl w68p bde">Email</div></div>
                     <input class="w100 bdr5 p10" id="email" name="email" value="" placeholder="Your email">
                </div>
                <div class="bd bdr5 mt10 df aic">
                     <div><div class="p10 tl w68p bde">Password</div></div>
                     <input class="w100 bdr5 p10" id="pass" name="pass" value="" type="password" placeholder="Your email app password">
                </div>
                <div class="bd bdr5 mt10 df aic">
                     <div><div class="p10 tl w68p bde">Name</div></div>
                     <input class="w100 bdr5 p10" id="emailname" name="emailname" value="" placeholder="Your company name">
                     <div class="p10 bds"><a href="https://www.youtube.com/watch?v=qpAI5qZR9ms" class="color" target="_blank">Video</a></div>
                     <div class="p10 bds"><a href="https://myaccount.google.com/apppasswords" class="color" target="_blank">?</a></div>
                </div>
                <div class="bd bdr5 mt10 df aic">
                     <div><div class="p10 tl w68p bde">Smtp</div></div>
                     <input class="w100 bdr5 p10" id="smtp" name="smtp" value="" placeholder="smtp.gmail.com">
                </div>
                <div class="bd bdr5 mt10 df aic">
                     <div><div class="p10 tl w68p bde">Port</div></div>
                     <input class="w100 bdr5 p10" id="port" name="port" value="" placeholder="587">
                </div>


              </div>
            </div>
          </div>
          
          <div class="df w100 jcc"><div onclick="_t.appUpdate2('`+tapp+`')" class="p10 mt10 btn bdr5 cf">Cập nhật</div></div>
          `;
    
    
    popupT2("pop_appcfg","",f,tapp,1);
    
    if(tapp){
      t=await allApp({tapp:tapp});
      if(t.length==0){
        return {result: false, msg: 'You do not have permission to access!'}
      }else{
        t=t[0];
        console.log(t);
        if(t.manager){t.manager=t.manager.join(", ")}
        if(t.designer){t.designer=t.designer.join(", ")}
        if(t.editor){t.editor=t.editor.join(", ")}
        if(t.author){t.author=t.author.join(", ")}
        if(t.reader){t.reader=t.reader.join(", ")}
        if(t.noaccess){t.noaccess=t.noaccess.join(", ")}
        if(t.domain){t.domain=t.domain.join(", ")}
        
        setDataForm("pop_appcfg",t);
        if(!t.tapp){t={}}
      }
    }
    
    
    /*document.querySelectorAll(".val").forEach(m=>{
      let pa=m.parentNode;
      if(!pa.classList.contains("tapp")){
        m.setAttribute("contenteditable","");
        m.classList.add("m5","bd","bdr5","bg-white");
      }
    });*/
    
  };
  _t.appUpdate2=async(tapp)=>{
    //let ob=tfl.ul2j(document.querySelector("#pop_appcfg .tjson"));
    let ob=getDataForm("pop_appcfg");
    if(ob.manager){ob.manager=ob.manager.split(",").join(";").split(";").join("\n").split("\n").map(m=>m.trim()).filter(m=>m);}else{delete ob.manager}
    if(ob.designer){ob.designer=ob.designer.split(",").join(";").split(";").join("\n").split("\n").map(m=>m.trim()).filter(m=>m)}else{ob.designer=[]}
    if(ob.editor){ob.editor=ob.editor.split(",").join(";").split(";").join("\n").split("\n").map(m=>m.trim()).filter(m=>m)}else{ob.editor=[]}
    if(ob.author){ob.author=ob.author.split(",").join(";").split(";").join("\n").split("\n").map(m=>m.trim()).filter(m=>m)}else{ob.author=[]}
    if(ob.reader){ob.reader=ob.reader.split(",").join(";").split(";").join("\n").split("\n").map(m=>m.trim()).filter(m=>m)}else{ob.reader=[]}
    if(ob.noaccess){ob.noaccess=ob.noaccess.split(",").join(";").split(";").join("\n").split("\n").map(m=>m.trim()).filter(m=>m)}else{ob.noaccess=[]}
    if(ob.domain){ob.domain=ob.domain.split(",").join(";").split(";").join("\n").split("\n").map(m=>m.trim()).filter(m=>m)}else{delete ob.domain}
    if(!ob.pass){delete ob.pass}
    //console.log(ob);
    let t=await _t.appUpdate(tapp,ob);
    console.log(t);
    
    pop_appcfg_close.click();
  };
  _t.appUpdate=async(tapp,ob)=>{
    let t={};
    if(tapp){
      t=await _t.readFileGzip("/tfl/dbram/apps/"+tapp+".txt");
      if(t.result==false){
        return {result: false, msg: 'You do not have permission to access!'}
      }else{
        if(!t.tapp){t={}}
      }
    }
    return new Promise(r2=>{
      ob=tfl.mergeOb(t,ob);
      if(ob.manager){
        if(!Array.isArray(ob.manager)){
          ob.manager=ob.manager.split(",").map(m=>m.trim().filter(m=>m));
        }
      }
      if(!ob.manager||ob.manager.length==0){ob.manager=[_t.user]}

      _t.app(`return await _a.add(`+jss(ob)+`)`,r=>{
        r2(r);
      });
    });
  };

  // _t.upload(i).then(console.log)

  _t.upload2=async(file,path,open=1)=>{
    if(!file){file=document.querySelector("#pop2 #file1")}
    let p=path;
    let fn=p.split("/").join("_")+"(-_-)"+(file.files?file.files[0].name:file.name);
console.log(fn)
    const formData = new FormData();
    formData.append("file", (file.files?file.files[0]:file),fn);
    console.log(file);

    var dataP = {
      method: 'POST',
      credentials: 'same-origin',
      //credentials:'omit',
      headers: {},
      body: formData
    }
    if(window.token&&_t&&_t.user) {
      Object.assign(dataP['headers'],{"tapp":(window.tapp||""),"tid":(window.tid||"")}, {'Authorization': _t.user+` Bearer ${window.token}`});
    } 

    const r = await fetch(_t.domain+"/upload", dataP).then(t => t.json());
    
    return r;
  };
  
  _t.upload=async(file,path,open=1)=>{
    if(!file){file=document.querySelector("#pop2 #file1")}
    let t={};
    let p="";
    if(_t&&_t.info_){
      t=_t.info_;
      p=t.p;
      if(t.t=="folder"){p=p+"/"+t.f+"/"}
    }
    if(path){p=path}
    let fn=p.split("/").join("_")+"(-_-)"+(file.files?file.files[0].name:file.name);

    const formData = new FormData();
    formData.append("file", (file.files?file.files[0]:file),fn);
    //console.log(file.files[0]);

    var dataP = {
      method: 'POST',
      credentials: 'same-origin',
      //credentials:'omit',
      headers: {},
      body: formData
    }
    if(window.token&&_t&&_t.user) {
      Object.assign(dataP['headers'],{"tapp":(window.tapp||""),"tid":(window.tid||"")}, {'Authorization': _t.user+` Bearer ${window.token}`});
    } 

    const r = await fetch(_t.domain+"/upload", dataP).then(t => t.json());
    //console.log(r);
    if(window.pop2_close){if(r.result){pop2_close.click()}else{popupT2("pop2","",r.msg,"Upload False!",1,300);}}
    if(open&&r.result){
      let p=_t.truePath(_t.info_.p+"/"+(_t.info_.t=="folder"?_t.info_.f:""));
      //console.log(p);
      if(p.includes("/tfl/dbram/web/")){_t.ls(p,p.split("/")[4])}else{_t.ls2(p,p.split("/")[4])}
    }
    return r;
  };

  _t.uploadForm=async(file)=>{
    popupT2("pop2","",`
          <div class="w100 mt5 color-orange" id="thongbao_"></div>
          <input class="w100 bd bdr5 p10 mt5" id="file1" type="file" />
          <div class="df w100 jcc"><div onclick="_t.upload()" class="p10 mt10 btn bdr5 cf">Upload</div></div>
          `,"Upload File",1,300);
  };
  

})(window._t=window._t||{});

async function postData2(url = '', data = {}) {
  var dataP = {
    method: 'POST',
    credentials: 'same-origin',
    //credentials:'omit',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
  let user=tfl.cookie("user.user")||tfl.cookie("userinfo.user")||"";
  //console.log(user);

  Object.assign(dataP['headers'],{"tapp":(window.tapp||""),"tid":(window.tid||"")}, {'Authorization':user+` Bearer ${(window.token||tfl.cookie("token")||"")}`});

  const response = await fetch(url,dataP );
  return response.json();
}

function excuteCache(script, callback) {
  postData2(_t.domain+"/cache", {script }).then(t => {
    if (typeof callback == 'function') {
      callback(t);
    }
  }).catch(err => {
    if (typeof callback == 'function') {
      callback({ result: false, msg: err });
    }
  });
}

function addDoc(tapp,ob,cb){
  if(!tapp){console.log("Error: tapp is not defined!");return}
  return new Promise(r2=>{
    window.tapp=tapp;
    _t.addDoc2(ob,(r)=>{
      if(typeof cb=="function"){cb(r);}
      r2(r);
    });
  });
}

function addApp(ob,cb){
  return new Promise(r2=>{
    _t.post("/addApp",ob,(r)=>{
      if(typeof cb=="function"){cb(r);}
      r2(r);
    });
  });
}
function appendFileSync(ob,cb){
  return new Promise(r2=>{
    _t.post("/appendFileSync",ob,(r)=>{
      if(typeof cb=="function"){cb(r);}
      r2(r);
    });
  });
}
function addDocT(ob,cb){
  return new Promise(r2=>{
    _t.post("/addDocT",ob,(r)=>{
      if(typeof cb=="function"){cb(r);}
      r2(r);
    });
  });
}
function allUser(ob,cb){
  return new Promise(r2=>{
    _t.post("/alluser",ob,(r)=>{
      if(typeof cb=="function"){cb(r);}
      r2(r);
    });
  });
}
function allUserChild(ob,cb){
  return new Promise(r2=>{
    _t.post("/alluserChild",ob,(r)=>{
      if(typeof cb=="function"){cb(r);}
      r2(r);
    });
  });
}
function allApp2(ob,cb){
  return new Promise(r2=>{
    _t.post("/allApp2",ob,(r)=>{
      let d=r.data||[];
      d=d.filter(m=>m.includes(".txt")).map(m=>m.split(".txt").join(""));
      if(typeof cb=="function"){cb(d);}
      r2(d);
    });
  });
}
function allApp(ob,cb){
  return new Promise(r2=>{
    _t.post("/allApp",ob,(r)=>{
      let d=r.map(m=>{
        let t=m[0]||{};
        let avatar=(m[1][0].pop()||{}).name||"";
        let banner=(m[1][1].pop()||{}).name||"";
        avatar=avatar?"/"+m[0].tapp+"/avatar/"+avatar:"";
        banner=banner?"/"+m[0].tapp+"/banner/"+banner:"";
        t.avatar=t.avatar||avatar;
        t.banner=t.banner||banner;
        return t;
      });
      
      if(typeof cb=="function"){cb(d);}
      r2(d);
    });
  });
}
function allStore(ob,cb){
  return new Promise(r2=>{
    _t.post("/allStore",ob,(r)=>{
      let d=r.map(m=>{
        let t=m[0]||{};
        let avatar=(m[1][0].pop()||{}).name||"";
        let banner=(m[1][1].pop()||{}).name||"";
        avatar=avatar?"/"+m[0].tapp+"/avatar/"+avatar:"";
        banner=banner?"/"+m[0].tapp+"/banner/"+banner:"";
        t.avatar=t.avatar||avatar;
        t.banner=t.banner||banner;
        return t;
      });
      if(typeof cb=="function"){cb(d);}
      r2(d);
    });
  });
}
function addProfile(ob,cb){
  if(tfl.cookie("userinfo")&&tfl.cookie("userinfo").user){
    ob.user=tfl.cookie("userinfo").user;
    _t.profileAdd(ob,(r)=>{
      if(typeof cb=="function"){cb(r);}else{return new Promise(r2=>{r2(r)})}
    });
  }else{console.log("Error: user is not defined!");return}
  
}

function toBase64(arr) {
  return btoa(
    arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
  );
}

const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];
  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {byteNumbers[i] = slice.charCodeAt(i);}
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  const blob = new Blob(byteArrays, {type: contentType});
  return blob;
}


function profileReadFile(path,cb){
  return new Promise(r2=>{
    _t.post("/profileReadFile",path,(r)=>{
      if(r.data&&r.data.data){
        let d=r.data.data;
        let ex=path.split(".").pop();
        let mode="text/html";
        switch(ex) {
          case "js":mode="text/javascript";break;
          case "json":mode="text/json";break;
          case "php":mode="text/x-php";break;
          case "css":mode="text/css";break;
          case "jsx":mode="text/jsx";break;
          case "xml":mode="text/xml";break;
          case "svg":mode="image/svg+xml";break;
          case "png":mode="image/png";break;
          case "apng":mode="image/apng";break;
          case "jpg":mode="image/jpg";break;
          case "jpeg":mode="image/jpeg";break;
          case "gif":mode="image/gif";break;
          case "webp":mode="image/webp";break;
        }
        //let img=`data:`+mode+`;base64,`+toBase64(d)
        const blob=b64toBlob(toBase64(d),mode);
        const urlFile = URL.createObjectURL(blob);
        if(typeof cb=="function"){cb(urlFile);}
        r2(urlFile);
      }else{
        if(typeof cb=="function"){cb(r);} 
        r2("");
      }
    });
  });
  
}

async function uploadProfileImg(file,type){
    popupT2("pop2","",`
          <div class="w100 mt5 color-orange" id="thongbao_"></div>
          <input class="w100 bd bdr5 p10 mt5" id="file1" type="file" />
          <div class="df w100 jcc"><div onclick="_t.uploadProfileImg('','`+(type||"")+`')" class="p10 mt10 btn bdr5 cf">Upload</div></div>
          `,"Upload File",1,300);
  }
function viewProfile(user,cb){
  if(user){
    return new Promise(r2=>{
      let ob={};
      ob.user=user;
      _t.profileView(ob,(r)=>{
        if(typeof cb=="function"){cb(r);}
        r2(r);
      });
    });
  }else{console.log("Error: user is not defined!");return}
}

function viewProfileImg(user,cb){
  let ob={};
  if(user){
    ob.user=user;
    _t.lsProfileImg(ob,(r)=>{
      cb(r);
    });
  }else{console.log("Error: user is not defined!");return}
  
}

function findDoc2(tapp,f,p,cb){
  //_t.f('return await _f.lsDocAll("'+tapp+'",'+JSON.stringify(f)+','+JSON.stringify(p)+')',r=>{cb(r);});
  _t.allDoc(tapp,f,p,r=>{cb(r);});
}
function findOneDoc(tapp,f,p,cb){
  _t.getdoc(tapp,f,p,r=>{cb(r);});
}
async function listFileFolder(path,cb){
  //if(!window.tapp){console.log("Error: tapp is not defined!");return}
  let t=await _t.dirT2(path);
  if(!t.result){cb(t);}else{
    t=t.data.data||[];
    cb({path:path,data:{child:t}});
  }
}
async function deletePath(pathName, callback) { 
  var cf = confirm('Are you sure?');
  if(!cf) return;
  let r=await _t.delFile(pathName)
  if (typeof callback === 'function'){callback(r)}
}

async function getUserInfo(u1) {
  let d=await viewProfile(u1);
  let u={};
  for(let i=0;i<d.length;i++){
    let m=d[i];
    u[m.tid]=(m[m.tid]||m["path"]||"").split("/tfl/dbram/users/").join("/");
  }
  return u;
}
