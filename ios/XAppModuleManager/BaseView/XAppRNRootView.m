//
//  XAppRNRootView.m
//  RNProject
//
//  Created by ShiXiaoHui on 16/4/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "XAppRNRootView.h"
#import "XAppContext.h"
#import <React/RCTRootView.h>

@implementation XAppRNRootView

/*
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
    // Drawing code
}
*/

- (instancetype)initWithFrame:(CGRect)frame withModuleName:(NSString *)jsModuleName initialProperties:(NSDictionary *) initialProperties{
  
  self= [super initWithFrame:frame];
  if (self) {
    RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:XApp_Context.localBridge
                                                     moduleName:jsModuleName
                                              initialProperties:initialProperties];
    [self addSubview:rootView];
    rootView.frame = self.bounds;
    rootView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
  }
  
  return self;
}


@end
