//
//  XAppModuleMacros.h
//  RNProject
//
//  Created by ShiXiaoHui on 3/4/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#ifndef XAppModuleMacros_h
#define XAppModuleMacros_h

#pragma mark - Common ServiceId
#define kModuleCommonServiceConfig @"common_config"
#define kModuleCommonServiceSetConfig @"common_set_config"
#define kModuleCommonServiceVersion @"common_version"
#define kModuleCommonServiceEventList @"common_event_list"
#define kModuleCommonServiceCustomServiceList @"common_service_list"
#define kModuleCommonServiceDefaultConfig @"common_config"
#define kModuleCommonServiceConstantsToExport @"common_constants"
#define kModuleCommonServiceCanHandleService @"common_can_handle_service"
#define kModuleCommonServiceCanHandleEvent @"common_can_handle_event"
#define kModuleCommonServiceGetProperty @"common_get_property"
#define kModuleCommonServiceSetProperty @"common_set_property"

#define kViewModuleCommonServiceRootView @"common_view_root_view"
#define kViewModuleCommonServiceStyle @"common_view_style"
#define kViewModuleCommonServiceSetStyle @"common_view_set_style"

#define kViewManagerCommonServiceRootViewManager @"common_view_manager_root_view_manager"



#define kPAFFModuleErroDomain @"com.xapp.module"
#define kModuleSuccsessCode 0
#define kModuleErroCodeNoSupportModule 990001 //没有当前模块，使用前需要调用require ，结束需要调用finish
#define kModuleErroCodeNoSupportService 990002  //不支持此服务
#define kModuleErroCodeNoSupportProperty 990003 //不支持此属性
#define kModuleErroCodeNoSupportEvent 990004    //不支持此事件
#define kModuleErroCodeNoSupportPage 990005 //没有当前页面，使用前需要调用require ，结束需要调用finish

#define kModuleParamsKey @"data"

#endif /* XAppModuleMacros_h */
