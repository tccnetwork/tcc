window.trans_=window.trans_||{};

window.addEventListener("offline",()=>{
  window.offline=true;
  console.log("offline",offline);
  if(!navigator.onLine){
    //popupT2("pop23","","Unable to connect to the internet. Please check your internet connection.","Network error",1);
  }
});
window.addEventListener("online",()=>{
  window.offline=false;
  console.log("offline",offline);
  //popupT2("pop23","","Unable to connect to the internet. Please check your internet connection.","Network error",1);

});
window.addEventListener("load",async()=>{
  await initTCC();

  appenChildT("body","div","header_sub","");
  document.querySelector("#header_sub").innerHTML=window.header;
  initMenu();

});
async function initTCC(){
  if(!navigator.onLine||window.offline){
    popupT2("pop23","","Unable to connect to the internet. Please check your internet connection.","Network error",1);
    return;
  }else{

    if(tfl.cookie("user.user")){
      window.token=tfl.cookie("token");
      document.querySelector(".action").classList.remove("dn");
      await getRefs();
      let t=await getTrans5();
      //console.log(t);
      t=t[tfl.cookie("user.user")][t[tfl.cookie("user.user")].length-1];
      t=Number(new Date(t));
      await showMintClick(t);
      ren_trans_checkin();
      document.querySelector(".total_booster").innerHTML=circleSecurity*100;
      document.querySelector(".ref_mining").innerHTML=fttoday.length;
      document.querySelector(".total_ref").innerHTML=refs.length;
      document.querySelector(".life_step").innerHTML=mySpeed.toFixed(2);
      if(trans_[tfl.cookie("user.user")].length>0){calcC();}
    }else{
      document.querySelector(".action").classList.add("dn");
      ntc.loginAppF();
    }

  }
}
async function calcC(){
  if(window.loading1_close){loading1_close.click()}
  window.trans_checkin=window.trans_checkin||await db2.find({},{});
  let mt=[];
  let ft=[];
  let u=tfl.cookie("user.user")||"";
  if(!u){return}
  let fttoday=[];
  for(let i=0;i<trans_checkin.length;i++){
    let m=trans_checkin[i];
    if(m.user==u){mt.push(m)}else{
      ft.push(m);
      if(Date.now()-m.timestamp<86400000){fttoday.push(1)}
    }
  }
  let tr=[];
  let sc=0.2;
  mt.sort((a,b)=>(a.timestamp>b.timestamp?-1:1));
  ft.sort((a,b)=>(a.timestamp>b.timestamp?-1:1));
  let speed=currentSpeed;
  let tong=0;
  let tonghn=0;
  for(let i=0;i<mt.length;i++){
    if(mt[i].timestamp<=Number(new Date('2025-03-28T23:59:59Z'))){speed=1.6;}else{speed=0.8;}
    let sc1=refs.filter(n=>n.created_at<=mt[i].timestamp);
    sc=(sc1.length||1)*0.2;
    sc=sc>1?1:sc;
    let a=(speed*sc*24);
    if(i==0){tonghn=tonghn+a;window.mystarttoday=mt[0].timestamp}else{tong=tong+a;}
    for(let j=0;j<ft.length;j++){
      let cd=86400000-Math.abs(mt[i].timestamp-ft[j].timestamp);
      if(cd>0){
        let sc2=refs.filter(n=>n.created_at<=ft[j].timestamp);
        sc=(sc2.length||1)*0.2;
        sc=sc>1?1:sc;
        cd=cd/3600000;
        let a1=(speed*sc*cd*0.1);
        if(i==0){tonghn=tonghn+a1;}else{tong=tong+a1;}
      }else{}
    }
  }
  window.fttoday=fttoday;
  window.currentMining=fttoday.length;
  window.circleSecurity=window.refs.length*0.2;
  circleSecurity=circleSecurity>1?1:circleSecurity;

  if(Date.now()-mystarttoday<86400000){
    let shn=tonghn/86400;
    //let hn=(Date.now()-mystarttoday)*mySpeed/3600000;
    let hn=((Date.now()-mystarttoday)/1000)*shn;
    tong=tong+hn;

    if(window.CountT){clearInterval(window.CountT)}
    window.CountT=setInterval(()=>{
      tong=tong+shn;
      let tongs=String(tong.toFixed(5)).split(".").join(",").split(",");
      document.querySelector(".coin_int").innerHTML=tongs[0];
      document.querySelector(".coin_float").innerHTML=tongs[1];
    },1000);

  }

  document.querySelector(".total_booster").innerHTML=parseInt(circleSecurity*100);
  window.mySpeed=window.currentSpeed*circleSecurity+fttoday.length*currentSpeed*circleSecurity*0.1;
  document.querySelector(".life_step").innerHTML=mySpeed.toFixed(2);
  document.querySelector(".step_unit").innerHTML="TCC/h";
  document.querySelector(".ref_mining").innerHTML=fttoday.length;
  document.querySelector(".total_ref").innerHTML=refs.length;
  if(refs.length>100){document.querySelector(".total_ref").parentNode.classList.add("fs12")}


  let tongs=String(tong.toFixed(5)).split(".").join(",").split(",");
  document.querySelector("#m-async").innerHTML=`
    <img class="me3" height="18" width="18" src="https://tcc-coin.com/svg/logo_w.svg">
    <span class="coin_int">`+tongs[0]+`</span>.<span class="fs14 coin_float">`+tongs[1]+`</span>
  `;

}
function calcC2(){
  let mt=[];
  let ft=[];
  let u=tfl.cookie("user.user")||"";
  if(!u){return}
  let fttoday=[];
  for(let i=0;i<trans_checkin.length;i++){
    let m=trans_checkin[i];
    if(m.user==u){mt.push(m)}else{
      ft.push(m);
      if(Date.now()-m.timestamp<86400000){fttoday.push(1)}
    }
  }

  let th=`<tr class="bg-gray cf"><th>Date</th><th>User</th><th>(h)</th><th>Rate</th><th>CS</th><th>TCC</th></tr>`;
  let tr=[];
  let sc=0.2;
  mt.sort((a,b)=>(a.timestamp>b.timestamp?-1:1));
  ft.sort((a,b)=>(a.timestamp>b.timestamp?-1:1));
  let speed=currentSpeed;
  let tong=0;
  let tonghn=0;
  for(let i=0;i<mt.length;i++){
    if(mt[i].timestamp<=Number(new Date('2025-03-28T23:59:59Z'))){speed=1.6;}else{speed=0.8;}
    let sc1=refs.filter(n=>n.created_at<=mt[i].timestamp);
    sc=(sc1.length||1)*0.2;
    sc=sc>1?1:sc;
    let a=(speed*sc*24);
    if(i==0){tonghn=tonghn+a;window.mystarttoday=mt[0].timestamp}else{tong=tong+a;}
    if(i<3){
      let d=new Date(mt[i].timestamp).toLocaleDateString()+" "+new Date(mt[i].timestamp).toLocaleTimeString();
      tr.push(`<tr class="fwb `+(i==0?`bg-main`:`bg-light`)+`"><td>`+d+`</td><td class="tc">`+mt[i].user+`</td><td class="tc">24</td><td class="tc">`+speed+`</td><td class="tc">`+parseInt(sc*100)+`%</td><td class="color-green tr">+`+a.toFixed(3)+`</td></tr>`);
    }
    for(let j=0;j<ft.length;j++){
      let cd=86400000-Math.abs(mt[i].timestamp-ft[j].timestamp);
      if(cd>0){

        let sc2=refs.filter(n=>n.created_at<=ft[j].timestamp);
        sc=(sc2.length||1)*0.2;
        sc=sc>1?1:sc;
        cd=cd/3600000;
        let a1=(speed*sc*cd*0.1);
        if(i==0){fttoday.push(ft[j]);tonghn=tonghn+a1;}else{tong=tong+a1;}
        if(i<3){
          let d=new Date(ft[j].timestamp).toLocaleDateString()+" "+new Date(ft[j].timestamp).toLocaleTimeString();
          tr.push(`<tr class="`+(i==0?`bg-main`:`bg-light`)+`"><td>`+d+`</td><td class="tc">`+ft[j].user+`</td><td class="tc">`+cd.toFixed(2)+`</td><td class="tc">`+speed+`</td><td class="tc">`+parseInt(sc*100)+`%</td><td class="color-green tr">+`+a1.toFixed(3)+`</td></tr>`);
        }
      }else{}
    }
  }
  //console.log(tong,tonghn);
  let tf=`<tr><th></th><th></th><th></th><th></th><th></th><th class="color-orange">`+(tong+tonghn).toFixed(3)+`</th></tr>`;
  let code=`
  <div class="fs12">
  	<div class="df aic">
    	<div><div class="wh18 bdr5 bg-main"></div></div>
        <div class="m5 tl">Currently mining</div>
    </div>
    <div class="w100 tl cg lh100">(The estimated number of coins to be received at the end of the session.)</div>
    <div class="df aic mt5">
    	<div class="wh18 bdr5 bg-light"></div>
        <div class="m5">Number of coins received</div>
    </div>
  </div>
  <table class="w100 mt10 fs12">`+th+tr.join("")+`</table>
  <div class="mt10 cg lh100 fs12">We will soon introduce a feature that allows you to track and review all your transactions, as well as those of your team.</div>
  `;
  popupT2("trans123","",code,"Recent transactions",1);

}
function ren_trans_checkin(){
  let d=window.trans_||{};
  let k=Object.keys(d);
  window.trans_checkin=[];

  for(let i=0;i<k.length;i++){
    let d1=d[k[i]];
    for(let j=0;j<d1.length;j++){
      let m=d1[j];
      let o={};
      o.user=k[i];
      o.tid=o.user+"_"+m.split("T")[0];
      o.timestamp=Number(new Date(m));
      window.trans_checkin.push(o);

    }
  }
  let u=tfl.cookie("user.user");
  window.fttoday=trans_checkin.filter(m=>(Date.now()-m.timestamp)<86400000&&m.user!=u);
  window.mySpeed=window.currentSpeed*circleSecurity+fttoday.length*currentSpeed*circleSecurity*0.1;
  return window.trans_checkin;
}
async function getRefs(){
  if(tfl.cookie("user.user")){
    window.refs=await _t.call("tcc_referral",{tapp: "tcc",ref:(tfl.cookie("user.ref")||""), user:(tfl.cookie("user.user")||"")});
    window.refs=window.refs.data||[];
    window.circleSecurity=window.refs.length*0.2;
    circleSecurity=circleSecurity>1?1:circleSecurity;

    if(tfl.cookie("user.ref")){refs.push({user:tfl.cookie("user.ref"),ref:"",created_at:0});}
  }
}
function showSecurityCircle(){
  return;
  try{
    let code=window.refs.map(m=>`<div class="dg"><div class="col-2 dg bdb aic">
        	<div class="tl p10">`+m.user+`</div>
        	<div class="tr p10 aic df ml-auto">
            	<img class="me3" height="18" width="18" src="https://tcc-coin.com/svg/logo.svg">
        </div></div>`);
    code=`
    <div><span class="">Your contribution to the network security</span></div>
    <div class="dg col-2 p5 bg-green bdr5 mt10 cf">
                	<div class="step_level">`+(refs.length>5?`Hight`:refs.length>2?`Medium`:`Low`)+`</div>
                	<div class=""><span class="security_circle_step">`+((circleSecurity-0.2)*currentSpeed).toFixed(3)+`</span> TCC/hr</div>
                </div>
    <div class="mt5 mb10">`+code.join("")+`</div>
  `;
    popupT2("pop2","",code,"Your security circle",1);
  }catch(err){popupT2("pop2","",JSON.stringify(err),"Error!",1);}
}
async function showReferralTeam(){
  var ms = trans_checkin.filter(m=>(Date.now()-m.timestamp)<86400000).map(m=>m.user);
  //console.log(ms)
  var list = refs.map(m=>{
    return `<div class="col-2 dg bdb aic">
        	<div class="tl p10">${m.name||m.user}</div>
        	<div class="tr p10 aic df ml-auto">
            	${ms.includes(m.user)?`<img class="me3" height="18" width="18" src="https://tcc-coin.com/svg/logo.svg">`:`<div class="wh23 bdr bg-light"></div>`}
                <div class="ms5" onclick="listenClickUser('${m.user}')">
                	<div class="wh18 icon_chat f-orange"></div>
                </div>
                </div>
        </div>`;
  });
  ntc.alertD("Referral Team",`
        	<div id="ref_team_info">
                <p class="tl">
                	You have invited ${refs.filter(f=>f.user!=tfl.cookie("user.ref")).length} new Pioneers. 
                    Your Referral Team has ${refs.length} members. 
                    <span>${(ms.length-1)}</span> of ${refs.length} are currently mining.
                </p>
                <div class="mt10 mb10">
                	<div class="dg pt10 pb10" id="list_ref">
						${list.join("")}
                    </div>
                </div>
                <div class="mb10">
                	<div class="dg pt10 pb10 fs14 cg" id="list_ref">
                    	Invite people to join the TCC Network to add them to your Referral Team or ping members who are not actively mining.
                    </div>
                    <div class="df pt10 pb10 jcc">
                      <div class="btn2 m3 p10 cf df aic fwb" onclick="showInviteF()">
                        <p><p class="wh23 me3 icon_share5 ff"></p></p>Invite
                      </div>
          			  <div class="bd bdr10 m3 p10 df fwb jcc" onclick="pingInactive()">Ping inactive</div>
                    </div>
                </div>
            </div>
        `);
  icon_init();
}
async function logout(){
  tfl.cookie("token","",0);
  tfl.cookie("user","",0);
  localStorage.clear();
  delIndexedDB();
  popupT2("pop2","","Logging out..","Waiting...");
  setTimeout(()=>{window.location.reload();},1500);
}
function delIndexedDB(){
  indexedDB.databases().then(res=>{res.forEach(res=>indexedDB.deleteDatabase(res.name));});
}
async function mining(){
  let ob=tfl.cookie("user")||{};
  if(tfl.cookie("tokenApp")){ob.tokenApp=tfl.cookie("tokenApp")}

  popupT2("min","","Waiting...","Mining...");
  let t=await _t.call("minting",{tapp: "tcc",user:tfl.cookie("user.user")});
  if(!t.token){
    popupT2("min","","A connection error occurred. Please <b>Login</b> again!","Your connection or token is invalid.",1)
    logout();
    return;
  }
  if(!t.result){setTimeout(()=>{location.reload();},100);}
  if(window.min_close){min_close.click();}
  initTCC();
}
async function showMiningTCC(){
  if(document.querySelector("#mining_info")){document.querySelector("#mining_info").remove()}
  let tm=trans_checkin.filter(m=>(Date.now()-m.timestamp)<86400000&&m.user!=tfl.cookie("user.user"));
  tm=tm.map(m=>m.user);
  tm=[...new Set(tm)];
  let dk=trans_checkin.filter(m=>(Date.now()-m.timestamp)<86400000&&m.user==tfl.cookie("user.user"));
  //console.log(dk,tm);
  if(!dk.length){
    setTimeout(()=>{mining()});
    return;
  }

  ntc.alertD("Mining info",`
        	<div id="mining_info">
				<div>
                	Mining Session Ends <span class="mining_end"></span>
                </div>
                <h3 class="mt5 pb5">
                	<b>Total mining rate: `+(mySpeed).toFixed(2)+`</b><span class="life_step"></span><b>TCC/hr</b>
                </h3>
                <div class="dg col-5 mt10 pb5">
                	<div class="aic cf btn bdr5 pt5 pb5">
                    	<div>Base Rate</div>
                    	<div><span class="base_rate">`+window.currentSpeed+`</span> TCC/hr</div>
                    </div>
                    <div class="df aic dg">x</div>
                    <div class="aic bg-green bdr5 cf pt5 pb5">
                    	<div>Boosters</div>
                    	<div><span class="total_booster">`+parseInt(refs.length*20>100?100:refs.length*20)+`</span>%</div>
                    </div>
                    <div class="df aic dg">+</div>
                    <div class="aic bg-gray bdr5 cf pt5 pb5">
                    	<div>Rewards</div>
                    	<div><span class="total_reward">`+(tm.length*0.1*window.currentSpeed).toFixed(3)+`</span></div>
                    </div>
                </div>
                <div class="bd mt10 mb10 bdr5 oh">
                	<div class="dg cf col-2 bg-green pt5 pb5">
                    	<div class="tl p10">Boosters</div> 
                        <div class="tr p10"><span class="total_booster"></span>%</div>
                    </div>
                    <div class="dg col-2">
                    	<div class="tl p10">Pioneer</div><div class="tr p10">`+parseInt(window.circleSecurity*100)+`%</div>
                    </div>
                    <div class="dg col-2">
                    	<div class="tl p10 pt0">Security Circle</div>
                        <div class="tr p10 pt0">
                        	<span class="refs_circle">`+(refs.length>5?5:refs.length)+`</span> 
                            x <span class="percen_define">20</span>
                            % = <span class="security_circle">`+parseInt(refs.length*20>100?100:refs.length*20)+`</span>%
                        </div>
                    </div>
                    <!-- div class="dg col-2">
                    	<div class="tl p10">Lockup reward</div>
                        <div class="tr p10">
                        	<span>0%</span>
                        </div>
                    </div -->
                </div>
                <div class="bd mt10 mb10 bdr5 oh">
                	<div class="dg cf col-2 bg-gray pt5 pb5">
                    	<div class="tl p10">Rewards</div> 
                        <div class="tr p10"><span class="total_reward"></span></div>
                    </div>
                    <!--div class="dg col-2 mt10">
                    	<div class="tl p10">Pioneer</div><div class="tr p10">1.00</div>
                    </div-->
                    <div class="dg col-2">
                    	<div class="tl p10">Team mining</div>
                        <div class="tr p10">
                        	<span class="ref_mining">`+tm.length+`</span> 
                            x <span class="reward_define">10</span>% 
                   			x <span class="my_step">`+window.currentSpeed+`</span>
                            = <span class="reward_ref">`+(tm.length*0.1*window.currentSpeed).toFixed(2)+`</span>
                        </div>
                    </div>
                    <!-- div class="dg col-2">
                    	<div class="tl p10">Node Bonus</div>
                        <div class="tr p10">
                        	<span>0</span>
                        </div>
                    </div-->
                </div>
            </div>
            <div class="w100 df jcc mt10">
            	<div class="btn p5 ps10 pe10 cf" onclick="calcC2()">View Recent transactions</div>
            </div>
        `);
  countdownT(dk[0]);
  //mash_loading.style.display="none";
}
function countdownT(d){
  if(document.querySelector(".mining_end")){
    setInterval(()=>{
      let t1=((d.timestamp+86400000)-Date.now());
      //console.log(t1)
      let h=parseInt(t1/3600000);
      let d1=parseInt(t1%3600000);
      let m=parseInt(d1/60000);
      let s=parseInt((d1%60000)/1000);
      if(s<0||m<0||h<0){
        document.querySelector(".mining_end").innerHTML=0;
      }else{document.querySelector(".mining_end").innerHTML=h+":"+m+":"+s}
    },1000);
  }else{console.log("adf")}
}
async function showMintClick(t){
  if(!tfl.cookie("user.user")){return;}
  if(await checkmine24h(t)){
    document.querySelectorAll("#btn_mint").forEach(el=>{
      el.classList.remove("bg-green");
      el.classList.add("bg-gray");
    });
    document.querySelectorAll(".p-mining").forEach(el=>{el.classList.remove("dn");});
  }else{
    document.querySelectorAll("#btn_mint").forEach(el=>{
      el.classList.add("bg-green");
      el.classList.remove("bg-gray");
    });
    document.querySelectorAll(".p-mining").forEach(el=>{el.classList.add("dn");});
  }
}
async function checkmine24h(t){
  if(trans_[tfl.cookie("user.user")].length==0){return true}
  let r=(await tfl.getTime()-t)>86400000;
  //console.log(r);
  return r;
}
async function getTrans(user) {
  user=user||tfl.cookie("user.user");
  let d=await _t.call("allmint",{tapp:"tcc",user:user});
  d=d.data||[];
  window.trans_[user]=d;
  return d;
}
async function getTrans5() {
  let user=window.refs.map(m=>m.user);
  user.push(tfl.cookie("user.user"));
  if(user.length==0){return []}
  let d=await _t.call("allmint5",{tapp:"tcc",user:user});
  d=d.data||[];
  for(let i=0;i<d.length;i++){
    let m=d[i];
    window.trans_[m.u]=m.d;
  }
  return window.trans_;
}
getDataForm = (id, is_encrypt)=>{
  var p = {};
  var form;
  if(typeof id=="string"){
    if(id.split('#').length==1){
      id = '#'+id;
    }
    form = document.querySelector(id);
  }else if(typeof id=="object"){
    form = id;
  }
  window.editors ||(window.editors={})
  form.querySelectorAll('*[name]').forEach(a=>{
    if(a.id && window.editors[a.id]){
      p[a.name] = window.editors[a.id].getData();
      return;
    }
    if((a.type === 'checkbox' || a.type === 'radio') && !a.checked){
      if(a.type === 'checkbox' && p[a.name] === undefined){
        p[a.name] = [];
      }
      return;
    }
    if(p[a.name] !== undefined){
      if(!p[a.name].push){
        p[a.name] = [p[a.name]];
      }
      p[a.name].push(a.value || '');
    }else{
      p[a.name] = a.value || '';
    }
  });
  return is_encrypt?tfl.crypt(p):p;
};
setDataForm = (id, data, callback)=>{
  data || (data={});
  var p = {};
  if(id.split('#').length==1){
    id = '#'+id;
  }
  window.editors ||(window.editors={});
  var arr_text = {};
  document.querySelectorAll(id+' *[name]').forEach(a=>{
    if(a.id && window.editors[a.id]){
      window.editors[a.id].setData(data[a.name]);
    }else if(a.type === 'checkbox' || a.type === 'radio'){
      data[a.name] || (data[a.name] = []);
      if(!Array.isArray(data[a.name])) {
        data[a.name] = [data[a.name]];
      }
      if(data[a.name].map(d=>d+'').includes(a.value)) {
        a.checked = true;
      } else {
        a.checked = false;
      }
    }else if(data[a.name] != undefined){
      if(!Array.isArray(data[a.name])){
        a.value = data[a.name];
      }else{
        arr_text[a.name] || (arr_text[a.name] = []);
        arr_text[a.name].push({element: a, data: data[a.name]})
      }
    }
  });
  Object.values(arr_text).forEach(i=>{
    i.forEach((el,ind)=>{
      if(el.element.id && __CKE[el.element.id]){
        __CKE[el.element.id].setData(el.data[ind]);
      }else{
        el.element.value = el.data[ind];
      }
    })
  });
}

