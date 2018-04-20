//
//  XAppBaseViewController.m
//  RNProject
//
//  Created by ShiXiaoHui on 13/4/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "XAppBaseViewController.h"
#import "XAppModuleManager+ModuleJump.h"
#import "UIColor-Adaptive.h"
#import "NSObject+ClassName.h"
#import "NSString+sizeWithFontInIOS7.h"
#import "UIImage+Module.h"
#import "DeviceMacros.h"
#import "Masonry.h"

#define kCommon_Nav_Back_Icon              @"common_nav_back"
#define kCommon_Nav_Back_Highlighted_Icon  @"common_nav_back_pre"
#define kBackgroundColor [UIColor colorWithHexString:@"#f7f7f7"]
#define kNetErrorImageWidth 125
#define kNetErrorImageHeight 130
#define kNavigatorBackItemTitle @"返回"
#define kNavigatorCloseItemTitle @"关闭"

@interface XAppBaseViewController ()


@property (nonatomic,strong) UIView * netErrorView;
@property (nonatomic,strong) ClickBlock clickBlock;
@property (nonatomic,strong) NSString *parameterJson;
@property (nonatomic, strong) UIBarButtonItem *backButtonItem;
@property (nonatomic, strong) UIBarButtonItem *closeButtonItem;

@end

@implementation XAppBaseViewController

- (instancetype)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil {
  self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
  if (self) {
    _statusBarStyle = -1;
  }
  return self;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    self.view.backgroundColor = kBackgroundColor;
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)dealloc
{
  [XApp_ModuleManager removeCallbackFromViewController:self];
}

- (void)viewWillAppear:(BOOL)animated {
  [super viewWillAppear:animated];
  [self setupNavBar];
  NSArray *vcArray = self.navigationController.viewControllers;
  if (vcArray != nil && [vcArray count] > 1) {
    _backButton.hidden = NO || _backButtonHidden; // 外部如何设置则以外部设置为主
  }else{
    _backButton.hidden = YES & _backButtonHidden;
    
  }
  
  if (self.statusBarStyle >= 0) {
    [[UIApplication sharedApplication] setStatusBarStyle:self.statusBarStyle];
  }else {
    [[UIApplication sharedApplication] setStatusBarStyle:0 animated:YES];
  }
}

- (void)viewWillDisappear:(BOOL)animated {
  [super viewWillDisappear:animated];
  self.navigationController.navigationBarHidden = NO;
  
  self.statusBarStyle = [[UIApplication sharedApplication] statusBarStyle];
}

- (void)setupNavBar {
  [self updateNavBar];
  
  self.automaticallyAdjustsScrollViewInsets = NO;
  self.edgesForExtendedLayout = UIRectEdgeNone;
  self.extendedLayoutIncludesOpaqueBars = NO;
  self.modalPresentationCapturesStatusBarAppearance = NO;
}

- (void)setShowCloseButton:(BOOL)showCloseButton
{
  _showCloseButton = showCloseButton;
  if(showCloseButton) {
    
    if(self.baseCloseButton == nil) {
      
      [self initBaseCloseButton];
      NSMutableArray *leftBarButtonItems = [NSMutableArray arrayWithArray:self.navigationItem.leftBarButtonItems];
      BOOL isExit = [leftBarButtonItems containsObject: self.closeButtonItem];
      if (isExit) {
        return;
      }
      [leftBarButtonItems addObject:_closeButtonItem];
      self.navigationItem.leftBarButtonItems = [leftBarButtonItems copy];
    }
    else {
      
      NSMutableArray *leftBarButtonItems = [NSMutableArray arrayWithArray:self.navigationItem.leftBarButtonItems];
      BOOL isExit = [leftBarButtonItems containsObject: self.closeButtonItem];
      if (isExit) {
        return;
      }
      [leftBarButtonItems addObject:_closeButtonItem];
      self.navigationItem.leftBarButtonItems = [leftBarButtonItems copy];
    }
  }
  else {
    if(self.baseCloseButton != nil) {
      
      NSMutableArray *leftBarButtonItems = [NSMutableArray arrayWithArray:self.navigationItem.leftBarButtonItems];
      BOOL isExit = [leftBarButtonItems containsObject: self.closeButtonItem];
      if(isExit) {
        
        [leftBarButtonItems removeObject:self.closeButtonItem];
        self.navigationItem.leftBarButtonItems = [leftBarButtonItems copy];
      }
      
    }
  }
  
}

