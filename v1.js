function vld(elm, n) {    if (elm != null) {      return elm[n];    } else {      return '';    }  }

function jpReady(str) {    if (str != undefined) {      return str.replace(/\?/g, '_QST_').replace(/\&/g, '_AMP_').replace(/\#/g, '_HSH_');    } else {      return '';    }  }

function cleanMatches(str) {    if (str != undefined) {      let matches = str.match(/(?<=<a href="http.{0,1}:\/\/).+?(?=")/g);      if (matches != null) {        let arr = Array.from(matches).map(el => {          return jpReady(el.replace(/\/$/, '').replace(/.+wikipedia.+|.+www.w3.org.+|.+microsoft.com.+/g, ''));        });        return arr.filter(String);      } else {        return '';      }    } else {      return '';    }  }


var nameArr = ["Brittney", "Cristina", "Elizabeth"];

function opener(elm, n) {
  setTimeout(() => {
    var searchLink = "https://api.stackexchange.com/2.2/users?pagesize=99&order=desc&sort=reputation&inname=" + elm + "&site=stackoverflow&filter=XJ.7f)7Zg)UC4&page=3";

    var wnd = window.open(searchLink);
	
    setTimeout(() => {
      var outArrObj = [];
      var items = JSON.parse(wnd.document.body.innerText).items;
      var s_geo = "Boston";
      var regXgeo = new RegExp(s_geo, "i");
      for (i = 0; i < items.length; i++) {
        let geo = jpReady(items[i].location);
        let about = items[i].about_me;
        let twitter = jpReady(vld(/(?<=twitter\.com\/)\w+|(?<=twitter.{0,10}?\(at\))\w+|(?<=twitter.{0,10}?@)\w+/.exec(about), 0));
        let email = jpReady(vld(/(?<=>|\s)\S+@\w+\.\S+(?=<)/.exec(about), 0));
        let weblinks = cleanMatches(about);
        let stackLink = vld(/(?<=stackoverflow\.com\/users\/).+/.exec(items[i].link), 0);
        if (regXgeo.test(geo) === true) {
          outArrObj.push({
            "fn": items[i].display_name,
            "geo": geo,
            "id": items[i].user_id,
            "cd": items[i].creation_date,
            "st": stackLink,
            "tw": twitter,
            "em": email,
            "web": weblinks
          });
        }
      }

      var out = JSON.stringify(outArrObj);
      console.log(out);
	if(outArrObj.length > 0){
      var winjp = window.open("https://script.google.com/macros/s/AKfycbx67X5G-_PW9URN8JkxKAIZYYHSx0_23ukD2CQ9-Pt0Z5K33sjA/exec?o=" + out);
    }
      setTimeout(() => {
        winjp.close();
      }, 2000);
    }, 900);
    setTimeout(() => {
      wnd.close();
    }, ((n+1) * 2100));

  }, ((n+1) * 1000));
}
for (a = 0; a < nameArr.length; a++) {
  opener(nameArr[a], a);
}