window.header=`
	<div class="lang_list pf top-0 right-0 dn bg-white p10 fwb bds">
      <div class="m5 df aic"><img class="me5" width="30" height="30" src="//dev.tcc-coin.com/koart3it5oaxirqf/contries/england.svg"/>English</div>
      <div class="m5 df aic"><img class="me5" width="30" height="30" src="//dev.tcc-coin.com/koart3it5oaxirqf/contries/spain.svg"/>Español</div>
      <div class="m5 df aic"><img class="me5" width="30" height="30" src="//dev.tcc-coin.com/koart3it5oaxirqf/contries/germany.svg"/>Deutsch</div>
      <div class="m5 df aic"><img class="me5" width="30" height="30" src="//dev.tcc-coin.com/koart3it5oaxirqf/contries/netherlands.svg"/>Dutch</div>
      <div class="m5 df aic"><img class="me5" width="30" height="30" src="//dev.tcc-coin.com/koart3it5oaxirqf/contries/france.svg"/>Français</div>
      <div class="m5 df aic"><img class="me5" width="30" height="30" src="//dev.tcc-coin.com/koart3it5oaxirqf/contries/korea.svg"/>한국어</div>
      <div class="m5 df aic"><img class="me5" width="30" height="30" src="//dev.tcc-coin.com/koart3it5oaxirqf/contries/poland.svg"/>Polski</div>
      <div class="m5 df aic"><img class="me5" width="30" height="30" src="//dev.tcc-coin.com/koart3it5oaxirqf/contries/vietnam.svg"/>Tiếng Việt</div>
      <div class="m5 df aic"><img class="me5" width="30" height="30" src="//dev.tcc-coin.com/koart3it5oaxirqf/contries/turkey.svg"/>Türk</div>
      <div class="m5 df aic"><img class="me5" width="30" height="30" src="//dev.tcc-coin.com/koart3it5oaxirqf/contries/china.svg"/>简体中文</div>
    </div>
    <div class="menu_list pf top-0 left-0 dn bg-white p10 pt0 fwb bde">
      <div class="m5 df aic ps top-0 bg-white bdb">
      	<div class="df aic"><p><p class="wh30 me3 icon_home5"></p></p>Home</div>
        <div class="df aic ml-auto"><p><p class="wh23 icon_close5 f-orange"></p></p></div>
      </div>
      <div onclick="showMainnetChecklist()" class="m5 df aic"><p><p class="wh30 me5 icon_mainnet"></p></p>Mainnet</div>
      <!--div onclick="location.href='/html/tccbrowser.html'" class="m5 df aic"><img class="me5" width="30" height="30" src="/svg/earth.svg"/>TCC Browser</div-->
      <!--div class="m5 df aic">
      	<img class="me5" width="30" height="30" src="/svg/utilities.svg"/>TCC Utilities
      </div-->
      <div class="m5 df aic" onclick="showTransfer()"><p><p class="wh30 me5 icon_transfer"></p></p>TCC Transfer</div>
      <div class="m5 df aic" onclick="showMiningTCC()"><p><p class="wh30 me5 icon_mine"></p></p>Mine TCC</div>
      <div class="m5 df aic" onclick="showReferralTeam()"><p><p class="wh30 me5 icon_group f-orange"></p></p>Referral Team</div>
      <div class="m5 df aic" onclick="roleF()">
      	<p><p class="wh30 me5 icon_role"></p></p>Roles
      </div>
      <div onclick="chatF()" class="m5 df aic">
      	<p><p class="wh30 me5 icon_chat5"></p></p>Chat
      </div>
      <div class="m5 df aic" onclick="nodeF()"><p><p class="wh30 me5 icon_node"></p></p>Node</div>
      <div class="m5 df aic" onclick="FAQsF()"><p><p class="wh30 me5 icon_faq"></p></p>FAQ</div>
      <div onclick="openWhitePaper()" class="m5 df aic"><p><p class="wh30 me5 icon_whitepaper"></p></p>White Paper</div>
      <div class="m5 df aic" onclick="supportF()"><p><p class="wh30 me5 icon_support"></p></p>Support</div>
      <div onclick="openProfile()" class="m5 df aic"><p><p class="wh30 me5 icon_profile"></p></p>Profile</div>

      <div class="pt5 bdt tc fwn cg">Follow us on</div>
      <div class="df aic jcc">
      	<p><p class="wh30 m5 dn icon_facebook f-darkblue"></p></p>
          <p><p class="wh30 m5 dn icon_instagram"></p></p>
          <p><p class="wh30 m5 dn icon_youtube f-red"></p></p>
          <p><p class="wh30 m5 dn icon_x"></p></p>
        <p><p onclick="openTele()" class="wh30 m5 f-darkblue icon_tele"></p></p>
      </div>
      <div class="pt5 bdt tc fwn cg dn">Other App</div>
      <div class="df aic jcc dn">
      	<div onclick="location.href='/html/savemoney.html'"><img class="m5" width="30" height="30" src="/svg/savemoney.svg"/></div>
        <div onclick="location.href='/html/savecoin.html'"><img class="m5" width="30" height="30" src="/svg/savecoin.svg"/></div>
        <div onclick="location.href='/kyi8okt6bnbcxkyu/html/games.html'"><img class="m5" width="30" height="30" src="/svg/games.svg"/></div>
      </div>
      <div class="pt5 bdt tc mb30 fwn cg">v.1.0.1</div>
    </div>`;
