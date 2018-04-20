//
//  XAppNavigatorProtocol.h
//  RNProject
//
//  Created by ShiXiaoHui on 4/4/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#ifndef XAppNavigatorProtocol_h
#define XAppNavigatorProtocol_h
#endif /* XAppNavigatorProtocol_h */

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@protocol XAppNavigatorProtocol <NSObject>

@property (nonatomic, strong ,readonly) UINavigationController *navigationController;
@property (nonatomic, strong ,readonly) UIViewController *rootViewController;
@property (nonatomic, assign) BOOL waitNavigation;


- (UIViewController *)visibleViewController;

//打开rootController
- (void)openRootViewController;

/*
 * 先pop到classname对应的controller，然后再把controller压进去，使用navCtrl来遍历
 */

@optional
- (void)pushToTopClassName:(NSString *)className
            withController:(UIViewController *)controller
   andNavigationController:(UIViewController *)navCtrl;

/**
 *  @brief  pop 顶部controller 然后push controller
 *
 *  @param   controller   需要pushcontroller
 *  @param   navCtrl   navCtrl
 */
- (void)pushViewControllerAndClearTopWithContoller:(UIViewController *)controller
                           andNavigationController:(UINavigationController *)navCtrl
                                          animated:(BOOL)animated;

- (void)popToViewControllerWithClassName:(NSString *)className
                 andNavigationController:(UINavigationController *)navCtrl
                                animated:(BOOL)animated;

// Pop到NavigationController的导航栈中从栈顶第index个controller，index从0开始，即0为当前界面，index=1相当于goBack，index大于等于导航栈的大小则popToRoot
- (void)popToViewControllerWithTopIndex:(NSUInteger)index
                andNavigationController:(UINavigationController *)navCtrl
                               animated:(BOOL)animated;
@end
