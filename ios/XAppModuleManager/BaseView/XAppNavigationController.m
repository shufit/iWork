//
//  XAppNavigationController.m
//  RNProject
//
//  Created by ShiXiaoHui on 16/4/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "XAppNavigationController.h"

#define kSystemDuration (.35f)

@interface XAppNavigationController ()

@end

@implementation XAppNavigationController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/


#pragma mark <Roate>
//屏幕是否旋转的控制权交给当前屏幕展示的ViewController

- (BOOL)shouldAutorotate
{
  return [self.topViewController shouldAutorotate];
}

- (UIInterfaceOrientationMask)supportedInterfaceOrientations{
  
  return [self.topViewController supportedInterfaceOrientations];
}

- (UIInterfaceOrientation)preferredInterfaceOrientationForPresentation
{
  return [self.topViewController preferredInterfaceOrientationForPresentation];
}

#pragma mark - Override
//重写push和present，用来控制返回

-(void)pushViewController:(UIViewController *)viewController animated:(BOOL)animated
{
  if (viewController.hidesBottomBarWhenPushed) {
    UIViewController *rootVC = ([UIApplication sharedApplication].delegate).window.rootViewController;
    if([self.viewControllers count] == 1){
      [self updateTabBarWithViewRootController:rootVC hidden:YES animated:YES];
    }
  }
  [super pushViewController:viewController animated:animated];
}

-(void)presentModalViewController:(UIViewController *)modalViewController animated:(BOOL)animated
{
  [super presentModalViewController:modalViewController animated:animated];
}

-(void)presentViewController:(UIViewController *)viewControllerToPresent animated:(BOOL)flag completion:(void (^)(void))completion
{
  [super presentViewController:viewControllerToPresent animated:flag completion:completion];
}

- (UIViewController *)popViewControllerAnimated:(BOOL)animated {
  if ([self.viewControllers indexOfObject:self.topViewController] == 1 ) {
    UIViewController *rootVC = ([UIApplication sharedApplication].delegate).window.rootViewController;
    [self updateTabBarWithViewRootController:rootVC hidden:NO animated:YES];
  }
  
  return [super popViewControllerAnimated:animated];
}

- (NSArray *)popToRootViewControllerAnimated:(BOOL)animated {
  UIViewController *rootVC = ([UIApplication sharedApplication].delegate).window.rootViewController;
  [self updateTabBarWithViewRootController:rootVC hidden:NO animated:NO];
  return [super popToRootViewControllerAnimated:animated];
}
-(NSArray *)popToViewController:(UIViewController *)viewController animated:(BOOL)animated
{
  UIViewController *rootVC = ([UIApplication sharedApplication].delegate).window.rootViewController;
  if (0 == [self.viewControllers indexOfObject:viewController]) {
    [self updateTabBarWithViewRootController:rootVC hidden:NO animated:NO];
  }
  return [super popToViewController:viewController animated:animated];
}

- (NSArray *)popToRootViewControllerAnimated:(BOOL)animated isShowTabbar:(BOOL)isShowTabbar{
  UIViewController *rootVC = ([UIApplication sharedApplication].delegate).window.rootViewController;
  [self updateTabBarWithViewRootController:rootVC hidden:NO animated:animated];
  return [super popToRootViewControllerAnimated:animated];
}


#pragma mark TabBar
- (void)updateTabBarWithViewRootController:(UIViewController *)rootVC hidden:(BOOL)hidden animated:(BOOL)animated{
  if ([rootVC respondsToSelector:@selector(setTabBarHidden:)] && [rootVC respondsToSelector:@selector(viewControllers)]) {
    NSArray *viewControllers = [rootVC performSelector:@selector(viewControllers)];
    if (![viewControllers containsObject:self]) {
      return;
    }
    
    if (animated) {
      [UIView animateWithDuration:kSystemDuration animations:^(void){
        [self setTabbarHidden:hidden rootViewController:rootVC];
      } completion:^(BOOL finish) {
        
      }];
    }else {
      [self setTabbarHidden:hidden rootViewController:rootVC];
    }
  }
}


- (void)setTabbarHidden:(BOOL)hidden rootViewController:(UIViewController *)vc {
  NSMethodSignature* signature = [[vc class] instanceMethodSignatureForSelector: @selector(setTabBarHidden:)];
  NSInvocation* invocation = [NSInvocation invocationWithMethodSignature: signature];
  [invocation setTarget: vc];
  [invocation setSelector: @selector(setTabBarHidden:)];
  [invocation setArgument: &hidden atIndex: 2];
  [invocation invoke];
}

@end