window.footer=`
	  <div class="tc df jcc p10">
        <div class="btn2 m3 p10 cf df aic fwb" onclick="showInviteF()">
          <p><p class="wh23 me3 icon_share5 ff"></p></p> Invite
        </div>
        <div class="btn2 m3 p10 cf df fwb" onclick="showMainnetChecklist()">Mainnet info</div>
      </div>
`;
window.footer1=`
	  <div class="tc df jcc p10">
        <div class="btn2 m3 p10 cf df aic fwb" onclick="logout()">
          <p><p class="wh23 me3 icon_signout"></p></p> Sign out
        </div>
      </div>
`;
window.footer2=`
	  <div class="tc df jcsb p10">
      	<div class="p5" onclick="loadHistory()"><img height="30" src="/svg/chat2.svg"></div>
        <div class="p5"><img height="30" src="/svg/phone2.svg"></div>
        <div class="p5" onclick="listContact()"><img height="30" src="/svg/user2.svg"></div>
        <div class="p5"><img height="30" src="/svg/search.svg"></div>
        <div class="p5"><img height="30" src="/svg/menu2.svg"></div>
      </div>
`;
document.querySelector("#footer")&&(document.querySelector("#footer").innerHTML=window.footer);
if(document.querySelector("#profile")){
  document.querySelector("#profile").innerHTML=window.profile;
  document.querySelector("#footer").innerHTML=window.footer1;
}
if(document.querySelector("#chat")){
  document.querySelector("#footer").innerHTML=window.footer2;
}

