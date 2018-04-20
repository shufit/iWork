//
//  DeviceMacros.h
//  Pods 我们的常用宏//master
//
//  Created by bolei on 15-2-4.
//
//

#ifndef DeviceMacros_h
#define DeviceMacros_h



#import "UIColor-Adaptive.h"
//#import "UIImage+Module.h"
#import "XAppModuleMacros.h"

//便利宏
#define XAPP_COLOR_FOR_KEY(__x) [UIColor colorWithHexString: __x]
#define XAPP_SYS_FONT_FOR_SIZE(__x) [UIFont systemFontOfSize: __x] //系统字体
//平方字体
#define PINGFANG_FONT_FOR_SIZE(__x) ([UIFont fontWithName:@"PingFangSC-Light" size: __x]?[UIFont fontWithName:@"PingFangSC-Light" size: __x]:[UIFont systemFontOfSize: __x])

#define PINGFANG_REGULAR_FONT_FOR_SIZE(__x) ([UIFont fontWithName:@"PingFangSC-Regular" size: __x]?[UIFont fontWithName:@"PingFangSC-Regular" size: __x]:[UIFont systemFontOfSize: __x])
//纤细字体
#define XAPP_HelveticaNeue_Light_FOR_SIZE(__x) ([UIFont fontWithName:@"HelveticaNeue-Light" size: __x]?[UIFont fontWithName:@"HelveticaNeue-Light" size: __x]:[UIFont systemFontOfSize: __x])

/*
 *  System Versioning Preprocessor Macros
 */
#define SYSTEM_VERSION_EQUAL_TO(v)                  ([[[UIDevice currentDevice] systemVersion] compare:v options:NSNumericSearch] == NSOrderedSame)
#define SYSTEM_VERSION_GREATER_THAN(v)              ([[[UIDevice currentDevice] systemVersion] compare:v options:NSNumericSearch] == NSOrderedDescending)
#define SYSTEM_VERSION_GREATER_THAN_OR_EQUAL_TO(v)  ([[[UIDevice currentDevice] systemVersion] compare:v options:NSNumericSearch] != NSOrderedAscending)
#define SYSTEM_VERSION_LESS_THAN(v)                 ([[[UIDevice currentDevice] systemVersion] compare:v options:NSNumericSearch] == NSOrderedAscending)
#define SYSTEM_VERSION_LESS_THAN_OR_EQUAL_TO(v)     ([[[UIDevice currentDevice] systemVersion] compare:v options:NSNumericSearch] != NSOrderedDescending)

#define iPhone4 ([UIScreen instancesRespondToSelector:@selector(currentMode)] ? CGSizeEqualToSize(CGSizeMake(640, 960), [[UIScreen mainScreen] currentMode].size) : NO)

#define iPhone5 ([UIScreen instancesRespondToSelector:@selector(currentMode)] ? CGSizeEqualToSize(CGSizeMake(640, 1136), [[UIScreen mainScreen] currentMode].size) : NO)

#define iPhone6Plus ([UIScreen instancesRespondToSelector:@selector(currentMode)] ? CGSizeEqualToSize(CGSizeMake(1242,2208), [[UIScreen mainScreen] currentMode].size) : NO)
#define iPhone6 ([UIScreen instancesRespondToSelector:@selector(currentMode)] ? CGSizeEqualToSize(CGSizeMake(750,1334), [[UIScreen mainScreen] currentMode].size) : NO)

#define iPhoneX ([UIScreen instancesRespondToSelector:@selector(currentMode)] ? CGSizeEqualToSize(CGSizeMake(1125, 2436), [[UIScreen mainScreen] currentMode].size) : NO)

//安全Release
#define RELEASE(__POINTER) { if (nil != (__POINTER)) { CFRelease(__POINTER); __POINTER = nil; } }

//color 宏
#define RGBCOLOR(r,g,b) [UIColor colorWithRed:(r)/255.0f green:(g)/255.0f blue:(b)/255.0f alpha:1]

#define RGBACOLOR(r,g,b,a) [UIColor colorWithRed:(r)/255.0f green:(g)/255.0f blue:(b)/255.0f \
alpha:(a)]

#define BR_RELEASE_SAFELY(__POINTER) { [__POINTER release]; __POINTER = nil; }
#define BR_INVALIDATE_TIMER(__TIMER) { [__TIMER invalidate]; __TIMER = nil; }

/*
 *屏幕宽度
 */
#define SCREEN_WIDTH ([[UIScreen mainScreen]bounds].size.width)

/*
 *屏幕高度
 */

#define SCREEN_HEIGHT ([[UIScreen mainScreen]bounds].size.height)

/*
 * iPhone statusbar 高度
 */
#define PHONE_STATUSBAR_HEIGHT 20

