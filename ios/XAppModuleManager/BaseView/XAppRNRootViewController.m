//
//  XAppRNRootViewController.m
//  RNProject
//
//  Created by ShiXiaoHui on 16/4/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "XAppRNRootViewController.h"
#import "XAppRNRootView.h"

#define IS_IPHONEX (([[UIScreen mainScreen] bounds].size.height-812)?NO:YES)

@interface XAppRNRootViewController ()

@property(nonatomic, strong) NSString *jsModuleName;
@property(nonatomic, strong) NSDictionary *initialProperties;
@property(nonatomic, strong) XAppRNRootView *reactView;

@end

@implementation XAppRNRootViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    self.hideNavBar = YES;
    CGRect bounds = self.view.bounds;
    if (IS_IPHONEX) {
        bounds.size.height = self.view.bounds.size.height - 20;
    }
  
    self.reactView = [[XAppRNRootView alloc] initWithFrame:bounds withModuleName:self.jsModuleName initialProperties:self.initialProperties];
    self.reactView.autoresizingMask = UIViewAutoresizingFlexibleWidth|UIViewAutoresizingFlexibleHeight;
    [self.view addSubview:self.reactView];
}

- (void)viewWillAppear:(BOOL)animated {
  
  [super viewWillAppear:animated];
  UIInterfaceOrientation curOrientation = [UIApplication sharedApplication].statusBarOrientation;
  if (UIInterfaceOrientationIsLandscape(curOrientation)) {
    [[UIDevice currentDevice] setValue:
     [NSNumber numberWithInteger: self.uiInterfaceOrientation]
                                forKey:@"orientation"];
  }
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}


- (instancetype)initWithModuleName:(NSString *)jsModuleName initialProperties:(NSDictionary *) initialProperties {
  
  self = [super init];
  
  if (self) {
    
    NSMutableDictionary *properties = [[NSMutableDictionary alloc] initWithDictionary:initialProperties];
    [properties setObject:jsModuleName forKey:@"screen"];
    _initialProperties = properties;
    _jsModuleName = @"App";
    _uiInterfaceOrientation = UIInterfaceOrientationPortrait;
  }
  return self;
}

- (void)setParameter:(NSString *)parameterJson {
  NSData *jsonData = [parameterJson dataUsingEncoding:NSUTF8StringEncoding];
  NSError *err;
  NSDictionary *dic =
  [NSJSONSerialization JSONObjectWithData:jsonData options:NSJSONReadingMutableContainers error:&err];
  
  if (dic[@"jsModuleName"]) {
    _jsModuleName = dic[@"jsModuleName"];
  }
  
  if (dic[@"initialProperties"]) {
    _initialProperties = dic[@"initialProperties"];
  }
}



#pragma mark <Rotate>

- (BOOL)shouldAutorotate
{
  //所有RNViewController 默认不旋转,有个别需求的,请在子类中重载这3个方法
  return NO;
}

- (UIInterfaceOrientationMask)supportedInterfaceOrientations
{
  //所有ViewController 默认只支持竖屏朝上,有个别需求的,请在子类中重载这个方法
  return UIInterfaceOrientationMaskPortrait;
}

- (UIInterfaceOrientation)preferredInterfaceOrientationForPresentation
{
  return UIInterfaceOrientationPortrait;
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
