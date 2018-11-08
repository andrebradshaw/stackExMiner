function vld(elm,n){if(elm != null){return elm[n];}else{return '';}}
var nameArr = ["Aaron","Abigail","Adam","Adrian","Adrienne","Aimee","Alan","Albert","Alejandro","Alex","Alexander","Alexandra","Alexis","Alice","Alicia","Alisha","Alison","Allen","Allison","Alyssa","Amanda","Amber","Amy","Ana","Andre","Andrea","Andrew","Angel","Angela","Angelica","Angie","Anita","Ann","Anna","Anne","Annette","Anthony","Antonio","April","Arthur","Ashlee","Ashley","Audrey","Austin","Autumn","Barbara","Barry","Becky","Benjamin","Beth","Bethany","Betty","Beverly","Billy","Blake","Bobby","Bonnie","Brad","Bradley","Brandi","Brandon","Brandy","Brenda","Brendan","Brent","Brett","Brian","Brianna","Bridget","Brittany","Brittney","Brooke","Bruce","Bryan","Caitlin","Caleb","Calvin","Cameron","Candace","Candice","Carl","Carla","Carlos","Carmen","Carol","Caroline","Carolyn","Carrie","Casey","Cassandra","Cassie","Catherine","Cathy","Chad","Charles","Chase","Chelsea","Cheryl","Chris","Christian","Christie","Christina","Christine","Christopher","Christy","Cindy","Claudia","Clayton","Clifford","Clinton","Cody","Colin","Colleen","Connie","Corey","Cory","Courtney","Craig","Cristina","Crystal","Curtis","Cynthia","Dale","Damon","Dana","Daniel","Danielle","Danny","Darrell","Darren","David","Dawn","Dean","Deanna","Deborah","Debra","Denise","Dennis","Derek","Derrick","Desiree","Devin","Diana","Diane","Dominique","Donald","Donna","Doris","Dorothy","Douglas","Drew","Duane","Dustin","Dwayne","Dylan","Ebony","Eddie","Edward","Edwin","Elizabeth","Emily","Emma","Eric","Erica","Erik","Erika","Erin","Ernest","Ethan","Eugene","Evan","Evelyn","Felicia","Fernando","Frances","Francisco","Frank","Frederick","Gabriel","Garrett","Gary","Geoffrey","George","Gerald","Gina","Glenn","Gloria","Grace","Grant","Gregory","Hannah","Harold","Harry","Heather","Hector","Heidi","Helen","Henry","Holly","Howard","Ian","Isaac","Jack","Jaclyn","Jacob","Jacqueline","Jaime","James","Jamie","Jane","Janet","Janice","Jared","Jasmine","Jason","Javier","Jay","Jean","Jeanette","Jeff","Jeffery","Jeffrey","Jenna","Jennifer","Jenny","Jeremiah","Jeremy","Jermaine","Jerome","Jerry","Jesse","Jessica","Jesus","Jill","Jillian","Jimmy","Joan","Joanna","Jodi","Jody","Joe","Joel","John","Johnathan","Johnny","Jon","Jonathan","Jonathon","Jordan","Jorge","Jose","Joseph","Joshua","Joy","Joyce","Juan","Judith","Judy","Julia","Julian","Julie","Justin","Kara","Karen","Kari","Katelyn","Kath","Katherine","Kathleen","Kathryn","Kathy","Katie","Katrina","Kayla","Keith","Kelli","Kellie","Kelly","Kelsey","Kendra","Kenneth","Kerri","Kerry","Kevin","Kim","Kimberly","Krista","Kristen","Kristi","Kristie","Kristin","Kristina","Kristine","Kristopher","Kristy","Krystal","Kurt","Kyle","Lacey","Lance","Larry","Latasha","Latoya","Laura","Lauren","Laurie","Lawrence","Leah","Lee","Leonard","Leslie","Linda","Lindsay","Lindsey","Lisa","Logan","Lori","Louis","Lucas","Luis","Luke","Lynn","Madison","Mallory","Mandy","Manuel","Marc","Marcus","Margaret","Maria","Marie","Marilyn","Mario","Marissa","Mark","Martha","Martin","Marvin","Mary","Mathew","Matthew","Maurice","Meagan","Megan","Meghan","Melanie","Melinda","Melissa","Melvin","Meredith","Michael","Micheal","Michele","Michelle","Miguel","Mindy","Miranda","Misty","Mitchell","Molly","Monica","Monique","Morgan","Nancy","Natalie","Natasha","Nathan","Nathaniel","Neil","Nicholas","Nichole","Nick","Nicole","Nina","Noah","Olivia","Omar","Oscar","Pamela","Patricia","Patrick","Paul","Paula","Peter","Philip","Phillip","Priscilla","Rachael","Rachel","Ralph","Randall","Randy","Raymond","Rebecca","Rebekah","Regina","Reginald","Renee","Rhonda","Ricardo","Richard","Ricky","Robert","Roberto","Robin","Robyn","Rodney","Roger","Ronald","Ronnie","Rose","Ross","Roy","Ruben","Russell","Ruth","Ryan","Sabrina","Samantha","Samuel","Sandra","Sara","Sarah","Scott","Sean","Sergio","Seth","Shane","Shannon","Sharon","Shaun","Shawn","Shawna","Sheena","Sheila","Shelley","Shelly","Sheri","Sherri","Sherry","Shirley","Sonia","Sonya","Spencer","Stacey","Stacie","Stacy","Stanley","Stefanie","Stephanie","Stephen","Steve","Steven","Susan","Suzanne","Tabitha","Tamara","Tammy","Tanya","Tara","Tasha","Taylor","Teresa","Terrance","Terrence","Terri","Terry","Theodore","Theresa","Thomas","Tiffany","Timothy","Tina","Todd","Tommy","Toni","Tony","Tonya","Tracey","Traci","Tracie","Tracy","Travis","Trevor","Tricia","Troy","Tyler","Tyrone","Valerie","Vanessa","Veronica","Victor","Victoria","Vincent","Virginia","Walter","Wanda","Wayne","Wendy","Wesley","Whitney","William","Willie","Yolanda","Yvonne","Zac"];


