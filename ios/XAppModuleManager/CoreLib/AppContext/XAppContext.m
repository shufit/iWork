//
//  XAppContext.m
//  RNProject
//
//  Created by ShiXiaoHui on 16/4/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "XAppContext.h"
#import <React/RCTBundleURLProvider.h>

@implementation XAppContext

static XAppContext * _instance = nil;

@synthesize config = _config;

@synthesize packageType = _packageType;

RCT_EXPORT_MODULE();

@synthesize bridge = _bridge;


+ (XAppContext *)instance {
  @synchronized(self) {
    if (_instance == nil) {
      _instance = [[self alloc] init];
    }
    return _instance;
  }
}

-(id)init {
  self = [super init];
  if (self) {
    
  }
  return self;
}

- (XAppRNBroadcast *)rnBroadcast {
  if (_rnBroadcast == nil) {
    _rnBroadcast = [XAppRNBroadcast instance];
  }
  return _rnBroadcast;
}

- (RCTBridge *)localBridge {
  return _bridge;
}

@end