#define NAV_BAR_HEIGHT 44
#define TAB_BAR_HEIGHT 49

/*
 * iPhone 屏幕尺寸
 */
#define PHONE_SCREEN_SIZE (CGSizeMake(SCREEN_WIDTH, SCREEN_HEIGHT - PHONE_STATUSBAR_HEIGHT))
#define isPad (UI_USER_INTERFACE_IDIOM() == UIUserInterfaceIdiomPad)

/*
 * XAPP标准间距 A a
 */
#define XAPP_LENGTH_A(num)  (SCREEN_WIDTH / 12 * num)
#define XAPP_LENGTH_a(num)  (XAPP_LENGTH_A(1) / 5 * num)

// 获取系统版本号
#ifndef IOS_VERSION
#define IOS_VERSION [[[UIDevice currentDevice] systemVersion] floatValue]
#endif

/*
 * iOS系统版本判断：
 */
#define IOS7_OR_LATER	( [[[UIDevice currentDevice] systemVersion] compare:@"7.0"] != NSOrderedAscending )
#define IOS_VERSION_8_ABOVE (([[[UIDevice currentDevice] systemVersion] floatValue] >=8.0)? (YES):(NO))
#define IOS9_OR_LATER	( [[[UIDevice currentDevice] systemVersion] compare:@"9.0"] != NSOrderedAscending )

/*
 * rgb颜色转换（16进制->10进制）
 */
#define UIColorFromRGB(rgbValue) [UIColor colorWithRed:((float)((rgbValue & 0xFF0000) >> 16))/255.0 green:((float)((rgbValue & 0xFF00) >> 8))/255.0 blue:((float)(rgbValue & 0xFF))/255.0 alpha:1.0]

#define IS_IPHONE_5 ( fabs( ( double )[ [ UIScreen mainScreen ] bounds ].size.height - ( double )568 ) < DBL_EPSILON )


#define XAPP_ScreenBounds         [[UIScreen mainScreen] bounds]
#define XAPP_ScreenSize           [[UIScreen mainScreen] bounds].size                 //(e.g. 320,480)
#define XAPP_ScreenWidth          [[UIScreen mainScreen] bounds].size.width           //(e.g. 320)
#define XAPP_ScreenHeight         [[UIScreen mainScreen] bounds].size.height
#define XAPP_ScreenScale          [UIScreen mainScreen].scale

//#define XAPP_IMAGE(__NAME__) [UIImage imageForKey:__NAME__ moduleId:@"XAPPFFAppBaseModule"]

#define XAPP_COLOR(r,g,b) [UIColor colorWithRed:r/255.0 green:g/255.0 blue:b/255.0 alpha:1.0]
#define XAPP_COLOR_ALPHA(r,g,b,a) [UIColor colorWithRed:r/255.0 green:g/255.0 blue:b/255.0 alpha:a]
#define XAPP_COLOR_HEX(__NAME__) [UIColor colorWithHexString:__NAME__]

#define XAPP_FONT_CHINESE(__SIZE__,__BOLD__) (__BOLD__?[UIFont fontWithName:@"STHeitiSC-Medium" size:__SIZE__]:[UIFont fontWithName:@"STHeitiTC-Light" size:__SIZE__])
#define XAPP_FONT_ENGLISH(__SIZE__,__BOLD__) (__BOLD__?[UIFont fontWithName:@"HelveticaNeue-Bold" size:__SIZE__]:[UIFont fontWithName:@"HelveticaNeue" size:__SIZE__])

//主题相关宏定义
#define XAPPFontSizeD1 XAPP_Font_Fun(38)  //用于banner、需强调文字
#define XAPPFontSizeD2 XAPP_Font_Fun(24)  //重要金融数字
#define XAPPFontSizeD3 XAPP_Font_Fun(22)  //次重要金融数字，数字后单位
#define XAPPFontSizeH1 XAPP_Font_Fun(18)  //模块标题，列表重点
#define XAPPFontSizeH2 XAPP_Font_Fun(17)  //导航栏标题，输入框文字，按钮文字
#define XAPPFontSizeH3 XAPP_Font_Fun(16)  //次要标题，分类标题，返回，关闭
#define XAPPFontSizeT1 XAPP_Font_Fun(14)   //列表次要信息，长文本
#define XAPPFontSizeT2 XAPP_Font_Fun(13)   //说明性文字、备注
#define XAPPFontSizeT3 XAPP_Font_Fun(11)   //特殊情况使用
#define XAPPFontSizeT4 XAPP_Font_Fun(10)   //特殊情况使用

#define XAPP_Font_Fun(value) ((value) / 360.0 * MIN(SCREEN_WIDTH, SCREEN_HEIGHT))

#endif
