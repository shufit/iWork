//
//  XAppRNBroadcast.m
//  RNProject
//
//  Created by ShiXiaoHui on 16/4/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "XAppRNBroadcast.h"
#import "React/RCTBridge.h"
#import "React/RCTEventDispatcher.h"

@implementation XAppRNBroadcast

static XAppRNBroadcast * _instance = nil;

+ (XAppRNBroadcast *)instance {
  
  @synchronized(self) {
    if (_instance == nil) {
      _instance = [[self alloc] init];
    }
    return _instance;
  }
}

- (id)init {
  if (_instance == nil) {
    self = [super init];
    if (self) {
      _instance = self;
    }
  }
  
  return _instance;
}


RCT_EXPORT_MODULE();

@synthesize bridge = _bridge;

-(void)sendEvent:(NSString *)aAction withBody:(NSDictionary *)aBodyDic {
  [self.bridge.eventDispatcher sendAppEventWithName:aAction
                                               body:aBodyDic];
}

@end