if(Date.now()<=Number(new Date('2025-03-28T23:59:59Z'))){window.currentSpeed=1.6;}else{window.currentSpeed=0.8;}

((ntc)=>{
  ntc.dialogIds = [];
  ntc.closeD=()=>{
    var dlg = document.getElementById(ntc.dialogIds.pop());
    if(dlg){
      dlg.remove();
    }
  };
  ntc.loginAppF=(callback)=>{
    var frm=ntc.alertD("login",`<div id="frm-login" class="mb10 di p10">
      	<input class="p10 bd bdr5" type="email" id="username" name="username" placeholder="Type account"><br>
      	<input class="p10 bd bdr5 mt10" type="password" id="password" name="password" placeholder="Type password"><br>
      </div>
      <div class="mt10 mb20">
      	<a class="btn p10 cf m5" id="btn-a">OK</a>
      </div>
      <div class="mt10 mb20">
      	No Account? <a class="m5" href="/html/reg.html">Sign up</a>
      </div>`);
    frm.querySelectorAll(".btn_close").forEach(el=>(el.style="display:none"))
    frm.querySelector("#btn-a").onclick=()=>{
      var data=getDataForm(frm);
      ntc.loginApp(data.username,data.password,(res)=>{
        if(res.result){
          frm.close();
          typeof callback=="function"&&callback(res);
        }else{
          ntc.alertD("note", res.error||res.msg);
        }
      });
    }
  }
  ntc.loginApp=(user, pwd, callback)=>{
    window.token="";
    tfl.cookie("token","");
    _t.call("tcc_login",{user,pwd}).then(res => {
      if( typeof callback ==='function') {
        callback(res); 
        if(res&&res.data){
          window.token = res.data.token;
          tfl.cookie("user",res.data);
          tfl.cookie("token",res.data.token);
          //tfl.cookie("tokenApp")&&editMe({tokenApp: tfl.cookie("tokenApp")});
          initTCC();
        }
      }
    });
  }
  ntc.alertD = (title,msg,fclass)=>{
    if(!title && !msg){
      return document.querySelector("#"+ntc.dialogIds[ntc.dialogIds.length-1]);
    }
    var dlgId = "dialog_"+Math.floor(Math.random()*1000000);
    ntc.dialogIds.push(dlgId);
    if(msg && typeof msg=="object"){
      if(Array.isArray(msg)){
        if(msg.join("").trim()){
          msg = " - "+msg.join("<br> - ");
        }else{
          msg = "";
        }
      }else{
        if(Object.values(msg).join("").trim()){
          msg = JSON.stringify(msg);
        }else{
          msg="";
        }
      }
    }
    if(msg){ 
      popupT2(dlgId,"",msg,title,title?1:0);
      document.getElementById(dlgId+"_close").addEventListener("click",(event)=>{
        ntc.dialogIds.pop();
      });
      var frm = document.getElementById(dlgId);
      frm.getData = ()=>{
        return getDataForm(dlgId);
      }
      fclass&&frm.classList.add(fclass);
      frm.close=()=>{
        document.getElementById(dlgId+"_close").click();
      }
      return frm;
    }
  }
})(window.ntc=window.ntc||{});

async function showMainnetChecklist(){
  ntc.alertD("Mainnet checklist",`
    	<div>Coming soon</div>
	`)
}

