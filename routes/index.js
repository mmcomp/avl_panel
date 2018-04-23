var express = require('express');
var router = express.Router();
var user_id = -1;

/* Home page / index */
router.get('/', function(req, res, next) {
//   res.render('map', { title: 'Map Page' });
	if(req.cookies.AUTH){
		user_id = req.cookies.AUTH;
		let serialNumber = '';
		if(req.query.serialNumber){
			serialNumber = req.query.serialNumber;
			res.cookie('serialNumber', serialNumber);
		}
		res.render('index', { title: 'Express'});
		console.log('LOGED',req.cookies.AUTH);
		console.log('serialNumber',serialNumber);
	}else{
		res.render('login', { title: 'Login' });
	}
// 	console.log("Cookies :  ", req.cookies);
	
// 	res.cookie('AUTH' , '12');
  
});

/* Charts */
router.get('/flot', function(req, res, next) {
  res.render('flot', { title: 'Flot' });
});
router.get('/morris', function(req, res, next) {
  res.render('morris', { title: 'Morris' });
});

/* Dashboard */
router.get('/dashboard', function(req, res, next) {
  res.render('dashboard', { title: 'Dashboard' });
});

/*Tables*/
router.get('/tables', function(req, res, next) {
  var db = require('../../tcp/class/db.js');
  var dbObj = new db("mongodb://localhost:27017/","gps");
  var dbok = false;
  dbObj.connect().then(out => {
//     console.log('DBOK');
    dbObj.db = out.db;
    dbObj.dbo = out.dbo;
    dbok = true;
    dbObj.getSerials().then(result => {
// 			console.log(result);
      let table_rows = '';
      for(var i = 0;i < result.length;i++){
				if(result[i]._id){
					table_rows += '<tr class="'+(((i+1)%2==1)?'odd':'even')+' gradeX">';
					table_rows += '<td>'+(i+1)+'</td>';
					table_rows += '<td>'+((result[i].serialData.length>0)?result[i].serialData[0].name:'-')+'</td>';
					table_rows += '<td>'+((result[i].serialData.length>0)?result[i].serialData[0].description:'-')+'</td>';
					table_rows += '<td>'+result[i].pdate.split(' ')[0]+' | '+result[i].pdate.split(' ')[1]+'</td>';
					table_rows += '<td>'+result[i]._id+'</td>';
					table_rows += '<td><a href="javascript:window.parent.location=\'/?serialNumber='+result[i]._id+'&\';" class="fa fa-location-arrow"> نمایش</a></td>';
					table_rows += '</tr>';
				}
			}
      res.render('tables', { title: 'لیست دستگاه ها' , result: table_rows, err: 'null'});
    }).catch(err => {
      res.render('tables', { title: 'لیست دستگاه ها' , result: '', err: JSON.stringify(err)});
		});
    
  }).catch(err => {
    console.log('DBERROR : ',err);
    res.render('tables', { title: 'لیست دستگاه ها' });
  });
});

/*Cars*/
router.get('/cars', function(req, res, next) {
  var db = require('../../tcp/class/db.js');
  var dbObj = new db("mongodb://localhost:27017/","gps");
  var dbok = false;
  dbObj.connect().then(out => {
//     console.log('DBOK');
    dbObj.db = out.db;
    dbObj.dbo = out.dbo;
    dbok = true;
    dbObj.getCars().then(result => {
// 			console.log(result);
      let table_rows = '';
      for(var i = 0;i < result.length;i++){
				table_rows += '<tr class="'+(((i+1)%2==1)?'odd':'even')+' gradeX">';
        table_rows += '<td>'+(i+1)+'</td>';
        table_rows += '<td>'+(result[i].name)+'</td>';
        table_rows += '<td>'+(result[i].description)+'</td>';
//         table_rows += '<td>'+result[i].pdate.split(' ')[0]+' | '+result[i].pdate.split(' ')[1]+'</td>';
        table_rows += '<td>'+result[i].serialNumber+'</td>';
        table_rows += '<td><a href="javascript:&\';" class="fa fa-pencil"></a> <a href="javascript:&\';" class="fa fa-trash" style="color:red;"></a></td>';
        table_rows += '</tr>';
			}
      res.render('cars', { title: 'مشخصات دستگاه ها' , result: table_rows, err: 'null'});
    }).catch(err => {
      res.render('cars', { title: 'مشخصات دستگاه ها' , result: '', err: JSON.stringify(err)});
		});
    
  }).catch(err => {
    console.log('DBERROR : ',err);
    res.render('cars', { title: 'مشخصات دستگاه ها' , result: '', err: JSON.stringify(err)});
  });
});

