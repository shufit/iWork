//
//  XAppBaseViewController.h
//  RNProject
//
//  Created by ShiXiaoHui on 13/4/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "XAppModulePageProtocol.h"

typedef void(^ClickBlock)(void);
typedef void(^CloseBtnClickBlock)(void);

@interface XAppBaseViewController : UIViewController <XAppModulePageProtocol>
{
  BOOL _hideNavBar;
}

@property (nonatomic,assign) BOOL hideNavBar;
@property (nonatomic) UIButton *backButton;
@property (nonatomic,strong) UIButton *baseCloseButton;

@property (nonatomic, strong) NSString *backCallbackID;   //返回按钮callbackID
@property (nonatomic, assign) BOOL backButtonHidden;      //返回按钮是否隐藏

@property (nonatomic, strong) NSString *pageId;
@property (nonatomic, strong) NSDictionary *pageConfig;

@property (nonatomic, assign) BOOL showCloseButton;
@property (nonatomic, copy) CloseBtnClickBlock closeBtnClickBlock;

@property (nonatomic, copy) NSString *callbackId;

@property(nonatomic) NSInteger statusBarStyle;


/**
 *  隐藏网络错误提示界面
 */
- (void)hideNetErrorView;

/**
 *  显示网络错误界面
 */
- (void)showNetErrorViewWithClickBlock:(void (^)(void))clickBlock;

//返回按钮点击后触发
- (void)handleReturnBtnPressed:(id)sender;

//传递json参数，用于rn跳转到native页面传参
- (void)setParameter:(NSString *)parameterJson;

/**
 *  natigationBar 添加右buttonItem
 *
 *  @param barButtonItem barButtonItem
 */
- (void)addRightBarButtonItem:(UIBarButtonItem *)barButtonItem;


- (void)updateNavBar;


@end