async function chatF(){
  if(window.send_T_show){send_T_show.click();}
  //ntc.alertD("Note",`<div>Coming soon</div>`);
}
async function roleF(){
  ntc.alertD("TCC Roles",`
    	<div>
            <div class="dg col-2 tl">
              <div>
                  <h4>Pioneer</h4>
                  <p class="color-gray">
                      Prove that you are human
                  </p>
                  <p>
                      Mine TCC by checking in every 24h to show your commitment to the TCC network and prove that you're a human, not a bot.
                  </p>
              </div>
              <div>

              </div>
           </div>
           <div class="dg col-2 tl">
              <div>
                  <h4>Contributor</h4>
                  <p>
                      build the security graph
                  </p>
                  <p>
                      Mine at a higher rate by adding other members to your security circle, enabling the TCC network to secure transactions.
                  </p>
              </div>
              <div>

              </div>
           </div>
           <div class="dg col-2 tl">
              <div>
                  <h4>Ambassador</h4>
                  <p>
                      Distribute TCC widely
                  </p>
                  <p>
                      Mine at a higher rate by inviting people to join the TCC network.
                  </p>
              </div>
              <div>

              </div>
           </div>
           <div class="dg col-2 tl">
              <div>
                  <h4>Node</h4>
                  <p>
                     Coming soon!
                  </p>

              </div>
              <div>

              </div>
           </div>
        </div>
	`)
}
async function nodeF(){
  ntc.alertD("Node",`
    	<div>Coming soon!</div>
	`)
}
async function supportF(){
  ntc.alertD("Support",`
    	<div>Coming soon</div>
	`)
}
async function FAQsF(){
  ntc.alertD("Frequently Asked Questions",`
       <div class="oh" style="max-height: 80vh; overflow: auto">
            <div class="dg tl">
              <div>
                  <h4>Disclaimer: TCC is NOT free money</h4>
                  <p>
                      TCC is NOT free money. It is a long-term team project whose success depends on the collective contributions of its members.
                  </p>
              </div>
           </div>
           <div class="dg tl">
              <div>
                  <h4>What is TCC?</h4>
                  <p>
                      TCC is NOT free money. It is a long-term team project whose success depends on the collective contributions of its members.
                  </p>
              </div>
           </div>
           <div class="dg tl">
              <div>
                  <h4>How does this app work? How do I earn more TCC coins</h4>
                  <p>
                      This app allows you to earn TCC coins by making simple contributions to TCC’s community. The more you contribute, the more TCC you earn. Read more
                  </p>
              </div>
           </div>
           <div class="dg tl">
              <div>
                  <h4>Do I need to leave the app open to mine? Does the app drain my battery or data?</h4>
                  <p>
                      You do not need to leave the app open to mine. TCC does not affect your phone’s performance, drain your battery, or use your network data. Once you hit the lightning button, you can even close the app and you will continue to mine TCC.
                  </p>
              </div>
           </div>
           <div class="dg tl">
              <div>
                  <h4>Why do earlier members mine at a higher rate?</h4>
                  <p>
                      Earlier members mine at a higher rate to reward contributions to the network when they are most needed.
                  </p>
              </div>
           </div>
           <div class="dg tl">
              <div>
                  <h4>What is the Ambassador role? How does the earning team work?</h4>
                  <p>
                      As an Ambassador, you earn up to a 10% bonus on your base mining rate for each person you invite to the network.
                  </p>
              </div>
           </div>
           <div class="dg tl">
              <div>
                  <h4>What is the Contributor role? How do I become a contributor?</h4>
                  <p>
                      Becoming a Contributor allows you to earn more TCC by building a security circle of 3-5 trusted members.
                  </p>
              </div>
           </div>
           <div class="dg tl">
              <div>
                  <h4>What are security circles?</h4>
                  <p>
                      Security circles are groups of 3-5 trusted people built by each of TCC’s members. Security circles secure the currency by building a global trust graph that prevents bad actors from executing fraudulent transactions.
                  </p>
              </div>
           </div>
           <div class="dg tl">
              <div>
                  <h4>What is the value of TCC?</h4>
                  <p>
                      Today TCC is worth approximately 0 dollars / euro etc. similar to Bitcoin in 2008. TCC’s value will be backed by the time, attention, goods, and services offered by other members of the network.
                  </p>
              </div>
           </div>
           <div class="dg tl">
              <div>
                  <h4>Can I withdraw my TCC? What is the timeline for withdrawals?</h4>
                  <p>
                      No, you cannot withdraw TCC yet. You will be able to withdraw TCC or exchange TCC for other currencies in Phase 3 of the project when TCC transitions to a fully decentralized blockchain.
                  </p>
              </div>
           </div>
           <div class="dg tl">
              <div>
                  <h4>When will TCC be worth something? When can I turn TCC into “real” money?</h4>
                  <p>
                      TCC’s holders will be able to turn TCC into “real” money when they either purchase goods and services on TCC’s marketplace or exchange TCC for fiat currency.
                  </p>
              </div>
           </div>
           <div class="dg tl">
              <div>
                  <h4>Can I mine from more than one device? How does the network prevent fake accounts, bots, etc. from earning TCC?</h4>
                  <p>
                      No, you cannot mine from more than one device. The network has a strict rule of one account per person. TCC uses a multi-pronged strategy to ensure TCC is not mined by fake accounts.
                  </p>
              </div>
           </div>
           <div class="dg tl">
              <div>
                  <h4>Is this app a wallet? Will we hold our own private / public keys? And can we use an external wallet to hold our TCC in the future?</h4>
                  <p>
                      Yes, your phones will serve as a cryptocurrency wallet that will be linked to your current accounts (number / Facebook).
                  </p>
              </div>
           </div>
           <div class="dg tl">
              <div>
                  <h4>Are there countries or regions restricted from accessing TCC?</h4>
                  <p>
                      Yes. TCC Network’s vision is to build an inclusive peer-to-peer ecosystem and online experience, fueled by the TCC cryptocurrency.
                  </p>
              </div>
           </div>
        </div>
        <div class="mt10 cg">If you have more questions, please send them to <b>help.tcc.network@gmail.com</b></div>
        `);
}
async function pingInactive(){
  let t=Date.now()-Number(tfl.cookie("pingInactive"));
  if(t<3600000){
    let min=(3600000+Number(tfl.cookie("pingInactive"))-Date.now())/60000;
    popupT2("pop23","","Please wait for "+parseInt(min)+" minutes before sending again","Ping Inactive",1);
    return;
  }
  var ms = trans_checkin.filter(m=>(Date.now()-m.timestamp)<86400000).map(m=>m.user);
  let d=(window.refs||[]).map(m=>m.user);
  d=d.filter(m=>!ms.includes(m));
  let ob={};
  ob.user=d;
  popupT2("pop23","","<b> Please wait...</b>You are sending a notification to the users:"+d.join(", ")+"<b> Please wait...</b>","Ping Inactive");
  await _t.call2("notify_send2",ob);
  tfl.cookie("pingInactive",Date.now());
  popupT2("pop23","","You have sent a notification to the users:"+d.join(", ")+"<b> Done!</b>","Ping Inactive",1);
}
function showInviteF(){
  if (navigator.share) {
    navigator.share({
      title: 'Share Referral Link',
      url: "//"+window.location.host+"?r="+tfl.cookie("user.user")
    }).then(() => {
      console.log('Thanks for sharing!');
    })
      .catch(console.error);
  } else {
    ntc.alertD("Share link",`
        	<div id="ref_team_info">
				<div class="tl">
                	Invitation code: <b>${tfl.cookie("user.user")}</b>
                </div>
                <div class="mt10 mb10">
                	<div class="dg pt10 pb10" id="list_ref">
						<span onclick="navigator.clipboard.writeText('https://${window.location.host}?r=${tfl.cookie("user.user")}')">Copy</span>
                        https://${window.location.host}?r=${tfl.cookie("user.user")}
                    </div>
                </div>
                <div class="bdt mt10 mb10">
                	<div class="dg pt10 pb10" id="list_ref">
						<a target="_blank" href="https://www.facebook.com/sharer.php?u=https://${window.location.host}?r=${tfl.cookie("user.user")}">Share facebook</a>
                    </div>
                    <div class="dg pt10 pb10" id="list_ref">
						<a target="_blank" href="https://twitter.com/intent/tweet
?url=https://${window.location.host}?r=${tfl.cookie("user.user")}">Share Tweetter</a>
                    </div>
                    <div class="dg pt10 pb10" id="list_ref">
						<a target="_blank" href="https://www.linkedin.com/sharing/share-offsite/?url=https://${window.location.host}?r=${tfl.cookie("user.user")}">Share LinkedIn</a>
                    </div>
                    <div class="df pt10 pb10">

                    </div>
                    <div class="df bd bdr10 m3 p10 fwb jcc"></div>
                </div>
            </div>
        `);
  }
}

function openTele(){
  //location.href="https://t.me/OfficialTccNetwork";
  let code=`<div class="p10 m10 bd bdr5">https://t.me/OfficialTccNetwork</div></iframe>`
  popupT2("min","",code,"Telegram",1);
}
function openWhitePaper(){
  //console.log(tfl.cookie("user"));
  let code=`<div class="tl">
        <h1 class="mt10 fs20">TCC NETWORK WHITEPAPER</h1>
        <div>
          <div class="fwb fs20 mt10">1. Introduction</div>
          <p>TCC Network is a decentralized blockchain platform that enables users to mine and trade digital assets easily on their mobile devices without requiring specialized hardware. The project is designed to provide fair financial access to everyone through blockchain technology.</p>
          <div class="fwb fs20 mt10">2. Vision and Mission</div>
          <div class="fwb">2.1. Vision</div>
          <p>TCC Network aims to become a robust decentralized financial ecosystem where everyone can participate in the digital economy without technical or financial barriers.</p>
          <div class="fwb">2.2. Mission</div>
          <p>Bring blockchain technology to mainstream users.</p>
          <p>Create a fair and energy-efficient mining system.</p>
          <p>Provide a secure, fast, and reliable trading platform.</p>
          <p>Support real-world applications in the digital economy.</p>
          <div class="fwb fs20 mt10">3. Technology</div>
          <div class="fwb">3.1. Consensus Algorithm</div>
          <p>TCC Network utilizes the Proof of Engagement (PoE) consensus mechanism, allowing users to mine based on their level of interaction and contribution to the network rather than consuming computational resources like traditional blockchains.</p>
          <div class="fwb">3.2. Mobile Mining</div>
          <p>Users can mine TCC Tokens by:</p>
          <p>Activating the app daily.</p>
          <p>Engaging in the community and expanding the network.</p>
          <p>Verifying transactions and contributing to the ecosystem.</p>
          <p>This mining process does not consume device resources, ensuring energy efficiency while maintaining security and decentralization.</p>
          <div class="fwb">3.3. Security and Transparency</div>
          <p>TCC Network employs advanced encryption technology to ensure transaction and user data security.</p>
          <p><b class="color-orange">KYC</b> identity verification prevents <b class="color-orange">fraud</b> and <b class="color-orange">fake accounts</b>.</p>
          <div class="fwb fs20 mt10">4. Economic Model</div>
          <div class="fwb">4.1. Total Supply</div>
          <p>The total supply of TCC Tokens is capped at 100 billion tokens, distributed as follows:</p>
          <p>80% allocated for community mining.</p>
          <p>5% allocated for ecosystem development funds.</p>
          <p>6% allocated for the founding team and advisors.</p>
          <p>4% allocated for strategic partners and investors.</p>
          <p>5% allocated for reserve funds.</p>
          <div class="fwb">4.2. Distribution Mechanism</div>
          <p>Initially, the mining rate will be higher to encourage early participation. Over time, mining rewards will gradually decrease, similar to Bitcoin, ensuring token scarcity.</p>
          <div class="fwb">4.3. The value and awareness of TCC</div>
          <p>We do not commit to or guarantee the value of TCC at any given time. The value of TCC is entirely determined by market supply and demand, based on the consensus of the user community. We do not interfere in pricing and are not responsible for TCC's price fluctuations. Investors and users should carefully consider before engaging in mining and trading.</p>
          <div class="fwb fs20 mt10">5. Real-World Applications</div>
          <p>TCC Tokens can be used for:</p>
          <p>Payments within the TCC Network ecosystem.</p>
          <p>Peer-to-peer (P2P) transactions without intermediaries.</p>
          <p>Shopping and exchanging goods/services on the marketplace.</p>
          <p>Supporting decentralized projects (DeFi, NFT, GameFi, etc.).</p>
          <div class="fwb fs20 mt10">6. Roadmap</div>
          <div class="fwb">6.1. Phase 1: Platform Development (2024-2025)</div>
          <p>Develop the blockchain and mobile application.</p>
          <p>Launch the mining program for early users.</p>
          <p>Build the community and refine the economic model.</p>
          <div class="fwb">6.2. Phase 2: Ecosystem Expansion (2025-2026)</div>
          <p>Launch the decentralized wallet (TCC Wallet).</p>
          <p>Enable P2P transactions and integrate with decentralized exchanges (DEX).</p>
          <p>Introduce the marketplace and initial real-world applications.</p>
          <div class="fwb">6.3. Phase 3: Full Integration and Adoption (2026+)</div>
          <p>Partner with businesses to expand TCC Token acceptance.</p>
          <p>Upgrade infrastructure to support millions of users.</p>
          <p>Expand applications in decentralized finance (DeFi) and smart contracts.</p>
          <div class="fwb fs20 mt10">7. Conclusion</div>
          <p>TCC Network is a promising blockchain project aiming to create a fair, secure, and accessible decentralized financial ecosystem. With advanced technology, an energy-efficient mining model, and real-world applications, TCC </p>
          <p>Token is set to become a valuable digital asset in the global digital economy.  </p>
        </div>
      </div>`;
  popupT2("WhitePaper","",code,"White Paper",1);
}