var outArrObj = [];

var items = JSON.parse(document.body.innerText).items;
var s_geo = "dallas";
var regXgeo = new RegExp(s_geo, "i");
for(i=0; i<items.length; i++){
	let geo = jpReady(items[i].location);
	let about = items[i].about_me;
	let twitter = jpReady(vld(/(?<=twitter\.com\/)\w+|(?<=twitter.{0,10}?\(at\))\w+|(?<=twitter.{0,10}?@)\w+/.exec(about),0));
	let email = jpReady(vld(/(?<=>|\s)\S+@\w+\.\S+(?=<)/.exec(about),0));
	let weblinks = cleanMatches(about);
	
	if(regXgeo.test(geo) === true){
		outArrObj.push({"fn": items[i].display_name, "geo": geo, "id": items[i].user_id, "cd": items[i].creation_date, "git": items[i].link, "tw": twitter, "em": email, "web": weblinks});
	}
}

console.log(outArrObj);

function jpReady(str){
if(str != undefined){
	return str.replace(/\?/g, '_QST_').replace(/\&/g, '_AMP_').replace(/\#/g, '_HSH_');
}else{return '';}
}

function cleanMatches(str){
	if(str != undefined){
		let matches = str.match(/(?<=<a href="http.{0,1}:\/\/).+?(?=")/g);
		if(matches != null){
			let arr = Array.from(matches).map(el=>{ return jpReady(el.replace(/\/$/, '').replace(/.+wikipedia.+|.+www.w3.org.+|.+microsoft.com.+/g, ''));});
			return arr.filter(String);
		}else{return '';}
	}else{return '';}
}
