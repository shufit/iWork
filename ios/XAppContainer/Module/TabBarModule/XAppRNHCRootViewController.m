//
//  XAppRNHCRootViewController.m
//  RNProject
//
//  Created by ShiXiaoHui on 17/4/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "XAppRNHCRootViewController.h"
#import <React/RCTBridge.h>

@interface XAppRNHCRootViewController ()
@property (nonatomic,strong) UIImageView* placeHolderImageView;
@end

@implementation XAppRNHCRootViewController


-(id)initWithModuleName:(NSString *)jsModuleName initialProperties:(NSDictionary *)initialProperties WithPlaceHolderImage:(UIImage *)image
{
  self = [super initWithModuleName:jsModuleName initialProperties:initialProperties];
  if(self)
  {
    self.uiInterfaceOrientation = UIInterfaceOrientationPortrait;
    if(image)
    {
      _placeHolderImageView = [UIImageView new];
      _placeHolderImageView.translatesAutoresizingMaskIntoConstraints = NO;
      _placeHolderImageView.image = image;
    }
  }
  return self;
}


- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
      [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(javaScriptDidLoad) name:RCTJavaScriptDidLoadNotification object:nil];
  
  if(_placeHolderImageView)
  {
    [self.view addSubview:_placeHolderImageView];
    [self.view addConstraints:[NSLayoutConstraint constraintsWithVisualFormat:@"V:|-0-[_placeHolderImageView]-0-|" options:0 metrics:nil views:NSDictionaryOfVariableBindings(_placeHolderImageView)]];
    [self.view addConstraints:[NSLayoutConstraint constraintsWithVisualFormat:@"H:|-0-[_placeHolderImageView]-0-|" options:0 metrics:nil views:NSDictionaryOfVariableBindings(_placeHolderImageView)]];
  }
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)javaScriptDidLoad {
  [_placeHolderImageView removeFromSuperview];
  [[NSNotificationCenter defaultCenter]removeObserver:self name:RCTJavaScriptDidLoadNotification object:nil];
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