function downloadLink(url){
  if (navigator.share) {
    navigator.share({
      title: 'Share Referral Link',
      url: url
    }).then(() => {
      console.log('Thanks for sharing!');
    })
      .catch(console.error);
  } else {
    ntc.alertD("Share link",`
        	<div id="ref_team_info">
				<div class="tl">
                	Invitation code: <b>${tfl.cookie("user.user")}</b>
                </div>
                <div class="mt10 mb10">
                	<div class="dg pt10 pb10" id="list_ref">
						<span onclick="navigator.clipboard.writeText('`+url+`')">Copy</span>
                    </div>
                </div>
                <div class="bdt mt10 mb10">
                	<div class="dg pt10 pb10" id="list_ref">
						<a target="_blank" href="https://www.facebook.com/sharer.php?u=`+url+`">Share facebook</a>
                    </div>
                    <div class="dg pt10 pb10" id="list_ref">
						<a target="_blank" href="https://twitter.com/intent/tweet
?url=`+url+`">Share Tweetter</a>
                    </div>
                    <div class="dg pt10 pb10" id="list_ref">
						<a target="_blank" href="https://www.linkedin.com/sharing/share-offsite/?url=`+url+`">Share LinkedIn</a>
                    </div>
                    <div class="df pt10 pb10">

                    </div>
                    <div class="df bd bdr10 m3 p10 fwb jcc"></div>
                </div>
            </div>
        `);
  }
}
function openProfile(){
  //console.log(tfl.cookie("user"));
  let code=`<div class="df">
  	<div class="df">Username:</div>
    <div class="df fwb ms5">`+tfl.cookie("user.user")+`</div>
  </div>
  <div class="df">
  	<div class="df wsp">Invitation code to share:</div>
    <div class="w100 df aic  jcsb fwb ms5">
    	<div>`+tfl.cookie("user.user")+`</div>
        <div class="btn2 ms5 p5 cf df aic fwb" onclick="showInviteF()">
          <p><p class="wh23 me3 icon_share5 ff"></p></p>
        </div>
    </div>
  </div>
  <div class="mt10 pt10 bdt">
  	<div class="df w100 tc jcc cg">Share the TCC App download link</div>
    <div class="dg col_1">
    	<div class="m10">
        	<div class="df aic bg-gray p5 bdr5 cf">
            	<div><div class="wh23 icon_apple ff"></div></div>
                <div class="ms5 tl wba">Available now on the Apple Store.</div>
            </div>
        </div>
        <div class="m10"">
        	<div class="df aic bg-gray bdr5 p5 cf">
            	<div><div class="wh23 icon_android ff"></div></div>
                <div class="ms5 tl wba">https://network.tcc-coin.com/l6zvhcq4fm8g311t/android/android_1_0.apk</div>
            </div>
        </div>
    </div>
  </div>

  <div class="mt10 pt10 bdt">
  	<div class="df w100 tc jcc cg">TCC Support Email:</div>
    <div class="df jcc aic">
    	help.tcc.network@gmail.com
    </div>
  </div>

  <div class="tc df jcc p10">
        <div class="btn2 m3 p10 cf df aic fwb" onclick="logout()">
          <p><p class="wh23 me3 icon_signout"></p></p> Sign out
        </div>
      </div>

  `
  popupT2("myProfile","",code,"My Profile",1);
  icon_init();
}
((tfl)=>{
  //tfl.abc=(a)=>{alert(a)};
  tfl.insertText=(inp,value)=>{
    let v=inp.value;
    let s=inp.selectionStart;
    let e=inp.selectionEnd;
    let v1=v.slice(0,s);
    let v2=v.slice(e);
    inp.value=v1+value+v2;
    inp.selectionStart=(v1+value).length;
    inp.selectionEnd=(v1+value).length;
    inp.focus();
  };

  tfl.getTime=()=>{
    return new Promise(async r3=>{
      await fetch("https://sw.tafalo.com/timestamp").then(r=>r.json()).then(r=>r3(r.time));
    });
  };

  tfl.setdataHTML=(id,data)=>{
    var e=document.querySelectorAll(id);
    for(var i=0;i<e.length;i++){
      e[i].innerHTML=data;
    }
  };
  tfl.getdataHTML=(id)=>{
    if(document.querySelector(id)){return document.querySelector(id).innerHTML;}
  };

  // function tfl.cookie
  tfl.key_root_cookie = '__cookie_data__';
  tfl.cookie = (key, value, expire)=>{
    var ckey = '__cookie_data__';
    var keys = key.split('.');
    key = keys.shift();
    tfl[ckey] || (tfl[ckey] = localStorage.getItem(ckey) || {});
    if(typeof tfl[ckey] == 'string'){
      if(tfl[ckey].substr(0,1) == '{' && tfl[ckey].substr(tfl[ckey].length-1)=='}'){
        tfl[ckey] = JSON.parse(tfl[ckey]);
      }else{
        tfl[ckey] = {};
      }
    }
    if(typeof value == 'undefined'){
      var c = tfl[ckey][key] || [];
      if(c.length > 1){
        if(c[1] > 0){
          if(c[1] < Date.now()){
            c = [];
            delete tfl[ckey][key];
            localStorage.setItem(ckey, JSON.stringify(tfl[ckey]));
          }else if(typeof c[2]=="number" && c[2]>0){
            tfl[ckey][key] = [c[0],Date.now()+(c[2]*1000),c[2]]
            localStorage.setItem(ckey, JSON.stringify(tfl[ckey]));
          }
        }	
      }
      var rs = c[0];
      if(typeof rs == 'object'){var rs = JSON.parse(JSON.stringify(c[0]));}
      for(var i=0; i<keys.length;++i){
        if(typeof rs == undefined) {break;}
        if(['NaN','undefined'].includes(rs+'')) return;
        rs = rs[keys[i]];
      }
      return rs;
    }else{
      tfl[ckey][key] = [value];
      if(typeof expire == 'number'){
        if(expire == 0){
          tfl[ckey][key][1] = Date.now();
        }else if(expire > 0){
          tfl[ckey][key][1] = Date.now()+(expire*1000);
          tfl[ckey][key][2] = expire;
        }
      }
      localStorage.setItem(ckey, JSON.stringify(tfl[ckey]));
    }
  };
})(window.tfl = window.tfl || {});