- (void)initBaseCloseButton {
  
  self.baseCloseButton = [[UIButton alloc] init];
  [_baseCloseButton setTitle:kNavigatorCloseItemTitle
                    forState:UIControlStateNormal];
  [_baseCloseButton setTitleColor:[UIColor colorWithHexString:@"#ffffff"]
                         forState:UIControlStateNormal];
  [_baseCloseButton setTitleColor:[UIColor colorWithHexString:@"#52515c"]
                         forState:UIControlStateHighlighted];
  [_baseCloseButton addTarget:self
                       action:@selector(handleCloseBtnPressed:)
             forControlEvents:UIControlEventTouchUpInside];
  _baseCloseButton.titleLabel.font = PINGFANG_REGULAR_FONT_FOR_SIZE(16);
  
  CGSize backButtonSize = [kNavigatorBackItemTitle sizeWithAttributes:@{NSFontAttributeName: [UIFont fontWithName:_baseCloseButton.titleLabel.font.fontName size:_baseCloseButton.titleLabel.font.pointSize]}];
  _baseCloseButton.frame = CGRectMake(0, 0, backButtonSize.width, self.navigationController.navigationBar.frame.size.height);
  self.closeButtonItem = [[UIBarButtonItem alloc] initWithCustomView:_baseCloseButton];
}

- (void)addRightBarButtonItem:(UIBarButtonItem *)barButtonItem
{
  NSArray *rightBarButtonItems = self.navigationItem.rightBarButtonItems;
  NSMutableArray *mutableRightBarButtonItems = [NSMutableArray arrayWithArray:rightBarButtonItems];
  UIBarButtonItem *leadindFixedButton = [[UIBarButtonItem alloc] initWithBarButtonSystemItem:UIBarButtonSystemItemFixedSpace target:nil action:nil];
  leadindFixedButton.width = -XAPP_LENGTH_a(1);
  [mutableRightBarButtonItems addObject:leadindFixedButton];
  [mutableRightBarButtonItems addObject:barButtonItem];
  self.navigationItem.rightBarButtonItems = [mutableRightBarButtonItems copy];
}


- (UIView *)netErrorView{
  
  if (!_netErrorView) {
    
    UIView * netErrorView = [[UIView alloc] init];
    netErrorView.hidden = YES;
    netErrorView.backgroundColor = [UIColor whiteColor];
    _netErrorView = netErrorView;
    [self.view addSubview:netErrorView];
    [netErrorView mas_makeConstraints:^(MASConstraintMaker *make) {
      
      make.edges.equalTo(self.view);
    }];
    
    UIImageView * imageView = [[UIImageView alloc] init];
    [netErrorView addSubview:imageView];
    
    imageView.image = XAPP_MODULE_IMAGE(@"common_cannot_load",@"XAppModuleManager");
    [imageView mas_makeConstraints:^(MASConstraintMaker *make) {
      
      make.width.equalTo(@(kNetErrorImageWidth));
      make.height.equalTo(@(kNetErrorImageHeight));
      make.center.equalTo(netErrorView);
    }];
    
    UITapGestureRecognizer * gesture = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(netErrorClickAction)];
    
    [_netErrorView addGestureRecognizer:gesture];
  }
  
  return _netErrorView;
}

- (void)netErrorClickAction{
  
  [self hideNetErrorView];
  if (self.clickBlock) {
    self.clickBlock();
  }
}

- (void)hideNetErrorView{
  
  self.netErrorView.hidden = YES;
}

- (void)showNetErrorViewWithClickBlock:(void (^)(void))clickBlock{
  
  self.clickBlock = clickBlock;
  [self.view bringSubviewToFront:self.netErrorView];
  self.netErrorView.hidden = NO;
  
}
- (void)setBackButtonHidden:(BOOL)hidden {
  _backButtonHidden = hidden;
  self.backButton.hidden = hidden;
}

- (void)handleReturnBtnPressed:(id)sender {
  
  [self.navigationController popViewControllerAnimated:YES];
}

- (void)handleCloseBtnPressed:(id)sender{
  if(_closeBtnClickBlock){
    _closeBtnClickBlock();
  }
}

- (void)setParameter:(NSString *)parameterJson {
  
  self.parameterJson = parameterJson;
}



#pragma mark - Property
- (void)setTitle:(NSString *)title {
  [super setTitle:title];
}