/*Paths*/
router.get('/paths', function(req, res, next) {
  var db = require('../../tcp/class/db.js');
  var dbObj = new db("mongodb://localhost:27017/","gps");
  var dbok = false;
  dbObj.connect().then(out => {
//     console.log('DBOK');
    dbObj.db = out.db;
    dbObj.dbo = out.dbo;
    dbok = true;
    dbObj.getCars().then(result => {
// 			console.log(result);
      let table_rows = '';
      for(var i = 0;i < result.length;i++){
				table_rows += '<tr class="'+(((i+1)%2==1)?'odd':'even')+' gradeX">';
        table_rows += '<td>'+(i+1)+'</td>';
        table_rows += '<td>'+(result[i].name)+'</td>';
        table_rows += '<td>'+(result[i].description)+'</td>';
//         table_rows += '<td>'+result[i].pdate.split(' ')[0]+' | '+result[i].pdate.split(' ')[1]+'</td>';
        table_rows += '<td>'+result[i].serialNumber+'</td>';
        table_rows += '<td><a href="javascript:&\';" class="fa fa-pencil"></a> <a href="javascript:&\';" class="fa fa-trash" style="color:red;"></a></td>';
        table_rows += '</tr>';
			}
      res.render('paths', { title: 'مشاهده مسیرهای پیموده شده' , result: table_rows, err: 'null'});
    }).catch(err => {
      res.render('paths', { title: 'مشاهده مسیرهای پیموده شده' , result: '', err: JSON.stringify(err)});
		});
    
  }).catch(err => {
    console.log('DBERROR : ',err);
    res.render('paths', { title: 'مشاهده مسیرهای پیموده شده' , result: '', err: JSON.stringify(err)});
  });
});

/*Forms*/
router.get('/forms', function(req, res, next) {
  res.render('forms', { title: 'Forms' });
});

/*UI Elements*/
router.get('/panels-wells', function(req, res, next) {
  res.render('panels-wells', { title: 'Panels and Wells' });
});
router.get('/buttons', function(req, res, next) {
  res.render('buttons', { title: 'Buttons' });
});
router.get('/notifications', function(req, res, next) {
  res.render('notifications', { title: 'Notifications' });
});
router.get('/typography', function(req, res, next) {
  res.render('typography', { title: 'Typography' });
});
router.get('/icons', function(req, res, next) {
  res.render('icons', { title: 'Icons' });
});
router.get('/grid', function(req, res, next) {
  res.render('grid', { title: 'Grid' });
});

/*Sample Pages*/
router.get('/map', function(req, res, next) {
	let params = { title: 'نقشه' , startLocation : 'null', serials: '[]', selectedSerial: ''};	
	var db = require('../../tcp/class/db.js');
	var dbObj = new db("mongodb://localhost:27017/","gps");
	var dbok = false;
	dbObj.connect().then(out => {
		console.log('DBOK');
		dbObj.db = out.db;
		dbObj.dbo = out.dbo;
		dbok = true;
		dbObj.getSerials().then(result => {
			params.serials = JSON.stringify(result);
			if(req.cookies.serialNumber){
				dbObj.getSerialNumber(req.cookies.serialNumber).then(result => {
          params.selectedSerial = req.cookies.serialNumber;
// 					console.log('result',result);
					if(result[0]){
						params.startLocation = JSON.stringify(result[0]);
					}
					res.render('map', params);
					dbObj.disconnect();
				}).catch(err => {
					console.log('err',err);
					res.render('map', params);
					dbObj.disconnect();
				});
			}else{
				res.render('map', params);
				dbObj.disconnect();
			}
		}).catch(err => {
			console.log('err',err);
			res.render('map', params);
			dbObj.disconnect();
		});
	});
	
  
});
router.get('/blank', function(req, res, next) {
  res.render('blank', { title: 'Blank Page' });
});
router.get('/login', function(req, res, next) {
	res.clearCookie('AUTH');
	res.clearCookie('serialNumber');
  res.render('login', { title: 'Login' });
});

/*AJAX*/
router.post('/', function(req, res, next) {
  console.log('POST',req.body);
	let username = req.body.username;
	let password = req.body.password;
	if(username==='admin' && password==='admin'){
		console.log('add cookie');
		res.cookie('AUTH', '12');
  	res.render('index', { title: 'Express' });
	}else{
		res.render('login', { title: 'Login' });
	}
});
router.post('/ajax', function(req, res, next) {
  console.log(req.body);
  res.render('ajax', { data: 'salam' });
});


module.exports = router;