function initMenu(){
  document.querySelector("#menu")&&document.querySelector("#menu").addEventListener("click", ()=>{
    if(!window.menu_click){
      document.querySelector(".menu_list").classList.remove("dn");
      setTimeout(()=>{window.menu_click=1;},50);
    }
  });
  document.querySelector("#lang")&&document.querySelector("#lang").addEventListener("click", ()=>{
    if(!window.lang_click){
      document.querySelector(".lang_list").classList.remove("dn");
      setTimeout(()=>{window.lang_click=1;},50);
    }
  });
  document.querySelector("*").addEventListener("click", ()=>{
    if(window.menu_click){
      setTimeout(()=>{
        document.querySelector(".menu_list").classList.add("dn");
        window.menu_click=0;
      },30);
    }
    if(window.lang_click){
      setTimeout(()=>{
        document.querySelector(".lang_list").classList.add("dn");
        window.lang_click=0;
      },30);
    }
  });
  icon_init();
}
async function postData2(url = '', data = {}) {
  var dataP = {
    method: 'POST',
    credentials: 'same-origin',
    //credentials:'omit',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  }
  let user=tfl.cookie("user.user")||tfl.cookie("userinfo.user")||"";
  user=user.split("").map(m=>m.charCodeAt());
  user=user.join("_");
  //console.log(user);

  Object.assign(dataP['headers'],{"tapp":(window.tapp||""),"tid":(window.tid||"")}, {'Authorization':user+` Bearer ${(window.token||tfl.cookie("token")||"")}`});

  const response = await fetch(url,dataP );
  return response.json();
}
function setdataHTML(id,data){
  var e=document.querySelectorAll(id);
  for(var i=0;i<e.length;i++){e[i].innerHTML=data;}
}
function appenChildT(es,ed,id,cl,first){
  var n = document.createElement(ed);
  if(id){n.id = id;}
  if(cl){
    if(typeof cl=="string"){cl=cl.split(" ");}
    if(typeof cl=='object'){cl.forEach((e)=>{n.classList.add(e);});}
    else{n.classList.add(cl);}
  }
  if(first){
    document.querySelector(es).insertBefore(n, document.querySelector(es).firstChild);
  }else{document.querySelector(es).appendChild(n);}
}

function listenerT(event,element,callback){
  var el=document.querySelectorAll(element);
  for(var i=0;i<el.length;i++){
    el[i].addEventListener(event, function() {
      if(typeof callback == 'function'){
        callback(this);
      }
    });
  }
}
function popupT2(id,cl,data,title,show_close_button){
  id=id.replace("#","").replace(".","");
  var p=`<style>
  			.modal{z-index: 9999; position: fixed; top: 0; left: 0;background: #00000030; width: 100%; height: 100vh;align-items: center; display: flex;}
			.modal_content{width: 90%; background: #fff; border-radius: 5px; margin: auto;overflow:hidden}
            #popup_body{max-height:80vh; overflow:scroll}
  		</style>
        <button class="dn" id="`+id+`_open">Open PopupT</button>
        <div class="modal dn" id="`+id+`1">
          <div class="popupT_dialog w100">
            <div class="modal_content fadeInUp shadow-md">
              `+(title?`<div class="modal_header bdb p10 df aic">
                <h5 class="modal_title w100 tu">`+title+`</h5>
                <div id="`+id+`_close" class="btn_close `+(show_close_button?``:`dn`)+`"></div>
      </div>`:`<div id="`+id+`_close" class="btn_close `+(show_close_button?``:`dn`)+`"></div>`)+`
              <div id="`+id+`_body" class="modal_body tc p10">
                `+(data?data:`<img height="50" src="//dev.tcc-coin.com/svg/loading.svg"/>`)+`
      </div>
      </div>
      </div>
      </div>`;
  var el=document.querySelector("#"+id);
  if(!el){
    appenChildT("body","div",id,cl);
  }else{el.remove();appenChildT("body","div",id,cl);}
  setdataHTML("#"+id,p);

  document.querySelector("#"+id+"_open").addEventListener("click", ()=>{
    document.querySelector("#"+id+"1").classList.remove("dn");
  });
  document.querySelector("#"+id+"_close").addEventListener("click", ()=>{
    setTimeout(function(){document.querySelector("#"+id+"1").classList.add("dn");},490);
    //document.querySelector("#"+id+"1 .modal_content").classList.remove("fadeInUp");
    document.querySelector("#"+id+"1").classList.add("fadeOut");
    document.querySelector("#"+id+"1 .modal_content").classList.add("fadeOutUp");
  });

  document.querySelector("#"+id+"_open").click();
}
function removeUnicode(str) {
  if (typeof str != 'string') {return str;}
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/á|à|ả|ạ/g, "a");
  str = str.replace(/è|è|é|ẹ|ẹ|ẻ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/è/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ó|ò|ọ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ụ/g, "u");
  str = str.replace(/ỳ|ý|ý|ỵ|ỷ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|$|_/g, "");
  str = str.replace(/-+-/g, "-");
  str = str.replace(/^\-+|\-+$/g, "-");
  str = str.replace(/\s+/g, "-");
  return str;
}
//Index db1
window.db=(name)=>{
  name=removeUnicode(name);
  tfl.indexDBs=tfl.indexDBs||{};
  return window.db[name]=new (function(){
    var _db,_name=name,self=this,ver=1;
    init();
    self.add=self.update=self.inserts=async(vals,callback)=>{
      if(!_db){await init();}
      if(!Array.isArray(vals)){vals=[vals];}
      var transaction = _db.transaction([name], "readwrite");
      transaction.oncomplete = (event) => {
        //console.log("All done!");
      };
      transaction.onerror = (event) => {
        console.log("Don't forget to handle errors!");
      };
      var objectStore = transaction.objectStore(name);
      var req = Promise.all(vals.filter(v=>v.tid).map(m=>new Promise(resolve=>{
        const request = objectStore.get(m.tid);
        request.onerror = (event) => {
          resolve(["error"]);
        };
        request.onsuccess = (event) => {
          var d=event.target.result;
          if(!d){
            var request = objectStore.add(m);
          }else{
            for(var i in m){d[i]=m[i];}
            var request = objectStore.put(d);
          }
          request.onsuccess = (event) => {resolve(event.target.result);};
          request.onerror = (event) => {resolve(["error",event]);};
        }
      }))).then(callback).catch(e=>{console.log(e);});
    }
    self.get=async(tid,callback)=>{
      if(!_db){await init();}
      return new Promise(resolve=>{
        const objectStore = _db.transaction([name], "readonly").objectStore(name);
        const request = objectStore.get(tid);
        request.onerror = (event) => {
          resolve(["error",event]);
          typeof callback=="function"&&callback();
        };
        request.onsuccess = (event) => {
          resolve(event.target.result);
          typeof callback=="function"&&callback(event.target.result)
        }
      });
    }
    self.getAll1=async(keys,callback)=>{
      if(!_db){await init();}
      var t=Date.now()
      return new Promise(resolve=>{
        keys=keys||[];
        if(!Array.isArray(keys)){keys=[keys];}
        const objectStore = _db.transaction([name], "readonly").objectStore(name);
        let request;
        if(keys.length){
          if(keys.length==1){
            request = objectStore.get(keys[0]);
          }else{
            keys.sort();
            return Promise.all(keys.map(m=>new Promise(r=>{
              objectStore.get(m).onsuccess=t=>{r(t.target.result)};
            }))).then(rs=>{
              console.log("time",(Date.now()-t)/1000);
              resolve(rs);
              typeof callback=="function"&&callback(rs);
            });
          }
        }else{request = objectStore.getAll();}
        const rs=[];
        request.onsuccess = (event) => {
          console.log("time",(Date.now()-t)/1000);
          var rs=event.target.result||[];
          !Array.isArray(rs)&&(rs=[rs])
          resolve(rs);
          typeof callback=="function"&&callback(rs);
        };
      })
    }
    self.getAll2=async(keys,callback)=>{
      if(!_db){await init();}
      var t=Date.now()
      return new Promise(async resolve=>{
        keys=keys||[];
        if(!Array.isArray(keys)){keys=[keys];}
        const objectStore = _db
        .transaction([name], "readonly")
        .objectStore(name);
        let request;
        if(keys.length){
          if(keys.length==1){
            request = objectStore.get(keys[0]);
          }else{
            keys.sort((a,b)=>a>b?1:-1);
            var s=[0,keys[0]];
            var rs=[];
            for(var i=1;i<keys.length;i++){
              if((keys[i]==s[1]||(keys[i]-s[1])==1)&&i<keys.length-1){
                s[1]=keys[i];
              }else{
                if((s[0]+1)==i){
                  rs.push(await new Promise(r=>{
                    objectStore.get(s[0]).onsuccess=t=>{r(t.target.result)}
                  }))
                }else{
                  var ar=await new Promise(r=>{
                    objectStore.getAll(IDBKeyRange.bound(keys[s[0]],keys[i-1])).onsuccess=t=>{
                      r(t.target.result);
                    }
                  })
                  rs=[...rs,...ar];
                }
                s[0]=i;s[1]=keys[i];
              }
            }
            rs.push(await new Promise(r=>{
              objectStore.get(s[1]).onsuccess=t=>{r(t.target.result)};
            }));
            //console.log("time",(Date.now()-t)/1000);
            typeof callback=="function"&&callback(rs);
            return resolve(rs);
          }
        }else{request = objectStore.getAll();}
        request.onsuccess = (event) => {
          //console.log("time",(Date.now()-t)/1000);
          var rs=event.target.result||[];
          !Array.isArray(rs)&&(rs=[rs])
          resolve(rs);
          typeof callback=="function"&&callback(rs);
        };
      })
    }
    self.getAll=async(keys,callback)=>{
      if(!_db){await init();}
      var t=Date.now()
      return new Promise(resolve=>{
        const objectStore = _db.transaction([name], "readonly").objectStore(name);
        const request = objectStore.openCursor();
        const rs=[];
        request.onsuccess = (event) => {
          const cursor = event.target.result;
          if (cursor) {
            if(keys){
              if(keys.includes(cursor.value.tid)){rs.push(cursor.value);}
            }else{rs.push(cursor.value)}
            cursor.continue();
          } else {
            console.log("time",(Date.now()-t)/1000)
            resolve(rs);
            typeof callback=="function"&&callback(rs);
          }
        };
      })
    }
    self.gets=self.find=async(filter,callback)=>{
      if(!_db){await init();}
      return new Promise(resolve=>{
        const objectStore = _db
        .transaction([name], "readonly")
        .objectStore(name);
        var ids=[];
        var fs=[];
        if(filter&&!Array.isArray(filter)){filter=[filter];}
        if(Array.isArray(filter)){
          filter=filter.filter(f=>f).map(f=>{
            if(["string","number"].includes(typeof f)){
              ids.push(f);
            }else if(f&&typeof f=="object"&&f.field=="tid"){
              if(Array.isArray(f.value)){
                ids=[...ids,...f.value]
              }else{ids.push(f.value);}
            }else{return f;}
          }).filter(f=>f);
        }else{filter=[];}
        var request;
        if(ids.length){
          if(ids.length==1){
            request = objectStore.get(ids[0]);
          }else{request = objectStore.getAll(IDBKeyRange.bound(...ids));}
        }else{request = objectStore.getAll();}
        request.onerror = (event) => {
          resolve(["error",event]);
          typeof callback=="function"&&callback()
        };
        request.onsuccess = async(event) => {
          if(filter.length){
            var rs=[];
            for(var i in event.target.result){
              var f=event.target.result[i];
              var kt=true;
              for(var t of filter){
                if(typeof t=="function"){
                  kt=await t(f);
                }else if(Array.isArray(t.value)){
                  if(t.op=="notin"){
                    kt=!t.value.includes(f[t.field]);
                  }else{kt=t.value.includes(f[t.field]);}
                }else{
                  switch(t.op){
                    case "contains":
                      if(!removeUnicode(f[t.field]+"").toLowerCase().includes(removeUnicode(t.value+"").toLowerCase())){
                        kt=false;
                      }
                      break;
                    case "like":
                      var val=removeUnicode(f[t.field]+"").toLowerCase();
                      var fts=removeUnicode(t.value+"").toLowerCase();
                      kt=val==fts;
                      break;
                    default:if(f[t.field]!=t.value){kt=false;}break;
                  }
                }
                if(!kt){break;}
              }
              kt&&rs.push(f);
            }
            typeof callback=="function"&&callback(rs)
            return resolve(rs);
          }
          typeof callback=="function"&&callback(event.target.result||[])
          resolve(event.target.result||[]);
        }
      });
    }
    self.clear=async(callback)=>{
      if(!_db){await init();}
      return new Promise(resolve=>{
        // open a read/write db transaction, ready for clearing the data
        const transaction = _db.transaction([_name], "readwrite");
        // report on the success of the transaction completing, when everything is done
        transaction.oncomplete = (event) => {};

        transaction.onerror = (event) => {};
        // create an object store on the transaction
        const objectStore = transaction.objectStore(name);
        // Make a request to clear all the data out of the object store
        const request = objectStore.clear();
        request.onsuccess = (event) => {
          resolve(event.target.result);
          typeof callback=="function"&&callback(event.target.result)
        };
        request.onerror = (event) => {
          resolve(["error",event]);
          typeof callback=="function"&&callback()
        };
      })
    }
    self.del=async(tids,callback)=>{
      if(!_db){await init();}
      if(!Array.isArray(tids)){tids=[tids];}
      var transaction = _db.transaction([name], "readwrite");
      transaction.oncomplete = (event) => {
        //console.log("All done!");
      };
      transaction.onerror = (event) => {
        console.log("Don't forget to handle errors!");
      };
      var objectStore = transaction.objectStore(name);
      return Promise.all(tids.map(m=>new Promise(resolve=>{
        var request = objectStore.delete(m);
        request.onsuccess = (event) => {
          resolve(true);
          typeof callback=="function"&&callback(event.target)
        };
        request.onerror = (event) => {
          resolve(event.target.error);
          typeof callback=="function"&&callback()
        };
      })));
    }
    async function init(){
      return new Promise(resolve=>{
        var request = indexedDB.open(name,ver);
        request.onerror = (event) => {
          console.error("Why didn't you allow my web app to use IndexedDB?!");
        };
        request.onsuccess = (event) => {
          _db = event.target.result;
          _db.onerror = (event) => {console.error(`Database error: ${event.target.errorCode}`);}
          resolve();
        }
        request.onupgradeneeded = (event) => {
          _db = event.target.result;
          console.log("on upgrade db ",name);
          var objectStore = _db.createObjectStore(name, { keyPath: "tid" });
          resolve();
          //objectStore.createIndex("name", "name", { unique: false });
        }
      })
    }
  });
}
//Example
//var ob={tid:1,name:"John"}
//db("test4").add(ob,console.log);// Add objects to Indexed DB
//db("test4").find({},console.log);// Find all data in Indexed DB
//End index db1

