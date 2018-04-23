  var db = require('../tcp/class/db.js');
  var dbObj = new db("mongodb://127.0.0.1:27017/","gps");
  var dbok = false;
	
	function convTime(inp){
		var options = {
				timeZone: "Asia/Tehran",
				year: 'numeric', month: 'numeric', day: 'numeric',
				hour: 'numeric', minute: 'numeric', second: 'numeric'
		};

		var formatter = new Intl.DateTimeFormat([], options);

		var UTCTime = inp;
		var localTime = formatter.format(new Date(UTCTime));
		var currentTime = formatter.format(new Date()); 

		return localTime;
	}
	
  
  dbObj.connect().then(out => {
    console.log('DBOK');
    dbObj.db = out.db;
    dbObj.dbo = out.dbo;
    dbok = true;
		/*
		dbObj.getCars().then(result => {
			console.log('result',result);
			dbObj.disconnect();
		});
		*/
		
    dbObj.getSerials().then(result => {
			let da,ndate;
			for(var i = 0;i < result.length;i++){
				da = result[i];
				result[i].localRegDate =  convTime(da.regdate);
// 				ndate = new Date(da.regdate);
// 				console.log('regdate',da.regdate,ndate);
			}
      console.log('result',result);
			
			dbObj.disconnect();
    }).catch(err => {
      console.log('err',err);
			dbObj.disconnect();
		});
		
		/*
    dbObj.getSerialNumber('4109151535').then(result => {
      console.log('result',result);
			dbObj.disconnect();
    }).catch(err => {
      console.log('err',err);
			dbObj.disconnect();
		});
		*/
		/*
    dbObj.getSerialData('4109151535').then(result => {
      console.log('result',result);
			dbObj.disconnect();
    }).catch(err => {
      console.log('err',err);
			dbObj.disconnect();
		});
		*/

  }).catch(err => {
    console.log('DBERROR : ',err);
  });