- (void)updateNavBar {
  
  if (!_hideNavBar ) {
    UIColor *color = [UIColor colorWithHexString:@"#003C84"];
    
    self.navigationController.navigationBar.barTintColor = color;
    //RGB(255, 141, 65);
    self.navigationController.navigationBar.translucent = NO;
    
    if (self.backButton == nil) {
      UIImage *image = XAPP_MODULE_IMAGE(kCommon_Nav_Back_Icon,@"XAppModuleManager");
      UIImage *hlImage = XAPP_MODULE_IMAGE(kCommon_Nav_Back_Highlighted_Icon,@"XAppModuleManager");
      self.backButton = [[UIButton alloc] init];
      [_backButton setImageEdgeInsets:UIEdgeInsetsMake(0.0, -5, 0.0, 0.0)];
      [_backButton setImage:image
                   forState:UIControlStateNormal];
      [_backButton setImage:hlImage
                   forState:UIControlStateHighlighted];
      [_backButton addTarget:self
                      action:@selector(handleReturnBtnPressed:)
            forControlEvents:UIControlEventTouchUpInside];
      _backButton.titleLabel.font = PINGFANG_REGULAR_FONT_FOR_SIZE(16);
      [_backButton setTitle:kNavigatorBackItemTitle
                   forState:UIControlStateNormal];
      [_backButton setTitleColor:[UIColor colorWithHexString:@"#ffffff"]
                        forState:UIControlStateNormal];
      [_backButton setTitleColor:[UIColor colorWithHexString:@"#52515c"]
                        forState:UIControlStateHighlighted];
      
      CGSize backButtonSize = [kNavigatorBackItemTitle sizeWithAttributes:@{NSFontAttributeName: [UIFont fontWithName:_backButton.titleLabel.font.fontName size:_backButton.titleLabel.font.pointSize]}];
      _backButton.frame = CGRectMake(0, 0, backButtonSize.width + image.size.width + 5, self.navigationController.navigationBar.frame.size.height);
      self.backButtonItem = [[UIBarButtonItem alloc] initWithCustomView:_backButton];
      
      // leftNavItem
      UIBarButtonItem *leadindFixedButton = [[UIBarButtonItem alloc] initWithBarButtonSystemItem:UIBarButtonSystemItemFixedSpace target:nil action:nil];
      leadindFixedButton.width = -XAPP_LENGTH_a(1);
      NSMutableArray *leftBarButtonItems = [NSMutableArray arrayWithArray:self.navigationItem.leftBarButtonItems];
      [leftBarButtonItems insertObject:_backButtonItem atIndex:0];
      [leftBarButtonItems insertObject:leadindFixedButton atIndex:0];
      self.navigationItem.leftBarButtonItems = [leftBarButtonItems copy];
      
      //在字数较多的时候使用T1字体，从而显示多一些
      UIFont *defaultFont = PINGFANG_REGULAR_FONT_FOR_SIZE(18);
      CGFloat barWidth = XAPP_LENGTH_a(9) + 40;
      // 解决iOS 7 pingfang 字体为空的bug
      if(!defaultFont){
        defaultFont = [UIFont systemFontOfSize:XAPPFontSizeH2];
      }
      CGSize size = [self.title calculateSizeWithFont:defaultFont];
      if (size.width > SCREEN_WIDTH - barWidth) {
        defaultFont =  PINGFANG_FONT_FOR_SIZE(XAPPFontSizeT1);
      }
      NSMutableDictionary *dic = [NSMutableDictionary dictionaryWithDictionary:self.navigationController.navigationBar.titleTextAttributes];
      [dic setObject:defaultFont forKey:NSFontAttributeName];
      [dic setObject:[UIColor colorWithHexString:@"#ffffff"]
              forKey:NSForegroundColorAttributeName];
      self.navigationController.navigationBar.titleTextAttributes = dic;
    }
  }
  
  self.navigationController.navigationBarHidden = self.hideNavBar;
}


#pragma markt - Privite

#pragma mark <Rotate>

- (BOOL)shouldAutorotate
{
  //所有ViewController 默认不旋转,有个别需求的,请在子类中重载这3个方法
  //fixed by Yangtsing.Zhang
  
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

#pragma mark - XAppModulePageProtocol

- (NSString *)pageId {
  return [[self class] pageName];
}

+ (NSString *)pageName {
  return [self className];
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