/////////////IndexedDB2////////////////////////////////////////////////////////////////////////
//var ob={id: 12345, name: {first: "John", last: "Doe"}, age: 42};
window.db2 = new DB("apps","tid");
function DB(_tableName,_indexs,_ver,_defineNormal){
  var self=this;
  var indexs = _indexs||[];
  var tableName = _tableName;
  var defineNormal = _defineNormal;
  var database = "database";
  window[database+"_ver_"]||(window[database+"_ver_"] = []);
  if(!window[database+"_ver_"].includes(tableName)){
    window[database+"_ver_"].push(tableName);
  }
  typeof indexs=="string"&&(indexs=[indexs]);
  var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB 
  || window.msIndexedDB || window.shimIndexedDB;
  self.connect=(callback)=>{

    var open = indexedDB.open(database, window[database+"_ver_"].length);
    open.onupgradeneeded = (e)=>{
      var store = e.target.result.createObjectStore(tableName, {keyPath: indexs});
      indexs.forEach(f=>{
        store.createIndex(f, f,{union: false});
      });
    };
    open.onsuccess = function(e) {
      //alert("de")
      try{
        var tx=e.target.result.transaction(tableName,"readwrite");
        var store = tx.objectStore(tableName);
        typeof callback=="function"&&callback(store);
      }catch(err){
        typeof callback=="function"&&callback();
      }
    }
  }
  self.connect();
  self.inserts=(obs,callback)=>{
    self.connect(store=>{
      if(!store){return typeof callback=="function"&&callback();}
      if(!Array.isArray(obs)){
        obs=[obs];
      }
      var all=[];
      obs.forEach(ob=>{
        typeof defineNormal=="function"&&defineNormal(ob);
        all.push(new Promise(r=>{
          var gb = store.put(ob);
          gb.onsuccess = ()=>{
            r(ob);
          }
          gb.onerror=()=>{
            r();
          }
        }));
      });
      Promise.all(all).then(res=>{typeof callback=="function"&&callback(res);});
    });
  }
  self.gets=(ids,callback)=>{
    if(["string","number"].includes(typeof ids)){
      ids=[ids];
    }
    self.connect(store=>{
      if(!store){return typeof callback=="function"&&callback();}
      var all = [];
      ids.forEach(f=>{
        all.push(new Promise(r=>{
          var rs = store.get([f]);
          rs.onsuccess = ()=>{
            r(rs.result);
          }
          rs.error = ()=>{
            r();
          }
        }));
      });
      Promise.all(all).then(res=>{
        typeof callback=="function"&&callback(res.filter(f=>f));
      });
    });
  }
  self.find=async(filter,options,callback)=>{

    return new Promise(r=>{

      setTimeout(()=>{
        self.connect(store=>{
          if(!store){return r();}
          if(!store){
            return setTimeout(async ()=>{
              r(await self.find(filter,options));
            },3000)
          }
          if(typeof options=="function"){
            if(!callback){
              callback=options;
            }
            options = {};
          }
          filter||(filter={});
          var rs=[];
          var cursor = store.openCursor();
          cursor.onsuccess = (event) => {
            const cursor = event.target.result;
            if (cursor) {
              if(typeof filter=="function"){
                if(!filter(cursor.value)){
                  return cursor.continue();
                }
              }else if(Array.isArray(filter)){
                var kt = true;
                for(var f of filter){
                  if(typeof f=="function"){
                    if(!f(cursor.value)){
                      return cursor.continue();
                    }
                  }else if(typeof f=="object"){
                    typeof defineNormal=="function"&&defineNormal(f);
                    for(var k of Object.keys(f)){
                      if(typeof f[k]=="function"){
                        if(!f[k](cursor.value)){
                          cursor.continue();
                        }
                      }else if(Array.isArray(f[k])){
                        if(!f[k].includes(cursor.value[k])){
                          cursor.continue();
                        }
                      }else{
                        if(cursor.value[k]!=f[k]){
                          cursor.continue();
                        }
                      }
                    }
                  }
                }
              }else{
                var f = filter;
                typeof defineNormal=="function"&&defineNormal(f);
                for(var k of Object.keys(f)){
                  if(typeof f[k]=="function"){
                    if(!f[k](cursor.value[k])){
                      return cursor.continue();
                    }
                  }else if(Array.isArray(f[k])){
                    if(!f[k].includes(cursor.value[k])){
                      return cursor.continue();
                    }
                  }else{
                    if(cursor.value[k]!=f[k]){
                      return cursor.continue();
                    }
                  }
                }
              }
              rs.push(cursor.value);
              cursor.continue();
            } else {
              typeof callback=="function"&&callback(rs);
              return r(rs);;
            }
          };
        });
      });
    });
  }
  self.dels=async(ids,callback)=>{
    self.connect(store=>{
      if(["string","number"].includes(typeof ids)){
        ids=[ids];
      }
      var all = [];
      ids.forEach(f=>{
        all.push(new Promise(r=>{
          var rs = store.delete([f]);
          rs.onsuccess = ()=>{
            r(rs);
          }
          rs.error = ()=>{
            r();
          }
        }));
      });
      Promise.all(all).then(callback);
    });
  }
}

function deleleDB(dbname){
  indexedDB.deleteDatabase(dbname)
}
//////////////End IndexedDB2////////////////////////////////////////////////////

