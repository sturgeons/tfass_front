<?php
use think\Route;

Route::miss(function () {
    return '';
});//跨域处理字段
Route::get('/', 'api/v1.Index/index');
//登录
Route::post('/login', 'api/v1.User/login');
//检查是否登录
Route::post('/checklogin', 'api/v1.User/checkUser');
//获取用户列表
Route::get('/getUserList', 'api/v1.Index/getUserList');
//获取发泡箱信息
Route::get('/getFoamingBox/:id', 'api/v1.FoamingShiftReport/getFoamingBoxInfo');
//获取发泡节拍
Route::get('/getFoamingCT/:id', 'api/v1.FoamingShiftReport/getFoamingCT');
//获取发泡废品类型
Route::get('/getFoamingCT/:id', 'api/v1.FoamingShiftReport/getFoamingCT');

//分层审核
Route::group('getLPA', function () {
    Route::get('area/:id', 'api/v1.LayerProcessAudit/getArea');//获取审核区域
    Route::get('getActiveArea', 'api/v1.LayerProcessAudit/getActiveArea');//获取有效审核区域
    Route::post('addArea', 'api/v1.LayerProcessAudit/addArea');//添加审核区域
    Route::post('changeActiveArea/:id', 'api/v1.LayerProcessAudit/changeActiveArea');//修改审核区域状态
    Route::get('checklist/:id', 'api/v1.LayerProcessAudit/getChecklist');//获取审核清单
    Route::get('getChecklistByArea/:id', 'api/v1.LayerProcessAudit/getChecklistByArea');//获取审核清单
    Route::get('getFullChecklistByArea', 'api/v1.LayerProcessAudit/getFullChecklistByArea');//根据区域获取审核单 包含全部审核单
    Route::post('getChangeChecklistByArea', 'api/v1.LayerProcessAudit/getChangeChecklistByArea');//根据区域升级审核表适用
    Route::post('updateChecklist', 'api/v1.LayerProcessAudit/updateChecklist');//更新审核清单
    //或完整的审核表和相关信息 包括区域名和审核单 和审核单的相关信息包含未完成的分层审核时所提交的照片
    Route::get('fullChecklist/:id', 'api/v1.LayerProcessAudit/getFullChecklist');//获取完整的分层审核表
    Route::post('addChecklist', 'api/v1.LayerProcessAudit/addChecklist');//获取完整的分层审核表
    Route::get('checklistArea/:id', 'api/v1.LayerProcessAudit/getCheckArea');//根据审核单检索审核区域
    Route::get('Plan/:id', 'api/v1.LayerProcessAudit/getPlan');//获取审核计划
    Route::post('delPlan', 'api/v1.LayerProcessAudit/delPlan');//删除取审核计划
    Route::get('Plan/month', 'api/v1.LayerProcessAudit/getPlanByMonth');//获取审核计划--一个月
    Route::get('user/:id', 'api/v1.LayerProcessAudit/getUser');//获取审核员
    Route::post('addAuditor', 'api/v1.LayerProcessAudit/addAuditor');//添加审核员
    Route::post('updateArea', 'api/v1.LayerProcessAudit/updateArea');//跟新审核区域
    Route::get('delAuditor/:id', 'api/v1.LayerProcessAudit/delAuditor');//删除审核员
    Route::get('question/:id', 'api/v1.LayerProcessAudit/getQuestion');//获取问题审核
    Route::get('finishAudit/:id', 'api/v1.LayerProcessAudit/getFinishAudit');//获取完成的审核单
    //根据每个用户的token 获取用户的审核计划
    Route::get('userPlan', 'api/v1.LayerProcessAudit/getUserPlan');//查找用户计划
    //获取用户已经审核的问题清单
    Route::get('getUserObserve', 'api/v1.LayerProcessAudit/getUserObserve');
    Route::post('addPlan', 'api/v1.LayerProcessAudit/addPlan');//添加审核计划
    Route::post('notify/:id', 'api/v1.LayerProcessAudit/notify');//发送审核计划通知
    //提交分层审核计划的审核结果
    Route::post('submit', 'api/v1.LayerProcessAudit/submit');//提交审核结果
    //提交照片到服务器 -分层审核的发现项
    Route::post('submitPic/:planId/:point', 'api/v1.LayerProcessAudit/savePicture');//提交问题照片
    Route::get('getPic/:id', 'api/v1.LayerProcessAudit/getPicture');//获取分层审核图片
    Route::get('reaudit/:planid', 'api/v1.LayerProcessAudit/reAduit');//重新审核
});
Route::get('/LPA/dashboard/observations', 'api/v1.LayerProcessAudit/observations');//获取分层审核状态
Route::get('/LPA/dashboard/getPlanCount', 'api/v1.LayerProcessAudit/getPlanCount');//获取分层审核状态
Route::get('/LPA/dashboard/getPersonEffective', 'api/v1.LayerProcessAudit/getPersonEffective');//获取分层审核状态

//检具管理
Route::group('gauge', function () {
    //获取检具清单
    Route::get('list','api/v1.Gauge/list');
    Route::post('updateFile','api/v1.Gauge/UpdateFile');
});

//年会投票
Route::group('vote', function () {
    //获取检具清单
    Route::get('result','api/v1.Vote/Getresult');
    Route::post('submit','api/v1.Vote/submit');
});

//方向盘打包
Route::group('swsPKG', function () {
    //获取检具清单
    Route::post('/record','api/v1.SwsPKG/recordCode');//打包主程序
    Route::get('/print/:id','api/v1.SwsPKG/prePrint');
    Route::get('/checkNeddUpdate','api/v1.SwsPKG/checkNeddUpdate');
    Route::post('/getTypeInfo','api/v1.SwsPKG/getTypeData');//获取零件号下的详细信息
    Route::get('/bindVocCotainer/:packid','api/v1.SwsPKG/bindVOCcontainer');
    Route::get('/removeVocCotainer/:id','api/v1.SwsPKG/removeVocCotainer');
    Route::get('/getVocAllInfo','api/v1.SwsPKG/getVocAllInfo');
    Route::get('/getProductList','api/v1.SwsPKG/getProductList');//获取产品列表
});